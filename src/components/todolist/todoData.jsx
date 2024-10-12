const TodoData = (props) => {
  const { todoList, setTodoList } = props;

  const handleClick = (id) => {
    const newArray = todoList.filter(item => id !== item.id);
    setTodoList(newArray);
  }

    return(
        <>
        <div className="todo-data">
          {todoList.map((item, index) => {
            return(
              <div className={`todo-item`} key={item.id}>
                <div> {item.name}</div>
                <button onClick={() => handleClick(item.id)}>Delete</button>
              </div>
            )
          })}
        </div>
        </>
    )
} 

export default TodoData