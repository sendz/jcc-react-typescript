import axios from "axios"
import { ToDoListItemProps } from "../providers/ToDoList.provider"

export const useToDoListService = () => {
    const apiHost = "http://localhost:1234"

    const addTodo = async (todo: ToDoListItemProps) => {
        return axios.post(apiHost + "/todo", todo)
    }

    const getTodos = async () => {
        return axios.get(apiHost + "/todo")
    }

    const updateTodo = async (todo: ToDoListItemProps) => {
        return axios.patch(apiHost + "/todo/" + todo.id, todo)
    }

    const deleteTodo = async (todo: ToDoListItemProps) => {
        return axios.delete(apiHost + "/todo/" + todo.id)
    }

    return {
        addTodo,
        getTodos,
        updateTodo,
        deleteTodo
    }
}