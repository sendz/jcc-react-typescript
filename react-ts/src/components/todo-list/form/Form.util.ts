import { useState } from "react"
import { generateId } from "../../../helpers/generateId";
import { ToDoListItemProps, useToDoListContext } from "../../../providers/ToDoList.provider"

export const useFormUtils = () => {
    const { addTodo, todos } = useToDoListContext();
    const [title, setTitle] = useState<string>("")

    const saveTodo = () => {
        const todo: ToDoListItemProps = {
            id: generateId(),
            title: title,
            isDone: false
        }
        addTodo(todo)
        setTitle("")
    }

    return {
        title,
        setTitle,
        saveTodo,
        generateId
    }
}