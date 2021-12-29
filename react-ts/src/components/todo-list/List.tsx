import React from "react";
import { useToDoListContext } from "../../providers/ToDoList.provider";
import { ToDoListItem } from "./Item";

export const ToDoList = () => {
    const { todos } = useToDoListContext();
    if (todos.length === 0) {
        return (
            <div>Empty</div>
        )
    }

    return (
        <>
            <h2>To Do</h2>
                {todos.filter(item => !item.isDone).map(item => <ToDoListItem item={item} key={item.id}/>)}
            <h2>Done</h2>
                {todos.filter(item => item.isDone).map(item => <ToDoListItem item={item} key={item.id}/>)}
        </>
    )
}