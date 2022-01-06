import { useState } from "react"
import { ToDoListItemProps, useToDoListContext } from "../../../providers/ToDoList.provider"
import { useToDoListService } from "../../../services/ToDoListService";
const { v4: uuid } = require('uuid')

export const useFormUtils = () => {
    const { addTodo } = useToDoListContext();
    const { addTodo: serviceAddTodo} = useToDoListService();

    const [title, setTitle] = useState<string>("")
    const saveTodo = async () => {
        const todo: ToDoListItemProps = {
            id: uuid(),
            title,
            isDone: false
        }
        const response = await serviceAddTodo(todo)
        addTodo(response.data.data)
        setTitle("")
    }

    return {
        title,
        setTitle,
        saveTodo
    }
}