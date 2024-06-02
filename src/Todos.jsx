import { useRef, useContext } from "react"
import StoreContext from "./context.jsx"
import { Observer } from "mobx-react"
import  { TodoStore } from "./store/todos.js";

const AddTodo = () => {
    const ref = useRef(null)
    const { todosStore } = useContext(StoreContext)
    return (
        <Observer>
            {
                () => {
                    return (
                        <>
                            <input ref={ref} type="text" />
                            <button onClick={() => {
                                const todo = new TodoStore(ref.current.value)
                                todosStore.add(todo)
                                ref.current.value = ""
                            }}
                                >添加todo</button>
                        </>
                    )
                }
            }
        </Observer>
    )
}
const Todo = ({todo}) => {
    return (
        <Observer>
            {() => {
                return (
                    <li>
                        <input type="checkbox" checked={todo.completed} onChange={() => {
                            todo.toggle()
                        }} />
                        {todo.text}
                    </li>
                )
            }}
        </Observer>

    )
}
const TodoList = () => {
    const { todosStore } = useContext(StoreContext)
    console.log(todosStore)
    return (
        <Observer>
            {() => {
                return (
                    <ul>
    {
        todosStore.list.map((todo, index) => {
            return (
                <Todo todo={todo} key={index}></Todo>
            )
        })
    }
</ul>
                )
            }}
        </Observer>
    )
}
const TodoStatus = () => {
    const { todosStore } = useContext(StoreContext)
    return (
        <Observer>
            {() => {
                return (
                    <p>未完成的事项：{todosStore.unCompletedCount}</p>
                )
            }}
        </Observer>

    )
}


const Todos = () => {
    return (
        <Observer>
            {
                () => {
                    return (
                        <>
                            <AddTodo></AddTodo>
                            <TodoList></TodoList>
                            <TodoStatus></TodoStatus>
                        </>
                    )
                }
            }
        </Observer>
    )
}
export default Todos
