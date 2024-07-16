import { Request, Response } from 'express'
import { Todo, TypedBody } from '../Models'

const todos: Todo[] = []

export function getTodos(req: Request, res: Response){
    res.status(200).json(todos)
}
export const addTodo=(req: TypedBody, res: Response) => {

    const { title, description } = req.body
    let newtodo: Todo = {
        id: Math.floor(Math.random() * 10000),
        title,
        description,
        completed: false
    }

    todos.push(newtodo)
    res.status(201).json({ message: 'TODO Added successfully' })
}

export function getTodo(req: Request<{ id: string }>, res: Response){
    const id = +req.params.id
    const todo = todos.find(x => x.id === id)
    const { title, description } = req.body
    if (todo != undefined) {

        todo.description=description
        todo.title=title
        res.status(200).json({message: `Todo ${id} updated successfully`})
    }
    res.status(404).json({ message: 'Todo not found' })
}


export function updateTodo(req: Request<{ id: string }>, res: Response){
    const id = +req.params.id
    const todo = todos.find(x => x.id === id)

    if (todo != undefined) {

        
        res.status(200).json(todo)
    }
    res.status(404).json({ message: 'Todo not found' })
}

export const deleteTodo=(req: Request<{ id: string }>, res: Response) => {
    //we need an id
    const id = +req.params.id
    //get todo
    const index = todos.findIndex(x => x.id === id)

    if (index>=0) {
        todos.splice(index, 1)
        res.status(200).json({message:`Todo ${id} deleted successfully`})
    }
    res.status(404).json({ message: 'Todo not found' })
}

module.exports ={
    deleteTodo,
    addTodo,
    getTodo,
    getTodos,

}