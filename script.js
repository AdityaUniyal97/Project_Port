// Sample projects data for initial load; can be replaced with backend/API data
let projects = JSON.parse(localStorage.getItem('projects')) || [
    { id: 1, title: "AI Chatbot", department: "Computer Science", year: 2024, description: "An AI-powered chatbot", demoLink: "#" },
    { id: 2, title: "Smart Agriculture", department: "Agriculture", year: 2023, description: "A smart system for agriculture", demoLink: "#" },
];

// Function to display projects
function displayProjects(filteredProjects = projects) {
    const projectContainer = document.getElementById("projectContainer");
    projectContainer.innerHTML = ""; // Clear previous content

    filteredProjects.forEach(project => {
        const projectCard = document.createElement("div");
        projectCard.className = "project-card";
        projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.department} - ${project.year}</p>
            <button onclick="showProjectDetails(${project.id})">View Details</button>
        `;
        projectContainer.appendChild(projectCard);
    });
}

// Function to add new project to local storage
function addProject(title, department, year, description, demoLink) {
    const newProject = {
        id: Date.now(),
        title,
        department,
        year: parseInt(year),
        description,
        demoLink,
    };
    projects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(projects));
    displayProjects();
    notify("Project added successfully!");
}

// Enhanced form validation and adding a project
function validateAndAddProject() {
    const title = document.getElementById("title").value;
    const department = document.getElementById("department").value;
    const year = document.getElementById("year").value;
    const description = document.getElementById("description").value;
    const demoLink = document.getElementById("demoLink").value;

    if (!title || !department || !year || !description || !demoLink) {
        notify("All fields are required!", true);
        return false;
    }

    if (!demoLink.startsWith("http")) {
        notify("Please enter a valid URL for the demo link.", true);
        return false;
    }

    addProject(title, department, year, description, demoLink);
    return true;
}

// Project search and filter
function searchProjects() {
    const searchQuery = document.getElementById("searchQuery").value.toLowerCase();
    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchQuery) ||
        project.department.toLowerCase().includes(searchQuery) ||
        project.year.toString().includes(searchQuery)
    );
    displayProjects(filteredProjects);
}

// Sort projects by different criteria
function sortProjects(criteria) {
    projects.sort((a, b) => a[criteria] > b[criteria] ? 1 : -1);
    displayProjects();
}

// Mock login and logout functionality
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username === "teacher" && password === "password") {
        localStorage.setItem("loggedIn", "true");
        notify("Login successful!");
        document.getElementById("loginContainer").style.display = "none";
        displayProjects();
    } else {
        notify("Invalid credentials!", true);
    }
}

function logout() {
    localStorage.removeItem("loggedIn");
    notify("Logged out!");
    document.getElementById("loginContainer").style.display = "block";
    displayProjects([]);
}

// Notification system for success and error messages
function notify(message, isError = false) {
    const notification = document.getElementById("notification");
    notification.innerText = message;
    notification.style.color = isError ? "red" : "green";
    notification.style.display = "block";
    setTimeout(() => notification.style.display = "none", 3000);
}

// Dark mode toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// Initialize functions on page load
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("loggedIn") === "true") {
        document.getElementById("loginContainer").style.display = "none";
        displayProjects();
    }
    initiateImageCarousel();
});
