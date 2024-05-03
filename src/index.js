// import displayTasks from './assets/components/displayTasks.js';
// import displayProjects from './assets/components/displayProjects.js';
import displayItems from './assets/components/displayItems.js';
import {
  createItem,
  createProjectSelect,
} from './assets/components/createItem.js';
import { fetchItems } from './assets/util/handleStorage.js';
import { Modal } from 'bootstrap';
import '../dist/assets/styles/style.css';

let content = document.getElementById('main-content');

// nav links
//#region
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
//#endregion

// task modal and project modal
//#region
const taskModal = createItem('tasks');
document.body.appendChild(taskModal);
const taskModalInstance = new Modal(taskModal);

const projectModal = createItem('projects');
document.body.appendChild(projectModal);
const projectModalInstance = new Modal(projectModal);
//#endregion

// add task and project div
//#region
let addNewTaskDiv = document.createElement('div');
addNewTaskDiv.classList.add('add-new-task');
let addNewTaskButton = document.createElement('button');
addNewTaskButton.classList.add('btn', 'btn-primary', 'my-1');
addNewTaskButton.textContent = 'Add New Task';
addNewTaskDiv.appendChild(addNewTaskButton);
addNewTaskButton.addEventListener('click', () => {
  taskModalInstance.show();
});
let startNewProjectButton = document.createElement('button');
startNewProjectButton.classList.add('btn', 'btn-secondary', 'my-1');
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
  const tasks = fetchItems('tasks');
  content.appendChild(addNewTaskDiv);
  content.appendChild(displayItems(tasks, 'tasks'));
}

function updateProjectDisplay() {
  content.innerHTML = '';
  projectModalInstance.hide();
  const projects = fetchItems('projects');
  content.appendChild(addNewTaskDiv);
  content.appendChild(displayItems(projects, 'projects'));

  const form = document.querySelector('#tasksForm');
  if (form) {
    updateProjectSelect(form);
  }
}

function updateProjectSelect(form) {
  const oldProjectSelect = form.querySelector('#configProject').parentElement;
  const newProjectSelect = createProjectSelect();
  form
    .querySelector('.extra-info')
    .replaceChild(newProjectSelect, oldProjectSelect);
}

updateTaskDisplay();
