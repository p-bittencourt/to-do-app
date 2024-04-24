import displayTasks from './assets/components/displayTasks.js';
import createTask from './assets/components/createTask.js';
import { retrieveTasks } from './assets/util/taskStorage.js';
import { Modal } from 'bootstrap';
import '../dist/assets/styles/style.css';

const tasks = retrieveTasks();

let content = document.getElementById('main-content');

const taskModal = createTask();
document.body.appendChild(taskModal);
const modal = new Modal(taskModal);

let addNewTaskDiv = document.createElement('div');
addNewTaskDiv.classList.add('add-new-task');
let addNewTaskButton = document.createElement('button');
addNewTaskButton.textContent = 'Add New Task';
addNewTaskDiv.appendChild(addNewTaskButton);
addNewTaskButton.addEventListener('click', () => {
  modal.show();
});

content.appendChild(addNewTaskDiv);
content.appendChild(displayTasks(tasks));
