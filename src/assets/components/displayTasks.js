export default function displayTasks() {
  const taskDisplay = document.createElement('div');
  taskDisplay.classList.add('task-display');
  const h3 = document.createElement('h3');
  h3.textContent = 'Tasks';
  taskDisplay.appendChild(h3);

  return taskDisplay;
}
