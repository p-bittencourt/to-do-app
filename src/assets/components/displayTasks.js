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
  taskDiv.classList.add('task');
  taskDiv.id = task.id;

  // Set mainInfo
  // #region
  const mainInfo = document.createElement('div');
  mainInfo.classList.add('main-info');

  const title = document.createElement('h4');
  title.textContent = task.title;
  mainInfo.appendChild(title);
  const description = document.createElement('p');
  description.textContent = task.description;
  mainInfo.appendChild(description);
  const checkDone = document.createElement('button');
  checkDone.classList.add('btn', 'btn-light', 'mx-1');
  checkDone.textContent = 'Done';
  checkDone.addEventListener('click', () => {
    console.log('done');
  });
  mainInfo.appendChild(checkDone);

  taskDiv.appendChild(mainInfo);
  // #endregion

  // Set extraInfo and buttons
  // #region
  const extraInfo = document.createElement('div');
  extraInfo.classList.add('extra-info');

  const infoContainer = document.createElement('div');
  infoContainer.classList.add('info-container');

  const dueDate = document.createElement('p');
  dueDate.textContent = `Due date: ${task.dueDate}`;
  infoContainer.appendChild(dueDate);
  const priority = document.createElement('p');
  priority.textContent = `Priority: ${task.priority}`;
  infoContainer.appendChild(priority);
  const project = document.createElement('p');
  project.textContent = `Project: ${task.project}`;
  infoContainer.appendChild(project);
  const completed = document.createElement('p');
  completed.textContent = `Completed: ${task.completed}`;
  extraInfo.appendChild(infoContainer);
  taskDiv.appendChild(extraInfo);

  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('edit-buttons-div');

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('btn', 'btn-danger', 'mx-1');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    // Call a function to handle the delete action
    const confirmDelete = confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      deleteTask(task);
    }
  });

  buttonsDiv.appendChild(deleteButton);

  const editButton = document.createElement('button');
  editButton.classList.add('btn', 'btn-light', 'mx-1');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => {
    // Call a function to handle the edit action
    editTask(task);
  });

  buttonsDiv.appendChild(editButton);
  extraInfo.appendChild(buttonsDiv);
  // #endregion

  return taskDiv;
};
