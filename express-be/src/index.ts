import express from "express";

export type ToDoInterface = {
    id: string
    title: string
    isDone: boolean
}

const main = () => {
    const app = express()
    app.use(express.json())
    const port = process.env.PORT || 8080

    app.get("/", (_, res) => res.json({status: "alive"}))

    let todos: ToDoInterface[] = [];

    app.get("/todo", (_, res) => {
        console.log("get todo")
        return res.json({status: "OK", data: todos})
    })

    app.post("/todo", (req, res) => {
        todos.push(req.body)
        console.log("add todo", req.body)
        return res.json({status: "OK", data: todos})
    })

    app.patch("/todo/:id", (req, res) => {
        if (todos.filter(todo => todo.id === req.params.id).length === 0) {
            console.log("todo not found " + req.params.id)
            return res.status(404).json({status: "Not Found", message: "To Do " + req.params.id + " not found"})
        }
        const index = todos.findIndex(todo => todo.id === req.params.id)
        todos[index] = {
            ...todos[index],
            ...req.body
        }
        console.log("patch todo " + req.params.id, req.body)
        return res.json({status: "OK", data: todos})
    })

    app.delete("/todo/:id", (req, res) => {
        if (todos.length === 0) {
            console.log("todo empty")
            return res.status(404).json({status: "Not Found", message: "To Do List Empty"})
        }
        if (todos.filter(todo => todo.id === req.params.id).length === 0) {
            console.log("todo not found " + req.params.id)
            return res.status(404).json({status: "Not Found", message: "To Do " + req.params.id + " not found"})
        }
        todos = todos.filter(todo => todo.id !== req.params.id)
        console.log("todo deleted " + req.params.id)
        return res.json({status: "OK", data: todos})
    })

    app.listen(port, () => {
        console.log(`[server] running on ${port}`)
    })
}

main()