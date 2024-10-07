import Task, { ITask } from '../models/Task';

// Repository Interface
export interface ITaskRepository {
  create(task: Partial<ITask>): Promise<ITask>;
  findAll(): Promise<ITask[]>;
  findById(id: string): Promise<ITask | null>;
  update(id: string, task: Partial<ITask>): Promise<ITask | null>;
  delete(id: string): Promise<ITask | null>;
}

// Repository Implementation
export class TaskRepository implements ITaskRepository {
  async create(task: Partial<ITask>): Promise<ITask> {
    const newTask = new Task(task);
    return await newTask.save();
  }

  async findAll(): Promise<ITask[]> {
    return await Task.find().sort({ deadline: 1 });
  }

  async findById(id: string): Promise<ITask | null> {
    return await Task.findById(id);
  }

  async update(id: string, task: Partial<ITask>): Promise<ITask | null> {
    return await Task.findByIdAndUpdate(id, task, { new: true });
  }

  async delete(id: string): Promise<ITask | null> {
    return await Task.findByIdAndDelete(id);
  }
}
