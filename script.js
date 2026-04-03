let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = 'all';

const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
const filterTabs = document.querySelectorAll('.filter-tab');

/* SAVE FUNCTION */
function save() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    todos.unshift({
        id: Date.now().toString(),
        text,
        completed: false
    });

    taskInput.value = '';
    save();
    renderTasks();
}

function toggleTask(id) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    save();
    renderTasks();
}

function deleteTask(id) {
    todos = todos.filter(todo => todo.id !== id);
    save();
    renderTasks();
}

/* FILTER FUNCTION */
function filterTasks() {
    return todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
    });
}

function renderTasks() {
    const filtered = filterTasks();

    taskList.innerHTML = filtered.map(todo => `
        <div class="task-item ${todo.completed ? 'completed' : ''}">
            <input type="checkbox" 
                ${todo.completed ? 'checked' : ''} 
                onchange="toggleTask('${todo.id}')">
            <span class="task-text">${todo.text}</span>
            <button class="delete-button" onclick="deleteTask('${todo.id}')">Delete</button>
        </div>
    `).join('');
}

/* FILTER TAB CLICK */
filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        currentFilter = tab.dataset.filter;
        renderTasks();
    });
});

addButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') addTask();
});

/* INITIAL LOAD */
renderTasks();