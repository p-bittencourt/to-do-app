// Create a form which can be used to create or edit a task or project

export default function createForm(config = {}) {
  const form = document.createElement('form');
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
          </div>              
    `;

  return form;
}
