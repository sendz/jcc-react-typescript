import { ReactNode, useState } from "react"
import { ToDoListContext, ToDoListContextInterface, ToDoListItemProps } from "../providers/ToDoList.provider"

type IMockToDoListProvider = {
    children: ReactNode
    todos?: ToDoListItemProps[],
    addTodo?: (todo: ToDoListItemProps) => void,
    deleteTodo?: (todo: ToDoListItemProps) => void,
    updateTodo?: (todo: ToDoListItemProps) => void
}

export const MockToDoListProvider = (props: IMockToDoListProvider) => {
    const [todos, setTodos] = useState<ToDoListItemProps[]>([])

    const addTodo = (todo: ToDoListItemProps) => {
        setTodos(previousTodos => [
            ...previousTodos,
            todo
        ])
        props.addTodo?.(todo)
    }

    const updateTodo = (todo: ToDoListItemProps) => {
        const index = todos.findIndex(data => data.id === todo.id)
        let newTodos = [...todos]
        newTodos[index] = todo
        setTodos(newTodos)
        props.updateTodo?.(todo)
    }

    const deleteTodo = (todo: ToDoListItemProps) => {
        setTodos(previousTodos => previousTodos.filter(data => data !== todo))
        props?.deleteTodo?.(todo)
    }

    const mockToDoListContext = {
        todos: props.todos || todos,
        addTodo,
        deleteTodo,
        updateTodo
    }

    return (
        <ToDoListContext.Provider value={mockToDoListContext as ToDoListContextInterface}>
            {props.children}
        </ToDoListContext.Provider>
    )
}