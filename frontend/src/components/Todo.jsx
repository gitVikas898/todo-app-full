import { useRef } from "react";

const Todo = ({createTodo}) => {
  const titleInput = useRef(null);
  const descrInput = useRef(null);
  return (
    <div className="border border-gray-200 p-4 flex items-center justify-center gap-2 w-[800px] rounded-lg">
      <input
        ref={titleInput}
        type="text"
        placeholder="Enter Title"
        className="outline-none border border-gray-200 p-2 w-full"
      />
      <input
        ref={descrInput}
        type="text"
        placeholder="Enter Description"
        className="outline-none border border-gray-200 p-2 w-full"
      />
      <button
        className="bg-green-500 text-white px-2 py-2 rounded-lg"
        onClick={()=>createTodo(titleInput,descrInput)}
      >
        Add
      </button>
    </div>
  );
};

export default Todo;
