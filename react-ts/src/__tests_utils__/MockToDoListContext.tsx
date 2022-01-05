import { ReactNode } from "react"
import { ToDoListContext, ToDoListContextInterface, ToDoListItemProps } from "../providers/ToDoList.provider"

type IMockToDoListProvider = {
    children: ReactNode
    todos?: ToDoListItemProps[],
    addTodo?: (todo: ToDoListItemProps) => void,
    deleteTodo?: (todo: ToDoListItemProps) => void,
    updateTodo?: (todo: ToDoListItemProps) => void
}

export const MockToDoListProvider = (props: IMockToDoListProvider) => {
    const mockToDoListContext = {
        todos: props.todos || [],
        addTodo: props.addTodo || jest.fn,
        deleteTodo: props.deleteTodo || jest.fn,
        updateTodo: props.updateTodo || jest.fn
    }

    return (
        <ToDoListContext.Provider value={mockToDoListContext as ToDoListContextInterface}>
            {props.children}
        </ToDoListContext.Provider>
    )
}