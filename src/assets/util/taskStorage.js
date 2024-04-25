import createTaskForm from './createTaskForm';

function storeTask(task) {
  // store the new task in the tasks array in localStorage
  const tasks = retrieveTasks();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  updateTaskEvent();
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
  updateTaskEvent();
}

function editTask(task) {
  const form = createTaskForm();

  const formContainer = document.getElementById(`${task.title}`);
  formContainer.innerHTML = '';
  formContainer.appendChild(form);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    updateTaskEvent();
  });
}

function updateTaskEvent() {
  const event = new Event('taskUpdated');
  document.body.dispatchEvent(event);
}

export { storeTask, retrieveTasks, deleteTask, editTask };
