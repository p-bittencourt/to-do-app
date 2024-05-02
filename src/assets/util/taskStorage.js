// import createTaskForm from './createTaskForm';
import createForm from './createForm';

function storeTask(task) {
  // store the new task in the tasks array in localStorage
  const tasks = retrieveTasks();
  tasks.push(task);
  setItemToLocalStorage(tasks);
}

function retrieveTasks() {
  // retrieve the tasks array from localStorage
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function deleteTask(task) {
  // delete the task from the tasks array in localStorage
  const tasks = retrieveTasks();
  const newTasks = tasks.filter((t) => t.id != task.id);
  setItemToLocalStorage(newTasks);
}

function editTask(task) {
  const form = createForm(task);
  const confirmEdit = document.createElement('button');
  confirmEdit.type = 'submit';
  confirmEdit.textContent = 'Confirm';
  confirmEdit.classList.add('btn', 'btn-light', 'edit-button');

  const mainInfoDiv = form.querySelector('.main-info');
  mainInfoDiv.classList.toggle('edit-mode');

  const cancelEdit = document.createElement('button');
  cancelEdit.type = 'button';
  cancelEdit.textContent = 'Cancel';
  cancelEdit.classList.add('btn', 'btn-danger', 'edit-button');
  cancelEdit.addEventListener('click', () => {
    updateTaskEvent();
  });

  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('edit-buttons-div');
  buttonsDiv.appendChild(cancelEdit);
  buttonsDiv.appendChild(confirmEdit);

  const extraInfoDiv = form.querySelector('.extra-info');
  extraInfoDiv.appendChild(buttonsDiv);
  const formContainer = document.getElementById(`${task.id}`);
  formContainer.innerHTML = '';
  formContainer.appendChild(form);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleNewTaskInfo(form, task);
  });
}

function handleNewTaskInfo(form, task) {
  const newTitle = form.querySelector('#configTitle').value;
  const newDescription = form.querySelector('#configDescription').value;
  const newDueDate = form.querySelector('#configDueDate').value;
  const newPriority = form.querySelector('#configPriority').value;

  task.title = newTitle;
  task.description = newDescription;
  task.dueDate = newDueDate;
  task.priority = newPriority;

  updateTaskInStorage(task);
}

function updateTaskInStorage(task) {
  const tasks = retrieveTasks();
  const index = tasks.findIndex((t) => t.id === task.id);
  tasks[index] = task;
  setItemToLocalStorage(tasks);
}

function setItemToLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  updateTaskEvent();
}

function updateTaskEvent() {
  const event = new Event('taskUpdated');
  document.body.dispatchEvent(event);
}

export { storeTask, retrieveTasks, deleteTask, editTask };
