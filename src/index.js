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

// NEW PLACEMENT OF ADD TASK AND PROJECT BUTTONS
const addNewTaskButton = document.getElementById('add-task-btn');
addNewTaskButton.addEventListener('click', () => {
  showTaskModal();
});

const addNewProjectButton = document.getElementById('new-project-btn');
addNewProjectButton.addEventListener('click', () => {
  showProjectModal();
});

// event listeners
document.body.addEventListener('taskUpdated', updateTaskDisplay);
document.body.addEventListener('projectUpdated', updateProjectDisplay);

// functions to update display
//#region
export function showTaskModal(selectedProjectId = null) {
  taskModalInstance.show();

  if (selectedProjectId) {
    const form = document.querySelector('#tasksForm');
    const projectSelect = form.querySelector('#configProject').parentElement;
    const newProjectSelect = createProjectSelect(selectedProjectId);
    form
      .querySelector('.extra-info')
      .replaceChild(newProjectSelect, projectSelect);
  }
}

function showProjectModal() {
  projectModalInstance.show();
}

function updateTaskDisplay() {
  content.innerHTML = '';
  taskModalInstance.hide();
  const tasks = fetchItems('tasks');
  // content.appendChild(addNewTaskDiv);
  content.appendChild(displayItems(tasks, 'tasks'));
}

function updateProjectDisplay() {
  content.innerHTML = '';
  projectModalInstance.hide();
  const projects = fetchItems('projects');
  // content.appendChild(addNewTaskDiv);
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
//#endregion

updateTaskDisplay();
