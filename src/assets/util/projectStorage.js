function storeProject(project) {
  const projects = retrieveProjects();
  projects.push(project);
  setProjectToLocalStorage(projects);
}

function retrieveProjects() {
  return JSON.parse(localStorage.getItem('projects')) || [];
}

function deleteProject(project) {
  console.log(project);
}

function editProject(project) {
  console.log(project);
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
