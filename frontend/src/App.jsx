import "./App.css";
import RenderTodos from "./components/RenderTodos";
import Todo from "./components/Todo";

function App() {
  return (
    <>
      <h1 className="text-7xl text-center mt-2">ToDo Application </h1>
      <div className="mt-10 grid place-items-center">
        <Todo />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6 container mx-auto">
          <RenderTodos/>
          <RenderTodos/>
          <RenderTodos/>
          <RenderTodos/>
      </div>
    </>
  );
}

export default App;
