const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true,
    },

    taskDes: {
        type: String,
        required: false,
    }
})

const Task = mongoose.model("taskdb", TaskSchema)
module.exports = Task