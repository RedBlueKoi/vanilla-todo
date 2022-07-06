import './style.css'

import { addTodo, changeTodoName, checkTodo, removeTodo, todoList } from  "./todo/todo";

const todoForm = document.getElementById("todo-header") as HTMLFormElement;
const todoInput = document.getElementById("todo-name") as HTMLInputElement;
const itemsList = document.getElementById("todo-list") as HTMLElement;

todoForm?.addEventListener("submit", (event) => {
  addTodo(event, todoInput?.value);
  todoInput.value = "";
  render();
});

const onChange = (id: number) => {
  checkTodo(id)
  console.log(todoList);
}
const onRemove = (id: number) => {
  removeTodo(id)
  render();
}
const onNameChange = (id: number) => {
  const input = document.getElementById(`name_${id}`) as HTMLInputElement;
  const actualValue = input.value
  changeTodoName(id, actualValue);
  render();
}

const render = () => {
  itemsList.innerHTML = "";
  todoList.forEach(todo => {
    const htmlItem = document.createElement("div");
    htmlItem.classList.add('todo-item');
    htmlItem.innerHTML = `<div class="todo-body"><input type="checkbox" id="check_${todo.id}" checked="${todo.isChecked}" /><input type="text" id="name_${todo.id}" class="todo-item-label" value="${todo.name}" /></div><button type="button" class="remove-button">Remove</button>`;
    // Input checkbox
    const input = htmlItem.querySelector("input[type=checkbox]") as HTMLInputElement;
    input.addEventListener("change", () => onChange(todo.id))
    // Input name
    const name = htmlItem.querySelector("input[type=text]") as HTMLInputElement;
    name.addEventListener("change", () => onNameChange(todo.id))
    // Button
    const button = htmlItem.getElementsByTagName("button")[0];
    button.addEventListener("click", () => onRemove(todo.id));
    itemsList.append(htmlItem)
  })
}

render();