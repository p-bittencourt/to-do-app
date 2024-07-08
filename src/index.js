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
const notesLink = document.getElementById('notes-link');
projectsLink.addEventListener('click', (event) => {
  event.preventDefault();
  updateProjectDisplay();
});

tasksLink.addEventListener('click', (event) => {
  event.preventDefault();
  updateTaskDisplay();
});
notesLink.addEventListener('click', (event) => {
  event.preventDefault();
  updateNoteDisplay();
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

const noteModal = createItem('notes');
document.body.appendChild(noteModal);
const noteModalInstance = new Modal(noteModal);
//#endregion

// NEW PLACEMENT OF ADD TASK AND PROJECT BUTTONS
//#region
const addNewTaskButton = document.getElementById('add-task-btn');
addNewTaskButton.addEventListener('click', () => {
  showTaskModal();
});

const addNewProjectButton = document.getElementById('new-project-btn');
addNewProjectButton.addEventListener('click', () => {
  showProjectModal();
});

const addNewNoteButton = document.getElementById('add-note-btn');
addNewNoteButton.addEventListener('click', () => {
  noteModalInstance.show();
});
//#endregion

// event listeners
document.body.addEventListener('taskUpdated', updateTaskDisplay);
document.body.addEventListener('projectUpdated', updateProjectDisplay);
document.body.addEventListener('noteUpdated', updateNoteDisplay);

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
  content.appendChild(displayItems(tasks, 'tasks'));
}

function updateProjectDisplay() {
  content.innerHTML = '';
  projectModalInstance.hide();
  const projects = fetchItems('projects');
  content.appendChild(displayItems(projects, 'projects'));

  const form = document.querySelector('#tasksForm');
  if (form) {
    updateProjectSelect(form);
  }
}

function updateNoteDisplay() {
  content.innerHTML = '';
  noteModalInstance.hide();
  const notes = fetchItems('notes');
  content.appendChild(displayItems(notes, 'notes'));
}

function updateProjectSelect(form) {
  // this function updates the select from the task form to correctly show the projects
  const oldProjectSelect = form.querySelector('#configProject').parentElement;
  const newProjectSelect = createProjectSelect();
  form
    .querySelector('.extra-info')
    .replaceChild(newProjectSelect, oldProjectSelect);
}
//#endregion

updateTaskDisplay();
