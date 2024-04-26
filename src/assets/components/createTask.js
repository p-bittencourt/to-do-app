import Task from '../util/Task';
import { storeTask } from '../util/taskStorage';
import createTaskForm from '../util/createTaskForm';

export default function createTask() {
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade');
  modal.id = 'createTaskModal';
  modal.innerHTML = taskModal(createTaskForm());

  const submitButton = modal.querySelector('#submitButton');
  submitButton.addEventListener('click', submitForm);
  return modal;
}

const taskModal = (formElement) => {
  return `
  <form id="taskForm"> 
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">New Task</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          ${formElement.outerHTML}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary" id="submitButton">Create Task</button>
        </div>
      </div>
    </div>
  </form>
  `;
};

const submitForm = (event) => {
  event.preventDefault();
  const taskTitle = document.getElementById('taskTitle').value;
  const taskDescription = document.getElementById('taskDescription').value;
  const taskDueDate = document.getElementById('taskDueDate').value;
  const taskPriority = document.getElementById('taskPriority').value;

  if (!taskTitle.trim()) {
    alert('Task title is required');
    return;
  }

  const newTask = new Task(
    taskTitle,
    taskDescription,
    taskDueDate,
    taskPriority
  );

  storeTask(newTask);

  const form = document.getElementById('taskForm');
  form.reset();
};
