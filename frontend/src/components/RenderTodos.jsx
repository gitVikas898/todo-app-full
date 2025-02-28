import React from 'react'

const RenderTodos = () => {
  return (
    <div className='border p-2 border-gray-200 bg-lime-100 rounded-lg flex flex-col gap-4'>
        <h3 className='text-3xl'>Title</h3>
        <p className='text-2xl'>Description</p>
        <div className='flex items-center justify-center'>
            <button className='bg-gray-200 rounded-lg p-3 hover:bg-orange-300 transition-all 200ms ease-in'>Mark as completed</button>
        </div>
    </div>
  )
}

export default RenderTodos