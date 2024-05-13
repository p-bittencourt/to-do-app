export default function createNoteForm(config = {}) {
  const form = document.createElement('form');
  form.innerHTML = `
    <div class="note-info">
      <div class="note-title">
          <label for="configTitle" class="form-label">Title</label>
          <input type="text" class="form-control" id="configTitle" name="configTitle" value="${
            config.title || ''
          }" required>
      </div>
      <div class="note-description extra-info">
          <label for="configDescription" class="form-label">Description</label>
          <textarea class="form-control" id="configDescription" name="configDescription" rows="10">${
            config.description || ''
          }</textarea>
      </div>
    </div>
  `;
  return form;
}
