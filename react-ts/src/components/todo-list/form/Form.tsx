import React from "react";
import { useFormUtils } from "./Form.util";

export const ToDoListForm = () => {
    const {title, setTitle, saveTodo} = useFormUtils()

    return (
        <>
            <input 
                data-testid="input-title"
                type="text" 
                value={title} 
                placeholder="Title"
                onChange={event => setTitle(event.target.value)}/>
            <button onClick={saveTodo} data-testid="save-button">Save</button>
        </>

    )
}