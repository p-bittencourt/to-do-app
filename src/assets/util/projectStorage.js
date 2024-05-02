import createProjectForm from './createProjectForm';

function storeProject(project) {
  const projects = retrieveProjects();
  projects.push(project);
  setProjectToLocalStorage(projects);
}

function retrieveProjects() {
  return JSON.parse(localStorage.getItem('projects')) || [];
}

function deleteProject(project) {
  const projects = retrieveProjects();
  const newProjects = projects.filter((p) => p.id !== project.id);
  setProjectToLocalStorage(newProjects);
}

function editProject(project) {
  const form = createProjectForm(project);
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
    updateProjectEvent();
  });

  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('edit-buttons-div');
  buttonsDiv.appendChild(cancelEdit);
  buttonsDiv.appendChild(confirmEdit);

  const extraInfoDiv = form.querySelector('.extra-info');
  extraInfoDiv.appendChild(buttonsDiv);
  const formContainer = document.getElementById(`${project.id}`);
  formContainer.innerHTML = '';
  formContainer.appendChild(form);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleNewProjectInfo(form, project);
  });
}

function handleNewProjectInfo(form, project) {
  const newTitle = form.querySelector('#projectTitle').value;
  const newDescription = form.querySelector('#projectDescription').value;
  const newDueDate = form.querySelector('#projectDueDate').value;
  const newPriority = form.querySelector('#projectPriority').value;

  project.title = newTitle;
  project.description = newDescription;
  project.dueDate = newDueDate;
  project.priority = newPriority;

  updateProjectInStorage(project);
}

function updateProjectInStorage(project) {
  const projects = retrieveProjects();
  const index = projects.findIndex((p) => p.id === project.id);
  projects[index] = project;
  setProjectToLocalStorage(projects);
}

function setProjectToLocalStorage(projects) {
  localStorage.setItem('projects', JSON.stringify(projects));
  updateProjectEvent();
}

function updateProjectEvent() {
  const event = new Event('projectUpdated');
  document.body.dispatchEvent(event);
}

export { storeProject, retrieveProjects, deleteProject, editProject };
