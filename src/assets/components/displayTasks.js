import { format } from 'date-fns';
import { deleteTask, editTask } from '../util/taskStorage';

export default function displayTasks(tasks) {
  const taskDisplay = document.createElement('div');
  taskDisplay.classList.add('task-display');
  const h3 = document.createElement('h3');
  h3.textContent = 'Tasks';
  taskDisplay.appendChild(h3);

  if (tasks.length === 0) {
    const p = document.createElement('p');
    p.textContent = 'No tasks to display';
    taskDisplay.appendChild(p);
  } else {
    tasks.forEach((task) => {
      taskDisplay.appendChild(taskCard(task));
    });
  }

  return taskDisplay;
}

const taskCard = (task) => {
  const taskDiv = document.createElement('div');
  taskDiv.classList.add('task');
  taskDiv.id = task.id;

  // Set mainInfo
  // #region
  const mainInfo = document.createElement('div');
  mainInfo.classList.add('main-info');

  // Title and description
  const titleDescritionDiv = document.createElement('div');
  titleDescritionDiv.classList.add('title-description');
  const title = document.createElement('h4');
  title.textContent = task.title;
  mainInfo.appendChild(title);
  const description = document.createElement('p');
  description.textContent = task.description;
  titleDescritionDiv.appendChild(title);
  titleDescritionDiv.appendChild(description);
  mainInfo.appendChild(titleDescritionDiv);

  // Check done button
  const checkDoneDiv = document.createElement('div');
  checkDoneDiv.classList.add('check-done-div');
  const checkDone = document.createElement('input');
  checkDone.classList.add('form-check-input', 'mx-1', 'bg-dark', 'rounded');
  checkDone.type = 'checkbox';
  // checkDone.textContent = 'Done';
  checkDone.addEventListener('click', (event) => {
    event.stopPropagation();
    console.log('done');
  });
  checkDoneDiv.appendChild(checkDone);
  mainInfo.appendChild(checkDoneDiv);

  taskDiv.appendChild(mainInfo);
  // #endregion

  // Set extraInfo and buttons
  // #region
  const extraInfo = document.createElement('div');
  extraInfo.classList.add('extra-info');
  const infoContainer = document.createElement('div');
  infoContainer.classList.add('info-container');

  // Container info
  const dueDate = document.createElement('p');
  let formattedDate = 'No due date';
  if (task.dueDate) {
    const date = new Date(task.dueDate);
    if (!isNaN(date)) {
      formattedDate = format(date, 'dd/MM/yyyy');
    }
  }
  dueDate.textContent = `${formattedDate}`;
  infoContainer.appendChild(dueDate);

  const priority = document.createElement('p');
  const priorityText = `${task.priority
    .charAt(0)
    .toUpperCase()}${task.priority.slice(1)} priority`;
  priority.textContent = priorityText;
  priority.classList.add('fw-bold');
  switch (task.priority) {
    case 'high':
      priority.classList.add('text-danger');
      break;
    case 'medium':
      priority.classList.add('text-secondary');
      break;
    case 'low':
      priority.classList.add('text-success');
      break;
  }
  infoContainer.appendChild(priority);

  if (task.project) {
    const project = document.createElement('p');
    project.textContent = `Project: ${task.project}`;
    infoContainer.appendChild(project);
  }

  extraInfo.appendChild(infoContainer);
  taskDiv.appendChild(extraInfo);

  // Buttons div
  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('edit-buttons-div');

  // Delete button
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('btn', 'm-1');
  deleteButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="3 6 5 6 21 6"></polyline>
  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m6 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
  <line x1="10" y1="11" x2="10" y2="17"></line>
  <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
  `;
  deleteButton.addEventListener('click', () => {
    // Call a function to handle the delete action
    const confirmDelete = confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      deleteTask(task);
    }
  });

  buttonsDiv.appendChild(deleteButton);

  // Edit button
  const editButton = document.createElement('button');
  editButton.classList.add('btn', 'm-1');
  editButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 20h9"></path>
    <path d="M16.5 3.5a2.828 2.828 0 0 1 4 4L12 16l-4 1 1-4 8.5-8.5z"></path>
  </svg>
  `;
  editButton.addEventListener('click', () => {
    // Call a function to handle the edit action
    editTask(task);
  });

  buttonsDiv.appendChild(editButton);
  extraInfo.appendChild(buttonsDiv);
  // #endregion

  // Add event listener to toggle extra info visibility
  taskDiv.addEventListener('click', toggleExtraInfoVisibility);

  return taskDiv;
};

const toggleExtraInfoVisibility = (event) => {
  const extraInfo = event.currentTarget.querySelector('.extra-info');
  extraInfo.classList.toggle('show');
};
