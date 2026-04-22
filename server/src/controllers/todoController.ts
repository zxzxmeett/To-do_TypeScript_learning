import { Request, Response } from "express";
import { todos } from "../data/todoData";
import { Todo } from "../models/todo";

type CreateTodoBody = {
  text: string;
};

export const getTodos = (req: Request, res: Response) => {
  res.json(todos);
};

export const createTodo = (req: Request<{}, {}, CreateTodoBody>, res: Response) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Text is required" });
  }

  const newTodo: Todo = {
    id: todos.length + 1,
    text,
    completed: false,
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
};

export const deleteTodo = (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id);

  const index = todos.findIndex(todo => todo.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  const deleted = todos.splice(index, 1);

  res.json(deleted[0]);
};

export const toggleTodo = (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id);

  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todo.completed = !todo.completed;

  res.json(todo);
};