const User = require('./user');


// Exports for router
// GET requests
module.exports.signup_get = (req, res) => {
    res.render("signup");
};
module.exports.login_get = (req, res) => {
    res.render("login");
};
// POST requests
module.exports.signup_post = async (req, res) => {
    const { email, password, displayname } = req.body;

    try {
        const user = await User.create({ email, password, displayname });
        res.status(201).json({ user: user._id });
    } catch(err) {
        res.status(400).json(err);
    }
};
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        res.status(200).json({ user: user._id });
    } catch(err) {
        res.status(400).json(err);
    }
};