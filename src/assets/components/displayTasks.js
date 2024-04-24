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
      taskDisplay.appendChild(taskFormatter(task));
    });
  }

  return taskDisplay;
}

const taskFormatter = (task) => {
  const taskDiv = document.createElement('div');
  taskDiv.classList.add('task');
  const title = document.createElement('h4');
  title.textContent = task.title;
  taskDiv.appendChild(title);
  const description = document.createElement('p');
  description.textContent = task.description;
  taskDiv.appendChild(description);
  const dueDate = document.createElement('p');
  dueDate.textContent = `Due date: ${task.dueDate}`;
  taskDiv.appendChild(dueDate);
  const priority = document.createElement('p');
  priority.textContent = `Priority: ${task.priority}`;
  taskDiv.appendChild(priority);
  const project = document.createElement('p');
  project.textContent = `Project: ${task.project}`;
  taskDiv.appendChild(project);
  const completed = document.createElement('p');
  completed.textContent = `Completed: ${task.completed}`;
  taskDiv.appendChild(completed);
  return taskDiv;
};
