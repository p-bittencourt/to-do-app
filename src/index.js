import displayTasks from './assets/components/displayTasks.js';
import createTask from './assets/components/createTask.js';
import createProject from './assets/components/createProject.js';
import { retrieveTasks } from './assets/util/taskStorage.js';
import { Modal } from 'bootstrap';
import '../dist/assets/styles/style.css';

let tasks = retrieveTasks();

let content = document.getElementById('main-content');

// task modal
const taskModal = createTask();
document.body.appendChild(taskModal);
const taskModalInstance = new Modal(taskModal);

// project modal
const projectModal = createProject();
document.body.appendChild(projectModal);
const projectModalInstance = new Modal(projectModal);

let addNewTaskDiv = document.createElement('div');
addNewTaskDiv.classList.add('add-new-task');
let addNewTaskButton = document.createElement('button');
addNewTaskButton.classList.add('btn', 'btn-primary');
addNewTaskButton.textContent = 'Add New Task';
addNewTaskDiv.appendChild(addNewTaskButton);
addNewTaskButton.addEventListener('click', () => {
  taskModalInstance.show();
});
let startNewProjectButton = document.createElement('button');
startNewProjectButton.classList.add('btn', 'btn-secondary');
startNewProjectButton.textContent = 'Start New Project';
startNewProjectButton.addEventListener('click', () => {
  projectModalInstance.show();
});
addNewTaskDiv.appendChild(addNewTaskButton);
addNewTaskDiv.appendChild(startNewProjectButton);

content.appendChild(addNewTaskDiv);
content.appendChild(displayTasks(tasks));

document.body.addEventListener('taskUpdated', updateTaskDisplay);

function updateTaskDisplay() {
  content.innerHTML = '';
  taskModalInstance.hide();
  tasks = retrieveTasks();
  content.appendChild(addNewTaskDiv);
  content.appendChild(displayTasks(tasks));
}

updateTaskDisplay();
