const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");


// Structure for Users to be saved in database
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [8, "Password must be at least 8 characters long"],
    },
    displayname: { // Formatted as {name}#{DDDD} where D is a number
        type: String,
        required: [true, "Please enter a name"],
        unique: [true, "Name already taken"],
    },
    region: { // Allowed values: NAE, NAW, EUC, EUW
        type: String,
        required: true,
        default: "NAE",
    },
    characters: {
        type: [{
            name: String,
            class: String,
            ilvl: Number,
        }],
        default: [],
    },
    todo: {
        type: [{
            name: String,
            style: String, // Allowed styles: checkbox, number
            status: [Object],
        }],
        default: []
    }
});

// Password hashing before saving
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Login method
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });

    // Check if a user with provided email exists
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        
        // Check if password is correct
        if(auth) {
            return user;
        }
        // If authentication failed, password was incorrect
        throw Error("incorrect password");
    }
    // If email not in database, user is not registered
    throw Error("incorrect email");
}

const User = mongoose.model("user", userSchema);

module.exports = User;