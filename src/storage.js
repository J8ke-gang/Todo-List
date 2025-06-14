import { getProjects, getActiveProject, setActiveProject } from "./project.js";

const STORAGE_KEY = "todoAppData";

const saveToLocalStorage = () => {
  const data = {
    projects: getProjects(),
    activeProjectName: getActiveProject()?.name || null,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const loadFromLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (data?.projects) {
    getProjects(data.projects);
    if (data.activeProjectName) {
      setActiveProject(data.activeProjectName);
    }
  }
};

export { saveToLocalStorage, loadFromLocalStorage };
