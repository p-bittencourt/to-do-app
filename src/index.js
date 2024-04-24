import displayTasks from './assets/components/displayTasks.js';
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
];

let content = document.getElementById('main-content');
content.appendChild(displayTasks(tasks));
