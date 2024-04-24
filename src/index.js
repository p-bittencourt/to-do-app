import displayTasks from './assets/components/displayTasks.js';
import '../dist/assets/styles/style.css';

let content = document.getElementById('main-content');
content.appendChild(displayTasks());
