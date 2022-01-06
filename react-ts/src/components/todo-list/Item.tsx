import React, { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { ToDoListItemProps as RootToDoListItemProps, useToDoListContext } from "../../providers/ToDoList.provider";
import { useToDoListService } from "../../services/ToDoListService";

type ToDoListItemProps = {
    item: RootToDoListItemProps
    className?: string
}

export const ToDoListItem = (props: ToDoListItemProps) => {
    const { item } = props;
    const [isChecked, setChecked] = useState(item.isDone);
    const {updateTodo, deleteTodo: deleteTodoFromContext} = useToDoListContext()
    const { updateTodo: serviceUpdateTodo, deleteTodo: serviceDeleteTodo } = useToDoListService()
    const onCheckboxClicked = async () => {
        const update: RootToDoListItemProps = {
            ...item,
            isDone: !item.isDone
        }
        const response = await serviceUpdateTodo(update)
        updateTodo(response.data.data)
        setChecked(response.data.data)
    }

    const deleteTodo = async () => {
        const response = await serviceDeleteTodo(item)
        deleteTodoFromContext(response.data.deleted)
    }

    return (
        <Stack className={props.className} direction="horizontal" gap={3} style={{ justifyContent: 'space-between' }}>
            <div><input id={item.id} type="checkbox" checked={isChecked} onChange={onCheckboxClicked}/> <label htmlFor={item.id}>{item.title}</label></div>
            {item.isDone &&
                (<Button variant="danger" size="sm" onClick={deleteTodo}>Delete</Button>)
            }
        </Stack>
    )
}