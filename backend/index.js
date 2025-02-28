const express = require('express');
const { createTodo, updateTodo } = require('./types');
const { todo } = require('./db/db');
const app = express();
const cors = require("cors");
const { default: mongoose } = require('mongoose');
app.use(cors())
app.use(express.json());
const port = 3000


app.get('/todos',async function(req,res){
    const allTodos =  await todo.find({})
    res.status(200).json({
        message:allTodos
    });
})

app.post('/todo',async function(req,res){
    const title = req.body.title
    const description = req.body.description
    const validation = createTodo.safeParse({title,description});

    if(!validation.success){
        return res.status(400).json({
            message:"Invalid Input Credentials"
        })
    }

    await todo.create({
        title,
        description,
        isCompleted:false
    });

    res.status(201).json({
        message:"Todo Created Successfully"
    })

})

app.put('/completed',async function(req,res){
    const id = req.body.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }
    const validation = updateTodo.safeParse({id});

    if(!validation.success){
        return res.status(411).json({
            message:"Invalid Id Provided"
        })
    }

    const findExistingTodo = await todo.findById(id);
    if(!findExistingTodo){
        return res.status(404).json({message:"Todo Not Found"});
    }
    const updated = await todo.findByIdAndUpdate(id,
        {isCompleted:!findExistingTodo.isCompleted},
        {new:true}
    );
        
    res.status(201).json({
        existingTodo:findExistingTodo,
        updatedTodo:updated
    })

})

app.delete('/delete',async function(req,res) {
   const id = req.body.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            message:"Invalid Id"
        })
    }

    const validation = updateTodo.safeParse({id});
    if(!validation.success){
        return res.status(400).json({
            message:"Invalid Id"
        })
    }

    const deletedTodo = await todo.findByIdAndDelete(id);
    if(!deletedTodo){
        return res.status(400).json({
            message:"Delete Failed"
        });
    }

    res.json({
        deletedTodo
    })
})

app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})