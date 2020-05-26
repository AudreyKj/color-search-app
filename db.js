const spicePg = require("spiced-pg");

const db = spicePg(
    process.env.DATABASE_URL ||
        "postgres://postgres:postgres@localhost:5432/color_spot"
);

function registerUser(first, last, email, password) {
    return db.query(
        `INSERT INTO register (first, last, email, password)
    VALUES ($1, $2, $3, $4) RETURNING id`,
        [first, last, email, password]
    );
}

function verifyUser(email) {
    return db.query(`SELECT password, id FROM register where email=$1`, [
        email
    ]);
}

function savePalette(colors, tag, user_id) {
    return db.query(
        `INSERT INTO saved (palette, tag, user_id) VALUES ($1, $2, $3) RETURNING id`,
        [colors, tag, user_id]
    );
}

function getColors(user_id) {
    return db.query(
        `SELECT palette, tag, user_id, created_at FROM saved WHERE user_id = $1`,
        [user_id]
    );
}

function filter(element, user_id) {
    return db.query(`SELECT * FROM saved WHERE tag=$1 AND user_id= $2`, [
        element,
        user_id
    ]);
}

exports.registerUser = registerUser;
exports.verifyUser = verifyUser;
exports.savePalette = savePalette;
exports.getColors = getColors;
exports.filter = filter;
