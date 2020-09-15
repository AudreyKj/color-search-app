const spicePg = require("spiced-pg");

const db = spicePg(
    process.env.DATABASE_URL ||
        "postgres://postgres:postgres@localhost:5432/color_spot"
);

//AUTH
function checkUsername(userName) {
    return db.query(`SELECT * FROM register WHERE userName=$1`, [userName]);
}

function checkEmail(email) {
    return db.query(`SELECT * FROM register WHERE email=$1`, [email]);
}

function registerUser(userName, email, password) {
    return db.query(
        `INSERT INTO register (username, email, password)
    VALUES ($1, $2, $3) RETURNING id`,
        [userName, email, password]
    );
}

function verifyUser(email) {
    return db.query(`SELECT password, id FROM register where email=$1`, [
        email
    ]);
}

function verifyGoogleAuth(token_id) {
    return db.query(
        `SELECT external_id, id FROM register WHERE external_id=$1`,
        [token_id]
    );
}

function addUserFromGoogleAuth(token_id, token_type, username) {
    return db.query(
        `INSERT INTO register(external_id, external_type, username) VALUES($1, $2, $3) RETURNING *`,
        [token_id, token_type, username]
    );
}

//SAVE PALETTE
function savePalette(colors, tag, user_id, username) {
    return db.query(
        `INSERT INTO saved (palette, tag, user_id, username) VALUES ($1, $2, $3, $4) RETURNING id`,
        [colors, tag, user_id, username]
    );
}

function getColors(user_id) {
    return db.query(
        `SELECT palette, tag, user_id, created_at FROM saved WHERE user_id = $1`,
        [user_id]
    );
}

function filter(tag, user_id) {
    return db.query(`SELECT * FROM saved WHERE tag=$1 AND user_id= $2`, [
        tag,
        user_id
    ]);
}

//SHARE PALETTE
function checkPaletteShared(palette, tag, user_id, savedConf) {
    return db.query(
        `SELECT * FROM saved WHERE palette=$1 AND tag=$2 AND user_id= $3 AND shared=$4`,
        [palette, tag, user_id, savedConf]
    );
}

function sharePalette(savedConf, tag, user_id, palette) {
    return db.query(
        `UPDATE saved SET shared=$1 WHERE tag=$2 AND user_id=$3 AND palette=$4 RETURNING *`,
        [savedConf, tag, user_id, palette]
    );
}

function getSharedPalettes(savedConf) {
    return db.query(`SELECT * FROM saved WHERE shared=$1`, [savedConf]);
}

function getUserName(user_id) {
    return db.query("SELECT username FROM register WHERE id=$1", [user_id]);
}

//PROFILE
function getProfile(user_id) {
    return db.query(
        `SELECT register.username, register.email, register.password,
         user_profiles.age, user_profiles.country, user_profiles.gender
         FROM register
         LEFT JOIN user_profiles
         ON register.id = user_profiles.user_id
         WHERE register.id=$1`,
        [user_id]
    );
}

function updateUsers(username, email, password, user_id) {
    return db.query(
        `UPDATE register SET username=$1, email=$2, password=$3 WHERE id=$4`,
        [username, email, password, user_id]
    );
}

function updateProfile(user_id, age, country, gender) {
    return db.query(
        `INSERT INTO user_profiles(user_id, age, country, gender)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id)
        DO UPDATE SET age= $2, country=$3, gender=$4`,
        [user_id, age || null, country || null, gender || null]
    );
}

//DELETE ACCOUNT
function deleteSavedPalettes(user_id) {
    return db.query(`DELETE FROM saved WHERE user_id=$1`, [user_id]);
}

function deleteInfoProfile(user_id) {
    return db.query(`DELETE FROM user_profiles WHERE user_id=$1`, [user_id]);
}

function deleteUserInfo(user_id) {
    return db.query(`DELETE FROM register WHERE id=$1`, [user_id]);
}

//DATA DASHBOARD
function verifyAdminPassword(password) {
    return db.query(`SELECT FROM adminPageAccess WHERE password=$1`, [
        password
    ]);
}

function getGender() {
    return db.query(`SELECT gender FROM user_profiles`);
}

function getCountry() {
    return db.query(`SELECT country FROM user_profiles`);
}

function getAge() {
    return db.query(`SELECT age FROM user_profiles`);
}

//AUTH
exports.checkEmail = checkEmail;
exports.checkUsername = checkUsername;
exports.registerUser = registerUser;
exports.verifyUser = verifyUser;
exports.verifyGoogleAuth = verifyGoogleAuth;
exports.addUserFromGoogleAuth = addUserFromGoogleAuth;

//SAVE PALETTE
exports.savePalette = savePalette;
exports.getUserName = getUserName;
exports.getColors = getColors;
exports.filter = filter;

//SHARE PALETTE
exports.sharePalette = sharePalette;
exports.checkPaletteShared = checkPaletteShared;
exports.getSharedPalettes = getSharedPalettes;

//PROFILE
exports.getProfile = getProfile;
exports.updateUsers = updateUsers;
exports.updateProfile = updateProfile;
exports.deleteSavedPalettes = deleteSavedPalettes;
exports.deleteInfoProfile = deleteInfoProfile;
exports.deleteUserInfo = deleteUserInfo;

//ADMIN DATA DASHBOARD
exports.verifyAdminPassword = verifyAdminPassword;
exports.getGender = getGender;
exports.getCountry = getCountry;
exports.getAge = getAge;
