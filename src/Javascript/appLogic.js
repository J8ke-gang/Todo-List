//app logic will handle projects and todos
let projects = [{name: 'Default', todos: [] }];
let activeProject = projects[0];
// adds a project name and prevents duplicate projects
const createProject = (name) => { ... };
// makes sure the todos are added to correct project
const setActiveProject = (ProjectName) => { ... };
//adds a new todo to project
const addTodo = (Todo) => { ... };
// remove todo from project
const removeTodo = (index) => { ... };