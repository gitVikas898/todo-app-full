const mongoose = require("mongoose")
mongoose.connect(process.env.DB_URI)

const TodoSchema = new mongoose.Schema({
    title:String,
    description:String,
    isCompleted:Boolean
});

const todo = mongoose.model('todos',TodoSchema);

module.exports = {
    todo
}