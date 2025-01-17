import {
  init,
  createProject,
  setActiveProject,
  addTodo,
  removeTodo,
  getProjects,
  getActiveProject,
} from "./appLogic";
import domManipulation from "./domManipulation";
import "./styles.css";

// Initialize the app when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  init();
  domManipulation.init();
});
