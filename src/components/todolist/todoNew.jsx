import { useState } from "react";

const TodoNew = (props) => {
  const [valueInput, setValueInput] = useState("");
  const { addNewTodo } = props;

  // console.log(props)

  const handleSubmit = (event) => {
    event.preventDefault(); 
    addNewTodo(event.target.content.value);
    setValueInput("");
  };

  const handlOnchange = (event) => {
    setValueInput(event)
  };

  return (
    <>
      <form className="todo-new" onSubmit={handleSubmit}>
        <input 
          name="content"
          type="text" 
          onChange={(event) => handlOnchange(event.target.value)}
          value={valueInput}
        />
        <button >Add</button>
        <div>your input {valueInput}</div>
      </form>
    </>
  );
};

export default TodoNew;
