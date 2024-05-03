import Project from '../util/Project';
import Task from '../util/Task';
import { storeItem } from '../util/handleStorage';
import createForm from '../util/createForm';

export default function createItem(type) {
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade');
  modal.id = `create${type}Modal`;
  modal.innerHTML = itemModal(createForm(type), type);

  const submitButton = modal.querySelector('#submitButton');
  submitButton.addEventListener('click', (event) => {
    submitForm(event, type);
  });

  return modal;
}

const itemModal = (formElement, type) => {
  const title = type.charAt(0).toUpperCase() + type.slice(1, -1);
  return `
        <form id="${type}Form"> 
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">New ${title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                ${formElement.outerHTML}
              </div>
              <div class="modal-footer">
              <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary" id="submitButton">Create ${title}</button>
            </div>
          </div>
        </div>
      </form>
      `;
};

const submitForm = (event, type) => {
  event.preventDefault();
  const formData = new FormData(document.getElementById(`${type}Form`));
  const inputTitle = formData.get('configTitle');
  const inputDescription = formData.get('configDescription');
  const inputDueDate = formData.get('configDueDate');
  const inputPriority = formData.get('configPriority');

  if (!inputTitle.trim()) {
    alert('Title is required');
    return;
  }

  let newItem;
  type == 'projects'
    ? (newItem = new Project(
        inputTitle,
        inputDescription,
        inputDueDate,
        inputPriority
      ))
    : (newItem = new Task(
        inputTitle,
        inputDescription,
        inputDueDate,
        inputPriority
      ));

  storeItem(newItem, type);
};
