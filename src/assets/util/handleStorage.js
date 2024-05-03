import createForm from './createForm';

function fetchItems(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function storeItem(item, key) {
  const items = fetchItems(key);
  items.push(item);
  setItemToLocalStorage(items, key);
}

function deleteItem(item, key) {
  const items = fetchItems(key);
  const newItems = items.filter((i) => i.id !== item.id);
  setItemToLocalStorage(newItems, key);
}

function editItem(item, key) {
  const form = createForm(item);
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
    updateItemEvent();
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

function handleNewItemInfo(form, item, key) {
  const newTitle = form.querySelector('#configTitle').value;
  const newDescription = form.querySelector('#configDescription').value;
  const newDueDate = form.querySelector('#configDueDate').value;
  const newPriority = form.querySelector('#configPriority').value;

  item.title = newTitle;
  item.description = newDescription;
  item.dueDate = newDueDate;
  item.priority = newPriority;

  updateItemInStorage(item, key);
}

function updateItemInStorage(item, key) {
  const items = fetchItems(key);
  const index = items.findIndex((i) => i.id === item.id);
  items[index] = item;
  setItemToLocalStorage(items, key);
}

function updateEvent(key) {
  let event;
  if (key == 'projects') {
    event = new Event('projectUpdated');
  } else {
    event = new Event('taskUpdated');
  }
  document.body.dispatchEvent(event);
}

function setItemToLocalStorage(item, key) {
  localStorage.setItem(key, JSON.stringify(item));
  updateEvent();
}

export { fetchItems, storeItem, deleteItem, editItem };
