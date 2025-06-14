let projects = [];
let activeProject = null;

//create project
const createProject = (name) => {
  if (!projects.find((p) => p.name === name)) {
    projects.push({ name, todos: [] });
    if (!activeProject) activeProject = projects[0];
  }
};

// remove project
const removeProject = (name) => {
  projects = projects.filter((p) => p.name !== name);
  if (activeProject && activeProject.name === name) {
    activeProject = projects.length ? projects[0] : null;
  }
};

//set project
const setActiveProject = (name) => {
  const found = projects.find((p) => p.name === name);
  if (found) activeProject = found;
};

//get project
const getProjects = () => projects;

//get active project
const getActiveProject = () => activeProject;

export {
  createProject,
  removeProject,
  setActiveProject,
  getProjects,
  getActiveProject,
};
