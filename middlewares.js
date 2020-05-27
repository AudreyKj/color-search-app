module.exports = {
    requireLoggedOutUser(req, res, next) {
        if (req.session.userId) {
            res.redirect("/spotter");
        } else {
            next();
        }
    },

    requireLoggedInUser(req, res, next) {
        if (!req.session.userId) {
            res.redirect("/spotter");
        } else {
            next();
        }
    }
};
