// Let's create a function that will be used to create a task object

export default function task(
  title,
  description,
  dueDate,
  priority,
  project = null,
  completed = false
) {
  // Private variables
  //#region
  let _title = title;
  let _description = description;
  let _dueDate = dueDate;
  let _priority = priority;
  let _project = project;
  let _completed = completed;
  //#endregion

  // Getters e setters
  return {
    get title() {
      return _title;
    },
    set title(value) {
      _title = value;
    },
    get description() {
      return _description;
    },
    set description(value) {
      _description = value;
    },
    get dueDate() {
      return _dueDate;
    },
    set dueDate(value) {
      _dueDate = value;
    },
    get priority() {
      return _priority;
    },
    set priority(value) {
      _priority = value;
    },
    get project() {
      return _project;
    },
    set project(value) {
      _project = value;
    },
    get completed() {
      return _completed;
    },
    set completed(value) {
      _completed = value;
    },
  };
}
