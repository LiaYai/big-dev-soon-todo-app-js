const bodyElement = document.querySelector('body');
const themeToggleElement = document.querySelector('#themeSwitch');
const iconSun = document.querySelector('.icon-sun');
const iconMoon = document.querySelector('.icon-moon');
const addButton = document.querySelector('#todoAddButton');
const inputField = document.querySelector('#todoInput');
const todoListElement = document.querySelector('#todoList');
const todoItemTemplateElement = document.querySelector('#todoItemTemplate').content;
const counterElement = document.querySelector('#todoCounter');
const footerElement = document.querySelector('.todo-footer');
const emptyMessageElement = document.querySelector('.no-items');
let todoCount = 0;
let completedCount = 0;

function toggleTheme() {
  bodyElement.classList.toggle('dark-theme');
  bodyElement.classList.toggle('light-theme');
  toggleIcon();
}

function toggleIcon() {
  if (bodyElement.classList.contains('dark-theme')) {
    iconSun.style.display = 'block';
    iconMoon.style.display = 'none';
  } else {
    iconSun.style.display = 'none';
    iconMoon.style.display = 'block';
  }
}

function applyPreferredTheme() {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDarkScheme) {
    bodyElement.classList.add('dark-theme');
    bodyElement.classList.remove('light-theme');
  } else {
    bodyElement.classList.add('light-theme');
    bodyElement.classList.remove('dark-theme');
  }
  toggleIcon();
}

function displayEmptyMessage() {
  if (todoCount === 0) {
    footerElement.style.display = 'none';
    emptyMessageElement.style.display = 'block';
  } else {
    footerElement.style.display = 'block';
    emptyMessageElement.style.display = 'none';
  }
}

function updateCounterDisplay() {
  counterElement.textContent = `${completedCount} / ${todoCount} todos completed`;
}

function addTodoItem() {
  const todoText = inputField.value.trim();
  if (todoText === '') {
    return;
  }

  addButton.style.display = 'none';
  const todoItemElement = todoItemTemplateElement.cloneNode(true);
  const labelElement = todoItemElement.querySelector('.todo-label');
  labelElement.textContent = todoText;
  labelElement.htmlFor = `todo-${todoCount + 1}`;
  const deleteButtonElement = todoItemElement.querySelector('.todo-delete-button');
  const checkboxElement = todoItemElement.querySelector('.todo-checkbox');
  checkboxElement.id = `todo-${todoCount + 1}`;

  todoListElement.append(todoItemElement);
  inputField.value = '';
  todoCount++;
  updateCounterDisplay();
  displayEmptyMessage();

  deleteButtonElement.addEventListener('click', (event) => {
    const todoItemToRemove = event.target.closest('.todo-item');
    todoListElement.removeChild(todoItemToRemove);
    todoCount--;
    checkboxElement.checked && completedCount--;
    updateCounterDisplay();
    displayEmptyMessage();
  });

  checkboxElement.addEventListener('change', () => {
    if (checkboxElement.checked) {
      completedCount++;
    } else {
      completedCount--;
    }
    updateCounterDisplay();
  });
}

function toggleAddButton() {
  addButton.style.display = inputField.value.trim() === '' ? 'none' : 'block';
}

inputField.addEventListener('input', toggleAddButton);
addButton.addEventListener('click', addTodoItem);
themeToggleElement.addEventListener('click', toggleTheme);

inputField.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTodoItem();
  }
});

toggleAddButton();
updateCounterDisplay();
displayEmptyMessage();
applyPreferredTheme();
