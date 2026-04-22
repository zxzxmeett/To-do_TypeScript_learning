import { Request, Response } from "express";
import { Todo } from "../models/todo";

type CreateTodoBody = {
  text: string;
};

export const getTodos = async (req: Request, res: Response) => {
  const todos = await Todo.find();
  res.json(todos);
};

export const createTodo = async (
  req: Request<{}, {}, CreateTodoBody>,
  res: Response
) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Text is required" });
  }

  const newTodo = await Todo.create({ text });

  res.status(201).json(newTodo);
};

export const deleteTodo = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;

  const deletedTodo = await Todo.findByIdAndDelete(id);

  if (!deletedTodo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.json(deletedTodo);
};

export const toggleTodo = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;

  const todo = await Todo.findById(id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todo.completed = !todo.completed;

  await todo.save();

  res.json(todo);
};