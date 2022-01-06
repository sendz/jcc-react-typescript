import React, { createContext, useContext, useState } from "react"

type ToDoListContextInterface = {
    todos: ToDoListItemProps[],
    addTodo: (todo: ToDoListItemProps) => void,
    deleteTodo: (todo: ToDoListItemProps) => void,
    updateTodo: (todo: ToDoListItemProps) => void,
    addFreshTodos: (todos: ToDoListItemProps[]) => void,
}

const ToDoListContext = createContext({} as ToDoListContextInterface)

export const useToDoListContext = () => useContext(ToDoListContext)

type ToDoListProviderProps = {
    children: React.ReactNode
}

export type ToDoListItemProps = {
    id: string
    title: string
    isDone: boolean
}

export const ToDoListProvider = ({children}: ToDoListProviderProps) => {
    const [todos, setTodos] = useState<ToDoListItemProps[]>([])

    const addFreshTodos = (todos: ToDoListItemProps[]) => {
        setTodos(todos);
    }

    const addTodo = (todo: ToDoListItemProps) => {
        setTodos(previousTodos => [
            ...previousTodos,
            todo
        ])
    }

    const deleteTodo = (todo: ToDoListItemProps) => {
        setTodos(previousTodos => previousTodos.filter(data => data.id !== todo.id))
    }

    const updateTodo = (todo: ToDoListItemProps) => {
        const index = todos.findIndex(data => data.id === todo.id)
        let newTodos = [...todos]
        newTodos[index] = todo
        setTodos(newTodos)
    }

    const context = {
        todos,
        addTodo,
        deleteTodo,
        updateTodo,
        addFreshTodos
    }
    return (
        <ToDoListContext.Provider value={context}>
            {children}
        </ToDoListContext.Provider>
    )
}