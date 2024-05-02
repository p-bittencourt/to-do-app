export default function createProjectForm(project = {}) {
  const form = document.createElement('form');
  form.innerHTML = `
                <div class="main-info">
                  <div class="mb-3">
                      <label for="projectTitle" class="form-label">Project Title</label>
                      <input type="text" class="form-control" id="projectTitle" value="${
                        project.title || ''
                      }" required>
                  </div>
                  <div class="mb-3">
                      <label for="projectDescription" class="form-label">Project Description</label>
                      <textarea class="form-control" id="projectDescription" rows="3">${
                        project.description || ''
                      }</textarea>
                  </div>    
                </div>
                <div class="extra-info">
                  <div class="mb-3">
                      <label for="projectDueDate" class="form-label">Due Date</label>
                      <input type="date" class="form-control" id="projectDueDate" value="${
                        project.dueDate || ''
                      }">
                  </div>
                  <div class="mb-3">
                  <label for="projectPriority" class="form-label">Priority</label>
                      <select class="form-select" id="projectPriority">
                          <option value="low" ${
                            project.priority === 'low' ? 'selected' : ''
                          }>Low</option>
                          <option value="medium" ${
                            project.priority === 'medium' || !project.priority
                              ? 'selected'
                              : ''
                          }>Medium</option>
                          <option value="high" ${
                            project.priority === 'high' ? 'selected' : ''
                          }>High</option>
                      </select>
                  </div>
                </div>   
        `;
  return form;
}
