import { useState } from "react"
import { ToDoListItemProps, useToDoListContext } from "../../../providers/ToDoList.provider"
const { v4: uuid } = require('uuid')

export const useFormUtils = () => {
    const { addTodo } = useToDoListContext();
    const [title, setTitle] = useState<string>("")
    const saveTodo = () => {
        const todo: ToDoListItemProps = {
            id: uuid(),
            title,
            isDone: false
        }
        addTodo(todo)
    }

    return {
        title,
        setTitle,
        saveTodo
    }
}