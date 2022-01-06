import React from "react";
import { Button, Form, FormControl, InputGroup, Row, Col } from "react-bootstrap";
import { useFormUtils } from "./Form.util";

export const ToDoListForm = () => {
    const {title, setTitle, saveTodo} = useFormUtils()

    return (
        <Row>
            <Col>
                <Form>
                    <InputGroup>
                        <FormControl 
                            type="text" 
                            value={title} 
                            placeholder="Title"
                            onChange={event => setTitle(event.target.value)}/>
                        <Button onClick={saveTodo}>Save</Button>
                    </InputGroup>
                </Form>
            </Col>
        </Row>
    )
}