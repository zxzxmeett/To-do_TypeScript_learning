import { Request, Response } from "express";
import { todos } from "../data/todoData";

export const getTodos = (req: Request, res: Response) => {
  res.json(todos);
};