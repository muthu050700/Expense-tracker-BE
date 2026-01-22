const mongoose = require("mongoose");

const connectDb = async () => {
    await mongoose.connect("mongodb+srv://muthu050:t2RRZICnusHjuayK@namasterdev.ys2cf7s.mongodb.net/expense-tracker");
}

module.exports = connectDb;