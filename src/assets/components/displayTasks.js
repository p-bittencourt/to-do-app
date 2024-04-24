import { deleteTask } from '../util/taskStorage';

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
  taskDiv.classList.add('task');

  // Set mainInfo and buttons
  // #region
  const mainInfo = document.createElement('div');
  mainInfo.classList.add('main-info');

  const title = document.createElement('h4');
  title.textContent = task.title;
  mainInfo.appendChild(title);
  const description = document.createElement('p');
  description.textContent = task.description;
  mainInfo.appendChild(description);

  taskDiv.appendChild(mainInfo);
  // #endregion

  // Set extraInfo
  // #region
  const extraInfo = document.createElement('div');
  extraInfo.classList.add('extra-info');

  const dueDate = document.createElement('p');
  dueDate.textContent = `Due date: ${task.dueDate}`;
  extraInfo.appendChild(dueDate);
  const priority = document.createElement('p');
  priority.textContent = `Priority: ${task.priority}`;
  extraInfo.appendChild(priority);
  const project = document.createElement('p');
  project.textContent = `Project: ${task.project}`;
  extraInfo.appendChild(project);
  const completed = document.createElement('p');
  completed.textContent = `Completed: ${task.completed}`;
  taskDiv.appendChild(extraInfo);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('btn', 'btn-danger', 'mx-1');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    // Call a function to handle the delete action
    deleteTask(task);
  });
  extraInfo.appendChild(deleteButton);

  const editButton = document.createElement('button');
  editButton.classList.add('btn', 'btn-light', 'mx-1');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => {
    // Call a function to handle the edit action
    editTask(task);
  });
  extraInfo.appendChild(editButton);
  // #endregion

  return taskDiv;
};
