function storeTask(task) {
  // store the new task in the tasks array in localStorage
  const tasks = retrieveTasks();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  console.log('Task stored');
  const event = new Event('taskStored');
  document.body.dispatchEvent(event);
}

function retrieveTasks() {
  // retrieve the tasks array from localStorage
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

export { storeTask, retrieveTasks };
