import { getActiveProject } from "./project.js";

const addTodo = (todo) => {
  const project = getActiveProject();
  if (project) {
    project.todos.push({ ...todo, completed: false });
  }
};

//remove to do
const removeTodo = (index) => {
  const project = getActiveProject();
  if (project) {
    project.todos.splice(index, 1);
  }
};

//toggle complete
const toggleTodoCompletion = (index) => {
  const project = getActiveProject();
  if (project && project.todos[index]) {
    project.todos[index].completed = !project.todos[index].completed;
  }
};

export { addTodo, removeTodo, toggleTodoCompletion };
