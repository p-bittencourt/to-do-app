export default function displayProjects(projects) {
  const projectDisplay = document.createElement('div');
  projectDisplay.classList.add('project-display');
  const h3 = document.createElement('h3');
  h3.textContent = 'Projects';
  projectDisplay.appendChild(h3);

  if (projects.length == 0) {
    const p = document.createElement('p');
    p.textContent = 'No projects to display';
    projectDisplay.appendChild(p);
  } else {
    projects.forEach((project) => {
      projectDisplay.appendChild(projectCard(project));
    });
  }

  return projectDisplay;
}

const projectCard = (project) => {
  const projectDiv = document.createElement('div');
  projectDiv.classList.add('task');
  projectDiv.id = project.id;

  // Set mainInfo
  // #region
  const mainInfo = document.createElement('div');
  mainInfo.classList.add('main-info');

  // Title and description
  const titleDescriptionDiv = document.createElement('div');
  titleDescriptionDiv.classList.add('title-description');
  const title = document.createElement('h4');
  title.textContent = project.title;
  mainInfo.appendChild(title);
  const description = document.createElement('p');
  description.textContent = project.description;
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
    console.log('done');
  });
  checkDoneDiv.appendChild(checkDone);
  mainInfo.appendChild(checkDoneDiv);

  projectDiv.appendChild(mainInfo);
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
  if (project.dueDate) {
    const date = new Date(project.dueDate);
    if (!isNaN(date)) {
      formattedDate = format(date, 'dd/MM/yyyy');
    }
  }
  dueDate.textContent = `${formattedDate}`;
  infoContainer.appendChild(dueDate);

  const priority = document.createElement('p');
  const priorityText = `${project.priority
    .charAt(0)
    .toUpperCase()}${project.priority.slice(1)} priority`;
  priority.textContent = priorityText;
  priority.classList.add('fw-bold');
  switch (project.priority) {
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

  if (project.project) {
    const project = document.createElement('p');
    project.textContent = `Project: ${project.project}`;
    infoContainer.appendChild(project);
  }

  extraInfo.appendChild(infoContainer);
  projectDiv.appendChild(extraInfo);

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
    const confirmDelete = confirm(
      'Are you sure you want to delete this project?'
    );
    if (confirmDelete) {
      // deleteTask(project);
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
    // editTask(project);
  });

  buttonsDiv.appendChild(editButton);
  extraInfo.appendChild(buttonsDiv);
  // #endregion

  // Add event listener to toggle extra info visibility
  // projectDiv.addEventListener('click', toggleExtraInfoVisibility);

  return projectDiv;
};
