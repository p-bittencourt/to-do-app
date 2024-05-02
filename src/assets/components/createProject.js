import Project from '../util/Project.js';

export default function createProject() {
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade');
  modal.id = 'createProjectModal';
  modal.innerHTML = projectModal();

  return modal;
}

const projectModal = () => {
  return `
        <form id="taskForm"> 
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">New Project</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                <h2>Hello there</h2>
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
