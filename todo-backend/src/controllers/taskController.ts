import { Request, Response } from 'express';
import { TaskRepository } from '../repositories/TaskRepository';
import { TaskSubject, TaskLogger } from '../observers/TaskObserver';
import { TaskService } from '../services/TaskService';

// Initialize Repository and Observer
const taskRepository = new TaskRepository();
const taskSubject = new TaskSubject();
const taskLogger = new TaskLogger();

// Attach observer
taskSubject.attach(taskLogger);

// Initialize Service
const taskService = new TaskService(taskRepository, taskSubject);

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error creating task', error });
  }
};

// Get all tasks
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching tasks', error });
  }
};

// Get a single task by ID
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error fetching task', error });
  }
};

// Update a task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating task', error });
  }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const success = await taskService.deleteTask(req.params.id);
    if (success) {
      res.status(200).json({ message: 'Task deleted' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error deleting task', error });
  }
};
