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
    this._id = uuidv4();
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._priority = priority;
    this._project = project;
    this._completed = completed;
  }

  // Getters
  get title() {
    return this._title;
  }

  get description() {
    return this._description;
  }

  get dueDate() {
    return this._dueDate;
  }

  get priority() {
    return this._priority;
  }

  get project() {
    return this._project;
  }

  get completed() {
    return this._completed;
  }

  get id() {
    return this._id;
  }

  // Setters
  set title(newTitle) {
    this._title = newTitle;
  }

  set description(newDescription) {
    this._description = newDescription;
  }

  set dueDate(newDueDate) {
    this._dueDate = newDueDate;
  }

  set priority(newPriority) {
    this._priority = newPriority;
  }

  set project(newProject) {
    this._project = newProject;
  }

  set completed(newCompleted) {
    this._completed = newCompleted;
  }
}
