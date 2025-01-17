//import app logic
import * as appLogic from './appLogic';

const domManipulation = (() => {
  const projectList = document.getElementById('projectList');
  const taskList = document.getElementById('taskList');
  const projectForm = document.getElementById('projectForm');
  const taskForm = document.getElementById('taskForm');

  // Render Projects
  const renderProjects = () => {
    projectList.innerHTML = '';
// project name
    appLogic.getProjects().forEach((project) => {
      const projectItem = document.createElement('li');
      projectItem.textContent = project.name;
      projectItem.className = project.name === appLogic.getActiveProject().name ? 'active' : '';

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete-project';
      deleteButton.addEventListener('click', () => {
        if (confirm(`Are you sure you want to delete the project "${project.name}"?`)) {
          appLogic.removeProject(project.name);
          renderProjects();
          renderTasks(); 
        }
      });

      projectItem.appendChild(deleteButton);

      projectItem.addEventListener('click', () => {
        appLogic.setActiveProject(project.name);
        renderTasks();
        renderProjects();
      });

      projectList.appendChild(projectItem);
    });
  };

  // Render Tasks
  const renderTasks = () => {
    taskList.innerHTML = '';
    const activeProject = appLogic.getActiveProject();
    
    if (!activeProject) {
      return; 
    }
//to check if todo completed or not
    activeProject.todos.forEach((todo, index) => {
      const taskItem = document.createElement('li');
      taskItem.classList.add(todo.completed ? 'completed' : 'not-completed');
      taskItem.innerHTML = `
        <h3>${todo.title}</h3>
        <p>${todo.description || 'No description'}</p>
        <p>Due: ${todo.dueDate || 'No date'}</p>
        <p>Priority: ${todo.priority || 'No priority set'}</p>
        <label for="complete-${index}">
          <input type="checkbox" id="complete-${index}" ${todo.completed ? 'checked' : ''} /> Mark as done
        </label>
        <button class="delete-task">Delete</button>
      `;

      // Checkbox to toggle completion status and update save to local storage
      taskItem.querySelector('input[type="checkbox"]').addEventListener('change', () => {
        todo.completed = !todo.completed;
        appLogic.saveToLocalStorage(); 
        renderTasks(); 
      });

      // Delete task button
      taskItem.querySelector('.delete-task').addEventListener('click', () => {
        appLogic.removeTodo(index);  // Remove task
        renderTasks(); 
      });

      taskList.appendChild(taskItem);
    });
  };

  // Initialize event listeners
  const initEventListeners = () => {
    // Project Form submission
    projectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const projectName = document.getElementById('projectName').value.trim();
      if (projectName) {
        appLogic.createProject(projectName);
        projectForm.reset(); 
        renderProjects(); 
      }
    });

    // Task Form submission
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('taskTitle').value.trim();
      const description = document.getElementById('taskDescription').value.trim();
      const dueDate = document.getElementById('taskDueDate').value;
      const priority = document.getElementById('taskPriority').value;

      if (!title) {
        alert('Task title is required!');
        return;
      }

      const newTask = { title, description, dueDate, priority };
      appLogic.addTodo(newTask); 
      taskForm.reset(); 
    renderTasks();
    });
  };

  // Initialize the DOM manipulation logic
  const init = () => {
    initEventListeners();
    renderProjects();
    renderTasks();  
  };

  return { init };
})();

//dark mode option

const darkModeToggle = document.getElementById('darkModeToggle');

// Check for saved user preference in localStorage and apply it
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  darkModeToggle.textContent = 'Light Mode'; // Update button text
}

// Function to toggle dark mode
const toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode');

  // Update button text based on the mode
  const isDarkMode = document.body.classList.contains('dark-mode');
  darkModeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';

  // Save user preference to localStorage
  localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
};

// Add event listener to the button
darkModeToggle.addEventListener('click', toggleDarkMode);



export default domManipulation;
