
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");

async function loadProjects() {
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
}

function createProjectElement(photo) {
    const showPicture = document.createElement("figure");
    const showTitle = document.createElement("figcaption");
    const showImg = document.createElement("img");

    showImg.src = photo.imageUrl;
    showTitle.innerText = photo.title;

    showPicture.appendChild(showImg);
    showPicture.appendChild(showTitle);
    gallery.appendChild(showPicture);
}

async function showProjects() {
    const projects = await loadProjects();
    projects.forEach(createProjectElement);
}

async function loadCategories() {
    const response = await fetch("http://localhost:5678/api/categories");
    return await response.json();
}

async function showCategoriesButtons() {
    const categories = await loadCategories();

    categories.forEach((group) => {
        const button = document.createElement("button");
        button.textContent = group.name;
        button.id = group.id;
        filters.appendChild(button);
    });
}

async function filterCategories() {
    const projects = await loadProjects();
    const buttons = document.querySelectorAll(".filters button");

    buttons.forEach((button) => {
        button.addEventListener("click", async (event) => {
            const btnId = event.target.id;
            gallery.innerHTML = "";

            if (btnId !== "0") {
                const projectCategories = projects.filter((project) => project.categoryId == btnId);
                projectCategories.forEach(createProjectElement);
            } else {
                await showProjects();
            }
        });
    });
}

async function init() {
    await showProjects();
    await showCategoriesButtons();
    filterCategories();
}

init();

function checkLoginStatus() {
    const token = sessionStorage.getItem("token");
    const loginButton = document.getElementById("loginButton");
    const logoutButton = document.getElementById("logoutButton");
    const modifySection = document.getElementById("modifySection");
    const filters = document.querySelector(".filters");

    if (token) {
        loginButton.classList.add("hidden");
        logoutButton.classList.remove("hidden");

        if (filters) {
            filters.classList.add("hidden");
        }

        modifySection.classList.remove("hidden");
        logoutButton.addEventListener("click", logout);
    } else {
        loginButton.classList.remove("hidden");
        logoutButton.classList.add("hidden");

        if (filters) {
            filters.classList.remove("hidden");
        }

        modifySection.classList.add("hidden");
        loginButton.addEventListener("click", redirectToLoginPage);
    }
}

function redirectToLoginPage() {
    window.location.href = "login.html";
}

function logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    window.location.href = "index.html";
}

checkLoginStatus();


