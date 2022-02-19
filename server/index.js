const express = require ('express')
const mongoose = require('mongoose')
const cors = require ('cors')
const app = express()



const TaskModel = require("./models/Task")
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://user:1234@cluster0.j45bu.mongodb.net/task?retryWrites=true&w=majority', {
    useNewUrlParser: true,
})

app.post('/insert', async (req,res) => {
    
    const taskName = req.body.taskName
    const taskDes = req.body.taskDes
    const  task = new TaskModel({taskName: taskName, taskDes: taskDes })

    try {
        await task.save()
        res.send("data successfully inserted")
    }catch(err){
        console.log(err)
    }
})

app.get('/read', async (req,res) => {
    TaskModel.find({}, (err,result)=>{
        if(err){
            res.send(err)
        }

        res.send(result)
    })
})

app.put('/update', async (req,res) => {
    
    const newTaskName = req.body.newTaskName
    const id = req.body.id
    

    try {
            await TaskModel.findById(id, (err, updatedTask) =>{
            updatedTask.taskName = newTaskName
            updatedTask.save()
            res.send("update")
        })
    }catch(err){
        console.log(err)
    }
})


app.delete("/delete/:id", async (req,res)=>{
    const id = req.params.id
    await TaskModel.findByIdAndRemove(id).exec()
    res.send("deleted")
})
app.listen(3001, ()=>
{
    console.log('server running on port 3001')
})