import { fetchItems } from './handleStorage';

export default function createForm(type, config = {}) {
  console.log(type);
  const form = document.createElement('form');
  let projectSelect = '';
  if (type == 'tasks') {
    projectSelect = projectsSelect();
  }
  form.innerHTML = `
        <div class="main-info">
          <div class="mb-3">
            <label for="configTitle" class="form-label">Title</label>
            <input type="text" class="form-control" id="configTitle" name="configTitle" value="${
              config.title || ''
            }" required>
          </div>
          <div class="mb-3">
            <label for="configDescription" class="form-label">Description</label>
            <textarea class="form-control" id="configDescription" name="configDescription" rows="3">${
              config.description || ''
            }</textarea>
          </div>
        </div>
          <div class="extra-info">
            <div class="mb-3">
              <label for="configDueDate" class="form-label">Due Date</label>
              <input type="date" class="form-control" id="configDueDate" name="configDueDate" value="${
                config.dueDate || ''
              }">
            </div>
            <div class="mb-3">
              <label for="configPriority" class="form-label">Priority</label>
                <select class="form-select" id="configPriority" name="configPriority">
                    <option value="low" ${
                      config.priority === 'low' ? 'selected' : ''
                    }>Low</option>
                    <option value="medium" ${
                      config.priority === 'medium' || !config.priority
                        ? 'selected'
                        : ''
                    }>Medium</option>
                    <option value="high" ${
                      config.priority === 'high' ? 'selected' : ''
                    }>High</option>
                </select>
                </div>
                ${projectSelect}
          </div>              
    `;

  return form;
}

const projectsSelect = () => {
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
  return selectDiv.outerHTML;
};
