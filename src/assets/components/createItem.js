import Project from '../util/Project';
import Task from '../util/Task';
import {
  storeItem,
  fetchItems,
  fetchSingleItem,
  updateItemInStorage,
} from '../util/handleStorage';
import createForm from '../util/createForm';

function createItem(type) {
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade');
  modal.id = `create${type}Modal`;
  const form = createForm();
  if (type == 'tasks') {
    addProjectSelectToForm(form);
  }
  modal.innerHTML = itemModal(form, type);

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
  if (type == 'tasks') {
    const inputProject = formData.get('configProject');
    newItem = new Task(
      inputTitle,
      inputDescription,
      inputDueDate,
      inputPriority,
      inputProject
    );
    if (inputProject) {
      const project = fetchSingleItem(inputProject, 'projects');
      project.projectTasks.push(newItem.id);
      updateItemInStorage(project, 'projects');
    }
  } else {
    newItem = new Project(
      inputTitle,
      inputDescription,
      inputDueDate,
      inputPriority
    );
  }

  storeItem(newItem, type);

  const form = document.getElementById(`${type}Form`);
  form.reset();
};

function createProjectSelect() {
  const projects = fetchItems('projects');
  const selectDiv = document.createElement('div');
  selectDiv.classList.add('mb-3');
  selectDiv.innerHTML = `
        <label for="configProject" class="form-label">Project</label>
        <select class="form-select" id="configProject" name="configProject">
            <option value="">None</option>
            ${projects.map((project) => {
              return `<option value="${project.id}">${project.title}</option>`;
            })}
        </select>
    `;
  return selectDiv;
}

const addProjectSelectToForm = (form) => {
  const projectsSelect = createProjectSelect();
  form.querySelector('.extra-info').appendChild(projectsSelect);
};

export { createItem, createProjectSelect };
