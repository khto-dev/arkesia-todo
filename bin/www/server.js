const app = require("../../app")
const mongoose = require("mongoose");
require('dotenv').config();


// Database connection
const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@arkesiatodo.kbsirel.mongodb.net/arkesiatodo?retryWrites=true&w=majority`;

mongoose.connect(
    dbURI, {useNewUrlParser: true, useUnifiedTopology: true}
).then(() => app.listen(process.env.DB_PORT || 3000, () => {
    console.log(`Server started at ${process.env.DB_HOST}:${process.env.DB_PORT}`);
})).catch(err => {
    console.log(err);
});