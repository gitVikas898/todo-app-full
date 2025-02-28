const express = require('express');
const { createTodo, updateTodo } = require('./types');
const { todo } = require('./db/db');
const app = express();
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

    const validation = updateTodo.safeParse(id);

    if(!validation.success){
        return res.status(411).json({
            message:"Invalid Id Provided"
        })
    }

    await todo.update(
        {
            _id:req.body.id
        },{
            isCompleted:true
        })
        
    res.status(201).json({
        message:"Updated Successfully"
    })

})

app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})