let todos = [];

const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    todos.unshift({
        id: Date.now().toString(),
        text
    });

    taskInput.value = '';
    renderTasks();
}

function deleteTask(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = todos.map(todo => `
        <div class="task-item">
            <span class="task-text">${todo.text}</span>
            <button class="delete-button" onclick="deleteTask('${todo.id}')">Delete</button>
        </div>
    `).join('');
}

addButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') addTask();
});