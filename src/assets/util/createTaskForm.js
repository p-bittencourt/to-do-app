export default function createTaskForm(task = {}) {
  const form = document.createElement('form');
  form.innerHTML = `
              <div class="main-info">
                <div class="mb-3">
                    <label for="taskTitle" class="form-label">Task Title</label>
                    <input type="text" class="form-control" id="taskTitle" placeholder="Enter task title" value="${
                      task.getTitle || ''
                    }">
                </div>
                <div class="mb-3">
                    <label for="taskDescription" class="form-label">Task Description</label>
                    <textarea class="form-control" id="taskDescription" rows="3" placeholder="Enter task description" value="${
                      task.getDescription || ''
                    }"></textarea>
                </div>    
              </div>
              <div class="extra-info">
                <div class="mb-3">
                    <label for="taskDueDate" class="form-label">Due Date</label>
                    <input type="date" class="form-control" id="taskDueDate" value="${
                      task.getDueDate || ''
                    }">
                </div>
                <div class="mb-3">
                <label for="taskPriority" class="form-label">Priority</label>
                    <select class="form-select" id="taskPriority">
                        <option value="low" ${
                          task.getPriority === 'low' ? 'selected' : ''
                        }>Low</option>
                        <option value="medium" ${
                          task.getPriority === 'medium' ||
                          task.getPriority === ''
                            ? 'selected'
                            : ''
                        }>Medium</option>
                        <option value="high" ${
                          task.getPriority === 'high' ? 'selected' : ''
                        }>High</option>
                    </select>
                </div>
              </div>   
      `;
  return form;
}
