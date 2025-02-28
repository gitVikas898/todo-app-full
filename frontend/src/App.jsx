import "./App.css";
import RenderTodos from "./components/RenderTodos";
import Todo from "./components/Todo";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await fetch("http://127.0.0.1:3000/todos", {
      method: "GET",
    });
    const data = await response.json();
    setData(data.message);
  };

  useEffect(() => {
    getData();
  }, []);

  // Creating a Todo 

  const createTodo = async (titleInput,descrInput) => {
    if (!titleInput.current || !descrInput.current) {
      console.error("Refs are not assigned yet");
      return;
    }
    const inputObject = {
      title: titleInput.current.value.trim(),
      description: descrInput.current.value.trim(),
    };
    if (!inputObject.title || !inputObject.description) {
      console.error("Title or description cannot be empty");
      return;
    }
    try {
      const postData = await fetch("http://127.0.0.1:3000/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputObject),
      });
      if(postData.ok){
         getData();
      }else{
        console.log("Code Breaks Here")
      }
     
      titleInput.current.value = "";
      descrInput.current.value = "";
    } catch (error) {
      console.log("Error Occurred", error);
    }
  };

  const updateTodo = async(id)=>{
    try{
      const update = await fetch("http://127.0.0.1:3000/completed",{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({id})
      })

     
      if(update.ok){
        setData((prevData)=>prevData.map((todo)=>todo._id === id ? {...todo,isCompleted:!todo.isCompleted}:todo))
      }else{
        console.log("Error")
      }
    }catch(error){
      console.log(error)
    }
  }

 const deleteTodo = async(id)=>{
    try{
        const clearTodo = await fetch("http://127.0.0.1:3000/delete",{
          method:"DELETE",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({id})
        })

        if(clearTodo.ok){
            setData((prevData)=>prevData.filter((todo)=>todo._id !== id));
        }else{
          throw new Error("Error has Occurred")
        }
    }catch(error){
      console.log(error)
    }
 }
  return (
    <>
      <h1 className="text-7xl text-center mt-2">ToDo Application </h1>
      <div className="mt-10 grid place-items-center">
        <Todo createTodo={createTodo}  />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6 container mx-auto">
        {data.map((todo) => {
          return <RenderTodos todo={todo} key={todo._id} updateTodo={updateTodo} deleteTodo={deleteTodo}/>;
        })}
      </div>
    </>
  );
}

export default App;
