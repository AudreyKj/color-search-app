const express = require("express");
const app = express();
const server = require("http").Server(app);
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db.js");
const csurf = require("csurf");

app.use(compression());

app.use(express.static("./public"));

app.use(
    express.urlencoded({
        extended: false
    })
);

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

//multer for file upload
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./public" + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 800000
    }
});

//GRABER
app.get("/graber", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/upload", (req, res) => {
    uploader.single("file")(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            return res.json({ error: true });
        } else if (err) {
            return res.json({ error: true });
        }

        console.log(res);

        if (req.file) {
            console.log("req.file", req.file);
            // let username = req.body.username;
            // let title = req.body.title;
            // let description = req.body.description;
            //
            // cloudinary.uploader.upload(req.file.path, function(result) {
            //   const url = result.secure_url;
            //
            //   db.addImage(url, id)
            //     .then(function(result) {
            //       return res.json(url);
            //     })
            //     .catch(function(error) {
            //       return res.json({ error: true });
            //     });
            //});
        } else {
            return res.json({ error: true });
        }
    });
});

app.get("*", function(req, res) {
    res.redirect("/graber");
});

server.listen(process.env.PORT || 8080);
