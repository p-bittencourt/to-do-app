import { format } from 'date-fns';
import { deleteItem, editItem, fetchSingleItem } from './handleStorage';

export default function displayCard(input, key) {
  const cardDiv = document.createElement('div');
  // cardDiv.classList.add('card');

  // Set mainInfo
  // #region
  const mainInfo = document.createElement('div');
  mainInfo.classList.add('main-info');

  // Title and description
  const titleDescriptionDiv = document.createElement('div');
  titleDescriptionDiv.classList.add('title-description');
  const title = document.createElement('h4');
  title.textContent = input.title;
  mainInfo.appendChild(title);
  const description = document.createElement('p');
  description.textContent = input.description;
  titleDescriptionDiv.appendChild(title);
  titleDescriptionDiv.appendChild(description);
  mainInfo.appendChild(titleDescriptionDiv);

  // Check done button
  const checkDoneDiv = document.createElement('div');
  checkDoneDiv.classList.add('check-done-div');
  const checkDone = document.createElement('input');
  checkDone.classList.add('form-check-input', 'mx-1', 'bg-dark', 'rounded');
  checkDone.type = 'checkbox';
  // checkDone.textContent = 'Done';
  checkDone.addEventListener('click', (event) => {
    event.stopPropagation();
    console.log(input);
  });
  checkDoneDiv.appendChild(checkDone);
  mainInfo.appendChild(checkDoneDiv);

  cardDiv.appendChild(mainInfo);
  // #endregion

  // Set extraInfo
  // #region
  const extraInfo = document.createElement('div');
  extraInfo.classList.add('extra-info');
  const infoContainer = document.createElement('div');
  infoContainer.classList.add('info-container');

  // Container info
  const dueDate = document.createElement('p');
  let formattedDate = 'No due date';
  if (input.dueDate) {
    const date = new Date(input.dueDate);
    if (!isNaN(date)) {
      formattedDate = format(date, 'dd/MM/yyyy');
    }
  }
  dueDate.textContent = `${formattedDate}`;
  infoContainer.appendChild(dueDate);

  const priority = document.createElement('p');
  const priorityText = `${input.priority
    .charAt(0)
    .toUpperCase()}${input.priority.slice(1)} priority`;
  priority.textContent = priorityText;
  priority.classList.add('fw-bold');
  switch (input.priority) {
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

  if (input.project) {
    const project = fetchSingleItem(input.project, 'projects');
    if (project) {
      const projectElement = document.createElement('p');
      projectElement.textContent = `Project: ${project.title}`;
      infoContainer.appendChild(projectElement);
    }
  }

  extraInfo.appendChild(infoContainer);
  cardDiv.appendChild(extraInfo);
  // #endregion

  // Buttons div
  //#region
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
    const confirmDelete = confirm('Are you sure you want to delete?');
    if (confirmDelete) {
      deleteItem(input, key);
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
    editItem(input, key);
  });

  buttonsDiv.appendChild(editButton);
  extraInfo.appendChild(buttonsDiv);
  //#endregion

  // Add event listener to toggle extra info visibility
  cardDiv.addEventListener('click', toggleExtraInfoVisibility);
  return cardDiv;
}

const toggleExtraInfoVisibility = (event) => {
  const extraInfo = event.currentTarget.querySelector('.extra-info');
  extraInfo.classList.toggle('show');
};
