export interface Todo {
  id: number
  name: string
  isChecked: boolean
}

const idGen = function* (): Generator<number> {
  let id = 1;
  while(true) {
    yield id++;
  }
}

const gen = idGen();

let todoList: Todo[] = [{
  id: 0,
  name: "First todo",
  isChecked: false
}]
const addTodo = (event: Event, name: string) => {
  event.preventDefault();
  todoList.push({
    id: gen.next().value,
    name,
    isChecked: false
  })
}
const checkTodo = (id: number) => {
  const index = todoList.findIndex(item => item.id === id);
  const item = todoList[index];
  todoList[index] = Object.assign({}, item, { isChecked: !item.isChecked})
}

const removeTodo = (id: number) => {
  todoList = todoList.filter(item => item.id !== id);
}

const changeTodoName = (id: number, name: string) => {
  const index = todoList.findIndex(item => item.id === id);
  const item = todoList[index];
  todoList[index] = Object.assign({}, item, { name })
}

export {
  todoList,
  addTodo,
  checkTodo,
  removeTodo,
  changeTodoName,
}