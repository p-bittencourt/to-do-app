function storeTask(task) {
  // store the new task in the tasks array in localStorage
  const tasks = retrieveTasks();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  const event = new Event('taskUpdated');
  document.body.dispatchEvent(event);
}

function retrieveTasks() {
  // retrieve the tasks array from localStorage
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function deleteTask(task) {
  // delete the task from the tasks array in localStorage
  const tasks = retrieveTasks();
  const newTasks = tasks.filter((t) => t.title !== task.title);
  localStorage.setItem('tasks', JSON.stringify(newTasks));
  const event = new Event('taskUpdated');
  document.body.dispatchEvent(event);
}

function editTask(task) {}

export { storeTask, retrieveTasks, deleteTask };
