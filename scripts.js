document.addEventListener('DOMContentLoaded', () => {
    const newNoteButton = document.getElementById('new-note-button');
    newNoteButton.addEventListener('click', createNewNote);

    function createNewNote() {
        const note = {
            id: Date.now(),
            name: 'New Note',
            description: 'Description here...',
            status: 'open'
        };
        addNoteToDOM(note);
    }

    function addNoteToDOM(note) {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note', note.status);
        noteElement.innerHTML = `
            <div class="note-header">
                <input type="text" class="note-name" value="${note.name}">
                <button class="delete-note">X</button>
            </div>
            <textarea class="note-description">${note.description}</textarea>
            <select class="note-status">
                <option value="open" ${note.status === 'open' ? 'selected' : ''}>Open</option>
                <option value="in-progress" ${note.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                <option value="done" ${note.status === 'done' ? 'selected' : ''}>Done</option>
            </select>
        `;
        document.getElementById(`${note.status}-notes`).appendChild(noteElement);

        const deleteButton = noteElement.querySelector('.delete-note');
        deleteButton.addEventListener('click', () => noteElement.remove());

        const statusSelect = noteElement.querySelector('.note-status');
        statusSelect.addEventListener('change', (e) => {
            noteElement.classList.remove('open', 'in-progress', 'done');
            note.status = e.target.value;
            noteElement.classList.add(note.status);
            document.getElementById(`${note.status}-notes`).appendChild(noteElement);
        });

        const nameInput = noteElement.querySelector('.note-name');
        nameInput.addEventListener('change', (e) => {
            note.name = e.target.value;
        });

        const descriptionTextarea = noteElement.querySelector('.note-description');
        descriptionTextarea.addEventListener('change', (e) => {
            note.description = e.target.value;
        });
    }
});