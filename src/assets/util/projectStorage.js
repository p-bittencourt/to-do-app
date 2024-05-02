function storeProject(project) {
  const projects = retrieveProjects();
  projects.push(project);
  console.log(projects);
  setProjectToLocalStorage(projects);
}

function retrieveProjects() {
  return JSON.parse(localStorage.getItem('projects')) || [];
}

function setProjectToLocalStorage(projects) {
  localStorage.setItem('projects', JSON.stringify(projects));
}

function updateProjectEvent() {
  const event = new Event('projectUpdated');
  document.body.dispatchEvent(event);
}

export { storeProject };
