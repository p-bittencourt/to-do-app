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
  const form = createTaskForm(task);
  const confirmEdit = document.createElement('button');
  confirmEdit.type = 'submit';
  confirmEdit.textContent = 'Confirm';
  confirmEdit.classList.add('btn', 'btn-light', 'edit-button');
  const extraInfoDiv = form.querySelector('.extra-info');
  extraInfoDiv.appendChild(confirmEdit);
  const formContainer = document.getElementById(`${task.id}`);
  formContainer.innerHTML = '';
  formContainer.appendChild(form);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newTitle = form.querySelector('#taskTitle').value;
    const newDescription = form.querySelector('#taskDescription').value;
    const newDueDate = form.querySelector('#taskDueDate').value;
    const newPriority = form.querySelector('#taskPriority').value;

    task.title = newTitle;
    task.description = newDescription;
    task.dueDate = newDueDate;
    task.priority = newPriority;

    updateTaskInStorage(task);
    updateTaskEvent();
  });
}

function updateTaskInStorage(task) {
  const tasks = retrieveTasks();
  const index = tasks.findIndex((t) => t.id === task.id);
  tasks[index] = task;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskEvent() {
  const event = new Event('taskUpdated');
  document.body.dispatchEvent(event);
}

export { storeTask, retrieveTasks, deleteTask, editTask };
