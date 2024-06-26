import createForm from './createForm';
import createNoteForm from './createNoteForm';

function fetchItems(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function fetchSingleItem(id, key) {
  return fetchItems(key).find((item) => item.id === id);
}

function storeItem(item, key) {
  const items = fetchItems(key);
  items.push(item);
  setItemToLocalStorage(items, key);
}

function deleteItem(item, key) {
  const items = fetchItems(key);
  const newItems = items.filter((i) => i.id !== item.id);
  if (key == 'tasks') {
    deleteTaskFromProject(item);
  }
  setItemToLocalStorage(newItems, key);
}

function deleteTaskFromProject(task) {
  const projects = fetchItems('projects');
  const project = projects.find((p) => p.projectTasks.includes(task.id));
  if (project) {
    const taskIndex = project.projectTasks.indexOf(task.id);
    project.projectTasks.splice(taskIndex, 1);
    updateItemInStorage(project, 'projects');
  }
}

function editItem(item, key) {
  let form;
  if (key == 'notes') {
    form = createNoteForm(item);
  } else {
    form = createForm(item);
  }

  const confirmEdit = document.createElement('button');
  confirmEdit.type = 'submit';
  confirmEdit.textContent = 'Confirm';
  confirmEdit.classList.add('btn', 'btn-light', 'edit-button');

  const cardDiv = document.getElementById(`${item.id}`);
  cardDiv.classList.toggle('edit-mode');

  const cancelEdit = document.createElement('button');
  cancelEdit.type = 'button';
  cancelEdit.textContent = 'Cancel';
  cancelEdit.classList.add('btn', 'btn-danger', 'edit-button');
  cancelEdit.addEventListener('click', () => {
    updateEvent(key);
  });

  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('edit-buttons-div');
  buttonsDiv.appendChild(cancelEdit);
  buttonsDiv.appendChild(confirmEdit);

  const extraInfoDiv = form.querySelector('.extra-info');
  extraInfoDiv.appendChild(buttonsDiv);
  const formContainer = document.getElementById(`${item.id}`);
  formContainer.innerHTML = '';
  formContainer.appendChild(form);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleNewItemInfo(form, item, key);
  });
}

function handleNoteInfo(form, item, key) {
  const newTitle = form.querySelector('#configTitle').value;
  const newDescription = form.querySelector('#configDescription').value;

  item.title = newTitle;
  item.description = newDescription;

  updateItemInStorage(item, key);
}

function handleNewItemInfo(form, item, key) {
  if (key == 'notes') {
    handleNoteInfo(form, item, key);
    return;
  }
  const newTitle = form.querySelector('#configTitle').value;
  const newDescription = form.querySelector('#configDescription').value;
  const newDueDate = form.querySelector('#configDueDate').value;
  const newPriority = form.querySelector('#configPriority').value;

  let date = new Date(newDueDate);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  date.toLocaleDateString();

  item.title = newTitle;
  item.description = newDescription;
  item.dueDate = date;
  item.priority = newPriority;

  updateItemInStorage(item, key);
}

function updateItemInStorage(item, key) {
  const items = fetchItems(key);
  const index = items.findIndex((i) => i.id === item.id);
  items[index] = item;
  setItemToLocalStorage(items, key);
}

function setItemToLocalStorage(item, key) {
  localStorage.setItem(key, JSON.stringify(item));
  updateEvent(key);
}

function checkDoneFunction(event, itemId, key) {
  event.stopPropagation();

  let item = fetchSingleItem(itemId, key);
  item.completed = !item.completed;
  updateItemInStorage(item, key);
}

function updateEvent(key) {
  let event;
  if (key == 'projects') {
    event = new Event('projectUpdated');
  } else if (key == 'tasks') {
    event = new Event('taskUpdated');
  } else {
    event = new Event('noteUpdated');
  }
  document.body.dispatchEvent(event);
}

export {
  fetchItems,
  storeItem,
  deleteItem,
  editItem,
  fetchSingleItem,
  updateItemInStorage,
  checkDoneFunction,
  updateEvent,
};
