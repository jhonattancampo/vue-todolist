import { ITask } from '../models/Task';
import { TaskRepository, ITaskRepository } from '../repositories/TaskRepository';
import { TaskSubject } from '../observers/TaskObserver';

export class TaskService {
  private taskRepository: ITaskRepository;
  private taskSubject: TaskSubject;

  constructor(taskRepository: ITaskRepository, taskSubject: TaskSubject) {
    this.taskRepository = taskRepository;
    this.taskSubject = taskSubject;
  }

  // Create a new task
  async createTask(taskData: Partial<ITask>): Promise<ITask> {
    const task = await this.taskRepository.create(taskData);
    this.taskSubject.notify(task, 'created');
    return task;
  }

  // Retrieve all tasks
  async getAllTasks(): Promise<ITask[]> {
    return await this.taskRepository.findAll();
  }

  // Retrieve a single task by ID
  async getTaskById(id: string): Promise<ITask | null> {
    return await this.taskRepository.findById(id);
  }

  // Update a task
  async updateTask(id: string, taskData: Partial<ITask>): Promise<ITask | null> {
    const updatedTask = await this.taskRepository.update(id, taskData);
    if (updatedTask) {
      this.taskSubject.notify(updatedTask, 'updated');
    }
    return updatedTask;
  }

  // Delete a task
  async deleteTask(id: string): Promise<boolean> {
    const deletedTask = await this.taskRepository.delete(id);
    if (deletedTask) {
      this.taskSubject.notify(deletedTask, 'deleted');
      return true;
    }
    return false;
  }
}
