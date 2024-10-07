import { ITask } from '../models/Task';

// Observer Interface
export interface Observer {
  update(task: ITask, action: string): void;
}

// Subject Interface
export interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(task: ITask, action: string): void;
}

// Concrete Subject
export class TaskSubject implements Subject {
  private observers: Observer[] = [];

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(task: ITask, action: string): void {
    this.observers.forEach(observer => observer.update(task, action));
  }
}

// Concrete Observer
export class TaskLogger implements Observer {
  update(task: ITask, action: string): void {
    console.log(`Task ${action}:`, task);
  }
}
