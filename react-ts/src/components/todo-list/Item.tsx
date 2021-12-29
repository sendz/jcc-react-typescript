import React, { useState } from "react";
import { ToDoListItemProps as RootToDoListItemProps, useToDoListContext } from "../../providers/ToDoList.provider";

type ToDoListItemProps = {
    item: RootToDoListItemProps
}

export const ToDoListItem = (props: ToDoListItemProps) => {
    const { item } = props;
    const [isChecked, setChecked] = useState(item.isDone);
    const {updateTodo} = useToDoListContext()
    const onCheckboxClicked = () => {
        const update: RootToDoListItemProps = {
            ...item,
            isDone: !item.isDone
        }
        updateTodo(update)
        setChecked(update.isDone)
    }

    return (
        <div>
            <input type="checkbox" checked={isChecked} onChange={onCheckboxClicked}/> {item.title}
        </div>
    )
}