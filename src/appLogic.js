let projects = [{ name: "Default", todos: [] }];
let activeProject = projects[0]; // Default active project

// Remove a project by name
const removeProject = (projectName) => {
  const projectIndex = projects.findIndex(
    (project) => project.name === projectName,
  );

  if (projectIndex !== -1) {
    projects.splice(projectIndex, 1);

    // If the active project is the one being removed, set activeProject to null or first project
    if (activeProject.name === projectName) {
      activeProject = projects.length > 0 ? projects[0] : null;
    }
    saveToLocalStorage(); // Save changes to localStorage
  } else {
    console.warn(`Project with name "${projectName}" not found.`);
  }
};

// Create a new project
const createProject = (name) => {
  if (!name) return; // Prevent creating a project without a name
  const newProject = { name, todos: [] };
  projects.push(newProject);
  setActiveProject(name); // Set the newly created project as the active project
  saveToLocalStorage();
};

// Set the active project by name
const setActiveProject = (projectName) => {
  const project = projects.find((project) => project.name === projectName);

  if (project) {
    activeProject = project;
    saveToLocalStorage();
  } else {
    console.warn(`Project with name "${projectName}" not found.`);
  }
};

// Add a new todo to the active project
const addTodo = (todo) => {
  if (activeProject) {
    // Adding the completed property to the todo
    const newTodo = { ...todo, completed: false };
    activeProject.todos.push(newTodo);
    saveToLocalStorage();
  } else {
    console.warn("No active project to add todo to.");
  }
};

// Remove a todo from the active project
const removeTodo = (index) => {
  if (activeProject && activeProject.todos[index]) {
    activeProject.todos.splice(index, 1);
    saveToLocalStorage();
  } else {
    console.warn("Todo not found or no active project.");
  }
};

// Get all projects
const getProjects = () => projects;

// Get the current active project
const getActiveProject = () => activeProject;

// Save the projects and active project to localStorage
const saveToLocalStorage = () => {
  if (activeProject && activeProject.name) {
    localStorage.setItem("projects", JSON.stringify(projects));
    localStorage.setItem("activeProject", activeProject.name);
  } else {
    console.warn("No active project or invalid active project.");
  }
};

// Load the projects and active project from localStorage
const loadFromLocalStorage = () => {
  const savedProjects = JSON.parse(localStorage.getItem("projects"));

  if (savedProjects && Array.isArray(savedProjects)) {
    projects = savedProjects;

    const activeProjectName = localStorage.getItem("activeProject");
    // If the active project name exists, find the corresponding project, or set to the first project
    if (activeProjectName) {
      activeProject =
        projects.find((project) => project.name === activeProjectName) ||
        projects[0];
    } else {
      activeProject = projects[0];
    }
  } else {
    console.warn("No projects found in localStorage.");
  }
};

// Initialize the app by loading data from localStorage
const init = () => {
  loadFromLocalStorage();
};

export {
  createProject,
  setActiveProject,
  addTodo,
  removeTodo,
  removeProject,
  getProjects,
  getActiveProject,
  init,
  saveToLocalStorage,
};
