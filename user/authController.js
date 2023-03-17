const User = require('./user');


// Exports for router
module.exports.signup_get = (req, res) => {
    res.render("signup");
}
module.exports.login_get = (req, res) => {
    res.render("login");
}