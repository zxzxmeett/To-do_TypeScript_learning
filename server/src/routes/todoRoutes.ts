import express from "express";
import { createTodo, deleteTodo, getTodos, toggleTodo, } from "../controllers/todoController";

const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id", toggleTodo);

export default router;