import displayTasks from './assets/components/displayTasks.js';
import createTask from './assets/components/createTask.js';
import { retrieveTasks } from './assets/util/taskStorage.js';
import { Modal } from 'bootstrap';
import '../dist/assets/styles/style.css';

let tasks = retrieveTasks();

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
addNewTaskDiv.appendChild(addNewTaskButton);

content.appendChild(addNewTaskDiv);
content.appendChild(displayTasks(tasks));

document.body.addEventListener('taskStored', updateTaskDisplay);

function updateTaskDisplay() {
  content.innerHTML = '';
  modal.hide();
  tasks = retrieveTasks();
  content.appendChild(addNewTaskDiv);
  content.appendChild(displayTasks(tasks));
}

updateTaskDisplay();
