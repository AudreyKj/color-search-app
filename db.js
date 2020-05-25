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

exports.registerUser = registerUser;
