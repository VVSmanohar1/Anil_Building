import { Request, Response } from "express";
import Task from "../models/Task";

// Create Task
export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.create(req.body);
    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({
      message: "Error creating task",
      error: (error as Error).message,
    });
  }
};

// Get All Tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching tasks",
      error: (error as Error).message,
    });
  }
};

// Get Task by ID
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    return res.json(task);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching task",
      error: (error as Error).message,
    });
  }
};

// Update Task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    return res.json(task);
  } catch (error) {
    return res.status(500).json({
      message: "Error updating task",
      error: (error as Error).message,
    });
  }
};

// Delete Task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    return res.json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting task",
      error: (error as Error).message,
    });
  }
};
