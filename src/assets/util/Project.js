import { v4 } from 'uuid';

export default class Project {
  constructor(title, description, dueDate, priority) {
    this.id = v4();
    this.projectTasks = [];
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}
