const User = require('./user');


// Handle Errors
const handleErrors = (err) => {
    let errors = { email: "", password: "", displayname: "" };

    // Incorrect email
    if (err.message.includes("incorrect email")) {
        errors.email = "That email is not registered";
    }
    // Incorrect password
    if (err.message.includes("incorrect password")) {
        errors.password = "That password is incorrect";
    }
    // Validation errors
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    // Uniqueness Error
    if (err.code === 11000) {
        // Duplicate email
        if (Object.keys(err.keyPattern).includes("email")) {
            errors.email = "That email is already registered";
        }
        // Duplicate display name
        if (Object.keys(err.keyPattern).includes("displayname")) {
            errors.email = "That name is already taken";
        }
    }

    return errors;
}

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
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        res.status(200).json({ user: user._id });
    } catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};