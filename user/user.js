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
    displayName: { // Formatted as {name}#{DDDD} where D is a number
        type: String,
        required: [true, "Please enter a name"],
        unique: true,
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


const User = mongoose.model("user", userSchema);
module.exports = User;