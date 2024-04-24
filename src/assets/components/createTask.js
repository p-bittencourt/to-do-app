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
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">New Task</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          ${formElement.outerHTML} <!-- Aqui você pode adicionar o formulário para criar uma nova tarefa -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" id="submitButton">Save changes</button>
        </div>
      </div>
    </div>
  `;
};

const createTaskForm = () => {
  const form = document.createElement('form');
  form.innerHTML = `
        <div class="mb-3">
            <label for="taskTitle" class="form-label">Task Title</label>
            <input type="text" class="form-control" id="taskTitle" placeholder="Enter task title">
        </div>
        <div class="mb-3">
            <label for="taskDescription" class="form-label">Task Description</label>
            <textarea class="form-control" id="taskDescription" rows="3" placeholder="Enter task description"></textarea>
        </div>
        <div class="mb-3">
            <label for="taskDueDate" class="form-label">Due Date</label>
            <input type="date" class="form-control" id="taskDueDate">
        </div>
    `;
  return form;
};

const submitForm = (event) => {
  event.preventDefault();
  const taskTitle = document.getElementById('taskTitle').value;
  const taskDescription = document.getElementById('taskDescription').value;
  const taskDueDate = document.getElementById('taskDueDate').value;

  console.log(taskTitle, taskDescription, taskDueDate);
};
