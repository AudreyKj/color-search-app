const express = require("express");
const app = express();
const server = require("http").Server(app);
const { hash, compare } = require("./bc.js");
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db.js");
const csurf = require("csurf");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const cors = require("cors");

app.use(compression());

app.use(express.static("./public"));

app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
    next();
});

app.use(
    cookieSession({
        secret: `The secret is used to generate the second cookie used to verify
        the integrity of the first cookie`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

app.use(require("csurf")());

app.use((req, res, next) => {
    res.set("x-frame-options", "deny");
    res.cookie("csrftoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

const {
    requireLoggedOutUser,
    requireLoggedInUser
} = require("./middlewares.js");

//COLOR SPOTTER
app.get("/spotter", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

//REGISTER
app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/register", async (req, res) => {
    let {
        values: { username, email, password }
    } = req.body;
    let userName_notUnique;
    let email_notUnique;

    try {
        const userNameCheck = await db.checkUsername(username);

        if (userNameCheck.rows.length !== 0) {
            return res.json({ userName_notUnique: "notUnique" });
        }

        const emailCheck = await db.checkEmail(email);

        if (emailCheck.rows.length !== 0) {
            return res.json({ email_notUnique: "notUnique" });
        }

        const hashPw = await hash(password);
        password = hashPw;

        const regsiteruser = await db.registerUser(username, email, password);

        req.session.userId = regsiteruser.rows[0].id;
        return res.json(regsiteruser);
    } catch (error) {
        console.log("error", error);
        return res.json({ error: error });
    }
});

//LOGIN
app.get("/login", requireLoggedOutUser, (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/login/submit", (req, res) => {
    const {
        values: { email, password }
    } = req.body;

    db.verifyUser(email)
        .then(result => {
            if (!result || result.rows.length === 0) {
                return res.json({ error: "user not found" });
            }

            let passwordDB = result.rows[0].password;
            compare(password, passwordDB)
                .then(matchValue => {
                    if (matchValue) {
                        req.session.userId = result.rows[0].id;

                        return res.json(result);
                    } else {
                        return res.json({ error: true });
                    }
                })
                .catch(error => {
                    return res.json({ error: "password not match" });
                });
        })
        .catch(error => {
            return res.json({ error: "verify user fail" });
        });
});

//GOOGLE SIGN IN AUTH
app.post("/verifygogleauth", (req, res) => {
    let { token, username } = req.body;
    let type = "Google";

    console.log("req.body google", req.body);

    db.verifyGoogleAuth(token)
        .then(result => {
            if (result.rows.length === 0) {
                db.addUserFromGoogleAuth(token, type, username).then(result => {
                    console.log("result", result);
                    req.session.userId = result.rows[0].id;
                    return res.json(result);
                });
            } else {
                req.session.userId = result.rows[0].id;
                console.log("req.session.userId", req.session.userId);

                return res.json(result);
            }
        })
        .catch(error => console.log(error));
});

//VERIFY IF LOGGED IN
app.get("/getloggedIn", (req, res) => {
    let loggedIn = "logged";
    let notLogged = "notlogged";

    if (req.session.userId) {
        return res.json(loggedIn);
    } else {
        return res.json(notLogged);
    }
});

//LOGOUT
app.get("/logout", (req, res) => {
    req.session.userId = null;
    res.redirect("/spotter");
});

//SAVE COLOR PALETTES
app.post("/savepalette", async (req, res) => {
    let user_id = req.session.userId;
    let username;
    let { tag } = req.body;

    const colorArr = Object.values(req.body.colors);

    try {
        const getUsername = await db.getUserName(user_id);
        console.log("getUsername", getUsername);
        username = getUsername.rows[0].username;
    } catch (error) {
        console.log(error);
    }

    if (username) {
        db.savePalette(colorArr, tag, user_id, username)
            .then(result => {
                return res.json({ result });
            })
            .catch(error => {
                console.log("error", error);
            });
    }
});

//GET SAVE PALETTES
app.get("/savedcolors", (req, res) => {
    let user_id = req.session.userId;
    db.getColors(user_id)
        .then(result => {
            result.rows.map(elem => {
                if (typeof elem.palette === "string" || elem.palette !== null) {
                    elem.palette = elem.palette.replace(/[{}/"]/g, "");
                    elem.palette = elem.palette.split(",");
                }
            });

            return res.json(result.rows);
        })
        .catch(error => {
            console.log("error", error);
        });
});

//FILTER
app.post("/filter", (req, res) => {
    let tag = req.body.tag;
    let user_id = req.session.userId;

    db.filter(tag, user_id)
        .then(result => {
            result.rows.map(elem => {
                if (typeof elem.palette === "string" || elem.palette !== null) {
                    elem.palette = elem.palette.replace(/[{}/"]/g, "");
                    elem.palette = elem.palette.split(",");
                }
            });

            return res.json(result.rows);
        })
        .catch(err => {
            return res.json({ error: true });
        });
});

//SHARE PALETTE
app.post("/sharePalette", async (req, res) => {
    const { palette, tag, user_id, created_at, username } = req.body;
    console.log("req.body", req.body);

    const savedConf = "yes";

    console.log("palette", palette);

    try {
        const alreadyShared = await db.checkPaletteShared(
            palette,
            tag,
            user_id,
            savedConf
        );

        if (alreadyShared.rows.length === 0) {
            try {
                const sharePalette = await db.sharePalette(
                    savedConf,
                    tag,
                    user_id,
                    palette
                );

                return res.json({ sharePalette });
            } catch (error) {
                console.log("error share palette", error);
                return res.json({ error: true });
            }
        } else {
            console.log("already shared");
            return res.json({ error: "already shared" });
            return;
        }
    } catch (error) {
        console.log("error", error);
    }
});

//GET SHARED PALETTES
app.get("/getSharedPalettes", async (req, res) => {
    const savedConf = "yes";
    try {
        const getSharedPalettes = await db.getSharedPalettes(savedConf);
        console.log("getSharedPalettes", getSharedPalettes);
        getSharedPalettes.rows.map(elem => {
            if (typeof elem.palette === "string" || elem.palette !== null) {
                elem.palette = elem.palette.replace(/[{}/"]/g, "");
                elem.palette = elem.palette.split(",");
            }
        });

        const { rows } = getSharedPalettes;
        console.log("shared palettes", rows);
        return res.json({ rows });
    } catch (error) {
        console.log("error", error);
        return res.json({ error: true });
    }
});

//PROFILE
app.get("/profile", requireLoggedInUser, (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/getprofile", (req, res) => {
    let user_id = req.session.userId;

    db.getProfile(user_id)
        .then(result => {
            return res.json(result.rows);
        })
        .catch(error => {
            console.log(error);
        });
});

//UPDATE PROFILE
app.post("/updateprofile", (req, res) => {
    let user_id = req.session.userId;

    let { username, email, age, password, country, gender } = req.body;

    hash(password)
        .then(hashedPw => {
            password = hashedPw;

            db.updateUsers(username, email, password, user_id)
                .then(result => {
                    db.updateProfile(user_id, age, country, gender)
                        .then(result => {
                            return res.json(result);
                        })
                        .catch(error => {
                            return res.json({ error: true });
                        });
                })
                .catch(error => {
                    return res.json({ error: true });
                });
        })
        .catch(error => {
            return res.json({ error: true });
        });
});

//DELETE ACCOUNT
app.post("/delete", async (req, res) => {
    let user_id = req.session.userId;

    try {
        const deleteSavedPalettes = await db.deleteSavedPalettes(user_id);
        const deleteInfoProfile = await db.deleteInfoProfile(user_id);
        const deleteUserInfo = await db.deleteUserInfo(user_id);
        req.session.userId = null;
        res.redirect("/spotter");
    } catch (err) {
        console.log(err);
    }
});

//ADMIN PAGE - DATA VISUALIZATION
app.get("/admin", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

//VERIFY PASSWORD FOR ADMIN PAGE ACCESS
app.post("/admin-page-access", (req, res) => {
    const password = req.body["password"];

    console.log("req.body", req.body);

    db.verifyAdminPassword(password)
        .then(result => {
            if (result.rows.length === 0) {
                return res.json({ error: true });
            } else {
                return res.json({ passwordVerified: true });
            }
        })
        .catch(error => console.log("error", error));
});

//DATA OF USERS
app.get("/data", async (req, res) => {
    try {
        const getGender = await db.getGender();
        const getAge = await db.getAge();
        const getCountry = await db.getCountry();

        const result = [];

        result.push(getGender.rows);
        result.push(getAge.rows);
        result.push(getCountry.rows);

        return res.json(result);
    } catch (error) {
        console.log("error", error);
    }
});

app.get("*", function(req, res) {
    res.redirect("/spotter");
});

server.listen(process.env.PORT || 8080);
