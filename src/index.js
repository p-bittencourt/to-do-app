import displayTasks from './assets/components/displayTasks.js';
import createTask from './assets/components/createTask.js';
import { Modal } from 'bootstrap';
import '../dist/assets/styles/style.css';

const tasks = [
  {
    title: 'Task 1',
    description: 'Task 1 description',
    dueDate: '2021-12-31',
    priority: 'High',
    project: null,
    completed: false,
  },
  {
    title: 'Task 2',
    description: 'Task 2 description',
    dueDate: '2021-12-31',
    priority: 'Medium',
    project: null,
    completed: false,
  },
  {
    title: 'Task 3',
    description: 'Task 3 description',
    dueDate: '2021-12-31',
    priority: 'Low',
    project: null,
    completed: false,
  },
  {
    title: 'Task 4',
    description: 'Task 4 description',
    dueDate: '2021-12-31',
    priority: 'High',
    project: null,
    completed: false,
  },
];

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
