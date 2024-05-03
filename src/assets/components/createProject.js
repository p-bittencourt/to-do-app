import Project from '../util/Project.js';
import { storeItem } from '../util/handleStorage.js';
import createForm from '../util/createForm.js';

export default function createProject() {
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade');
  modal.id = 'createProjectModal';
  modal.innerHTML = projectModal(createForm());

  const submitButton = modal.querySelector('#submitButton');
  submitButton.addEventListener('click', submitForm);

  return modal;
}

const projectModal = (formElement) => {
  return `
        <form id="projectForm"> 
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">New Project</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                ${formElement.outerHTML}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" id="submitButton">Create Project</button>
              </div>
            </div>
          </div>
        </form>
        `;
};

const submitForm = (event) => {
  event.preventDefault();
  const formData = new FormData(document.getElementById('projectForm'));
  const projectTitle = formData.get('configTitle');
  const projectDescription = formData.get('configDescription');
  const projectDueDate = formData.get('configDueDate');
  const projectPriority = formData.get('configPriority');

  if (!projectTitle.trim()) {
    alert('Project title is required');
    return;
  }

  const newProject = new Project(
    projectTitle,
    projectDescription,
    projectDueDate,
    projectPriority
  );

  // storeProject(newProject);
  storeItem(newProject, 'projects');

  const form = document.getElementById('projectForm');
  form.reset();
};
