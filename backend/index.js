const express = require('express');
const { createTodo, updateTodo } = require('./types');
const app = express();
app.use(express.json());
const port = 3000


app.get('/todos',function(req,res){
    
    
})

app.post('/todo',function(req,res){
    const title = req.body.title
    const description = req.body.description
    const validation = createTodo.safeParse({title,description});

    if(!validation.success){
        return res.status(400).json({
            message:"Invalid Input Credentials"
        })
    }

    //database create todo

    res.status(201).json({
        message:"Todo Created Successfully"
    })

})

app.put('/completed',function(req,res){
    const id = req.body.id;

    const validation = updateTodo.safeParse(id);

    if(!validation.success){
        return res.status(411).json({
            message:"Invalid Id Provided"
        })
    }
    res.status(201).json({
        message:"Updated Successfully"
    })

})

app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})