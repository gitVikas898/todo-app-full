import React from 'react'

const RenderTodos = ({todo,updateTodo,deleteTodo}) => {
  return (
    <div className='border p-2 border-gray-200 bg-lime-100 rounded-lg flex flex-col gap-4'>
        <h3 className='text-3xl'>Title : {todo.title}</h3>
        <p className='text-2xl'>Description: {todo.description}</p>
        <div className='flex items-center justify-center gap-2'>
            <button className='bg-gray-200 rounded-lg p-3 hover:bg-orange-300 transition-all 200ms ease-in' onClick={()=>updateTodo(todo._id)}>{todo.isCompleted ? "Done" :"Mark as Done"}</button>
            <button className='bg-red-500 rounded-lg text-white p-3 hover:bg-red-700 transition-all 200ms ease-in' onClick={()=>deleteTodo(todo._id)}>Delete</button>
        </div>
    </div>
  )
}

export default RenderTodos