import { v4 as uuidv4 } from 'uuid';

export default class Task {
  constructor(
    title,
    description,
    dueDate,
    priority,
    project = null,
    completed = false
  ) {
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.completed = completed;
  }
}
