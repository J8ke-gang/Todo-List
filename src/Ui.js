import * as project from "./project.js";
import * as task from "./task.js";
import * as storage from "./storage.js";

const domManipulation = (() => {
  const projectList = document.getElementById("projectList");
  const taskList = document.getElementById("taskList");
  const projectForm = document.getElementById("projectForm");
  const taskForm = document.getElementById("taskForm");

  const renderProjects = () => {
    projectList.innerHTML = "";
    project.getProjects().forEach((proj) => {
      const li = document.createElement("li");
      li.textContent = proj.name;
      li.className =
        proj.name === project.getActiveProject()?.name ? "active" : "";

      //delete button
      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.className = "delete-project";
      delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (confirm(`Delete project "${proj.name}"?`)) {
          project.removeProject(proj.name);
          storage.saveToLocalStorage();
          renderProjects();
          renderTasks();
        }
      });

      // click list item will set active project
      li.appendChild(delBtn);
      li.addEventListener("click", () => {
        project.setActiveProject(proj.name);
        storage.saveToLocalStorage();
        renderProjects();
        renderTasks();
      });

      projectList.appendChild(li);
    });
  };

  //dark mode toggle
  const darkModeToggle = document.getElementById("darkModeToggle");

  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeToggle.textContent = "Light Mode";
  }

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");

    // Update button text based on the mode
    const isDarkMode = document.body.classList.contains("dark-mode");
    darkModeToggle.textContent = isDarkMode ? "Light Mode" : "Dark Mode";

    // Save user preference to localStorage
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
  };

  // Add event listener to the button
  darkModeToggle.addEventListener("click", toggleDarkMode);

  const renderTasks = () => {
    taskList.innerHTML = "";
    const activeProject = project.getActiveProject();
    if (!activeProject) return;

    activeProject.todos.forEach((todo, idx) => {
      const li = document.createElement("li");
      li.classList.add(todo.completed ? "completed" : "not-completed");
      li.innerHTML = `
        <h3>${todo.title}</h3>
        <p>${todo.description || "No description"}</p>
        <p>Due: ${todo.dueDate || "No date"}</p>
        <p>Priority: ${todo.priority || "No priority set"}</p>
        <label>
          <input type="checkbox" ${todo.completed ? "checked" : ""}/> Mark as done
        </label>
        <button class="delete-task">Delete</button>
      `;

      li.querySelector("input[type=checkbox]").addEventListener(
        "change",
        () => {
          task.toggleTodoCompletion(idx);
          storage.saveToLocalStorage();
          renderTasks();
        }
      );

      li.querySelector(".delete-task").addEventListener("click", () => {
        task.removeTodo(idx);
        storage.saveToLocalStorage();
        renderTasks();
      });

      taskList.appendChild(li);
    });
  };

  const initEventListeners = () => {
    projectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("projectName").value.trim();
      if (name) {
        project.createProject(name);
        storage.saveToLocalStorage();
        projectForm.reset();
        renderProjects();
      }
    });

    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("taskTitle").value.trim();
      const description = document
        .getElementById("taskDescription")
        .value.trim();
      const dueDate = document.getElementById("taskDueDate").value;
      const priority = document.getElementById("taskPriority").value;

      if (!title) {
        alert("Task title is required!");
        return;
      }

      task.addTodo({ title, description, dueDate, priority });
      storage.saveToLocalStorage();
      taskForm.reset();
      renderTasks();
    });
  };

  const init = () => {
    storage.loadFromLocalStorage();
    initEventListeners();
    renderProjects();
    renderTasks();
  };

  return { init };
})();

export default domManipulation;
