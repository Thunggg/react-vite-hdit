import { useState } from 'react'
import '../../components/todolist/todo.css'
import TodoNew from './todoNew'
import TodoData from './todoData'
import reacLogo from '../../assets/react.svg'

const TodoApp = () => {

    const [todoList, setTodoList] = useState([
        // { id: 1, name: "Learning React " },
        // { id: 2, name: "Watching Youtube" }
      ])
    
    const randomIntFromInterval = (min, max) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    const addNewTodo = (name) => {
        const newTodo = {
          id: randomIntFromInterval(1, 1000000),
          name: name
        }
    
        setTodoList([...todoList, newTodo])
    }
    
    return(
        <>
            <div className="todo-container">
                <div className="todo-title">
                    Todo list
                </div>

                <TodoNew
                addNewTodo= {addNewTodo}
                />

                {todoList.length > 0 ?
                (
                    <TodoData
                        todoList = {todoList}
                        setTodoList = {setTodoList}
                    />
                )
                :
                (
                    <div className='todo-image'>
                        < img src={reacLogo} alt="logo" className="logo"/>
                    </div>
                )
                }
            </div>
        </>
    )
}

export default TodoApp