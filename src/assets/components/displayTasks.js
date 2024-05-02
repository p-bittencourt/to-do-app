import displayCard from '../util/displayCard';
import { deleteTask, editTask } from '../util/taskStorage';

export default function displayTasks(tasks) {
  const taskDisplay = document.createElement('div');
  taskDisplay.classList.add('task-display');
  const h3 = document.createElement('h3');
  h3.textContent = 'Tasks';
  taskDisplay.appendChild(h3);

  if (tasks.length === 0) {
    const p = document.createElement('p');
    p.textContent = 'No tasks to display';
    taskDisplay.appendChild(p);
  } else {
    tasks.forEach((task) => {
      taskDisplay.appendChild(taskCard(task));
    });
  }

  return taskDisplay;
}

const taskCard = (task) => {
  const taskDiv = document.createElement('div');
  taskDiv.classList.add('card');
  taskDiv.id = task.id;

  taskDiv.appendChild(displayCard(task, deleteTask, editTask));
  return taskDiv;
};
