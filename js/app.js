// DOM Elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Array to store todo items
let todos = [];

// Function to load todos from local storage
function loadTodos() {
    // Try to get todos from localStorage
    const storedTodos = localStorage.getItem('todos');
    
    // If todos exist in localStorage, parse them and update the todos array
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
        renderTodos();
    }
}

// Function to save todos to local storage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to create a new todo item
function createTodoElement(todo, index) {
    // Create the list item
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    
    // Add 'completed' class if todo is marked as completed
    if (todo.completed) {
        todoItem.classList.add('completed');
    }
    
    // Create the todo text element
    const todoText = document.createElement('span');
    todoText.classList.add('todo-text');
    todoText.textContent = todo.text;
    
    // Add click event to toggle completed status
    todoText.addEventListener('click', () => {
        toggleTodoComplete(index);
    });
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    
    // Add click event to delete button
    deleteBtn.addEventListener('click', () => {
        deleteTodo(index);
    });
    
    // Append elements to the todo item
    todoItem.appendChild(todoText);
    todoItem.appendChild(deleteBtn);
    
    return todoItem;
}

// Function to render all todos
function renderTodos() {
    // Clear the current list
    todoList.innerHTML = '';
    
    // Render each todo item
    todos.forEach((todo, index) => {
        const todoElement = createTodoElement(todo, index);
        todoList.appendChild(todoElement);
    });
}

// Function to add a new todo
function addTodo(text) {
    // Skip empty todos
    if (text.trim() === '') return;
    
    // Create new todo object
    const newTodo = {
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    // Add to todos array
    todos.push(newTodo);
    
    // Save to localStorage and render
    saveTodos();
    renderTodos();
}

// Function to toggle todo completed status
function toggleTodoComplete(index) {
    // Toggle the completed status
    todos[index].completed = !todos[index].completed;
    
    // Save to localStorage and render
    saveTodos();
    renderTodos();
}

// Function to delete a todo
function deleteTodo(index) {
    // Remove the todo from the array
    todos.splice(index, 1);
    
    // Save to localStorage and render
    saveTodos();
    renderTodos();
}

// Event listener for form submission
todoForm.addEventListener('submit', function(event) {
    // Prevent default form submission
    event.preventDefault();
    
    // Get the input value and add the todo
    const todoText = todoInput.value;
    addTodo(todoText);
    
    // Clear the input field
    todoInput.value = '';
    
    // Focus on the input field
    todoInput.focus();
});

// Initialize the app - load todos from localStorage
document.addEventListener('DOMContentLoaded', loadTodos);
