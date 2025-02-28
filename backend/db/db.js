require('dotenv').config();
const DB_URI = process.env.DB_URI
const mongoose = require("mongoose")

if (!DB_URI) {
    throw new Error("Missing DB_URI! Check your .env file.");
}
mongoose.connect(DB_URI);
const TodoSchema = new mongoose.Schema({
    title:String,
    description:String,
    isCompleted:Boolean
});

const todo = mongoose.model('todos',TodoSchema);

module.exports = {
    todo
}