import displayTasks from './assets/components/displayTasks.js';
import displayProjects from './assets/components/displayProjects.js';
import createTask from './assets/components/createTask.js';
import createProject from './assets/components/createProject.js';
import { retrieveTasks } from './assets/util/taskStorage.js';
import { retrieveProjects } from './assets/util/projectStorage.js';
import { Modal } from 'bootstrap';
import '../dist/assets/styles/style.css';

let content = document.getElementById('main-content');
const projectsLink = document.getElementById('projects-link');
const tasksLink = document.getElementById('tasks-link');
projectsLink.addEventListener('click', (event) => {
  event.preventDefault();
  updateProjectDisplay();
});

tasksLink.addEventListener('click', (event) => {
  event.preventDefault();
  updateTaskDisplay();
});

// task modal and project modal
//#region
const taskModal = createTask();
document.body.appendChild(taskModal);
const taskModalInstance = new Modal(taskModal);

const projectModal = createProject();
document.body.appendChild(projectModal);
const projectModalInstance = new Modal(projectModal);
//#endregion

// add task and project div
//#region
let addNewTaskDiv = document.createElement('div');
addNewTaskDiv.classList.add('add-new-task');
let addNewTaskButton = document.createElement('button');
addNewTaskButton.classList.add('btn', 'btn-primary', 'my-2');
addNewTaskButton.textContent = 'Add New Task';
addNewTaskDiv.appendChild(addNewTaskButton);
addNewTaskButton.addEventListener('click', () => {
  taskModalInstance.show();
});
let startNewProjectButton = document.createElement('button');
startNewProjectButton.classList.add('btn', 'btn-secondary', 'my-2');
startNewProjectButton.textContent = 'Start New Project';
startNewProjectButton.addEventListener('click', () => {
  projectModalInstance.show();
});
addNewTaskDiv.appendChild(addNewTaskButton);
addNewTaskDiv.appendChild(startNewProjectButton);
//#endregion

document.body.addEventListener('taskUpdated', updateTaskDisplay);
document.body.addEventListener('projectUpdated', updateProjectDisplay);

function updateTaskDisplay() {
  content.innerHTML = '';
  taskModalInstance.hide();
  const tasks = retrieveTasks();
  content.appendChild(addNewTaskDiv);
  content.appendChild(displayTasks(tasks));
}

function updateProjectDisplay() {
  content.innerHTML = '';
  projectModalInstance.hide();
  const projects = retrieveProjects();
  content.appendChild(addNewTaskDiv);
  content.appendChild(displayProjects(projects));
}

updateTaskDisplay();
