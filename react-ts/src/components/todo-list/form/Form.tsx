import React from "react";
import { useFormUtils } from "./Form.util";

export const ToDoListForm = () => {
    const {title, setTitle, saveTodo} = useFormUtils()

    return (
        <>
            <input 
                type="text" 
                value={title} 
                placeholder="Title"
                onChange={event => setTitle(event.target.value)}/>
            <button onClick={saveTodo}>Save</button>
        </>

    )
}