
// Variables globales
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");

// Contact API pour récupérer les projets
async function loadProjects() {
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
}

// Création des balises pour la photo
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

// Afficher les images dans HTML
async function showProjects() {
    const projects = await loadProjects();
    projects.forEach(createProjectElement);
}

// Récupération des Catégories dans l'API
async function loadCategories() {
    const response = await fetch("http://localhost:5678/api/categories");
    return await response.json();
}

// Création des bouton de catégories
async function showCategoriesButtons() {
    const categories = await loadCategories();

    categories.forEach((group) => {
        const button = document.createElement("button");
        button.textContent = group.name;
        button.id = group.id;
        filters.appendChild(button);
    });
}

// Filtrer par catégories avec mes boutons
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
                // Afficher tous les projets si le bouton "Tous" est cliqué
                await showProjects();
            }
        });
    });
}

// Exécution des fonctions
async function init() {
    await showProjects();
    await showCategoriesButtons();
    filterCategories();
}

// Appel de la fonction d'initialisation
init();

// Si l'utilisateur est connecté

function checkLoginStatus() {
    const token = sessionStorage.getItem("token");
    const loginButton = document.getElementById("loginButton");
    const logoutButton = document.getElementById("logoutButton");
    const modifySection = document.getElementById("modifySection");
    const filters = document.querySelector(".filters");

    if (token) {
        // Utilisateur connecté
        loginButton.classList.add("hidden");
        logoutButton.classList.remove("hidden");

        // Masquer les filtres
        if (filters) {
            filters.classList.add("hidden");
        }

        // Afficher #modifySection lorsque l'utilisateur est connecté
        modifySection.classList.remove("hidden");

        // Ajouter un écouteur d'événements pour le bouton de déconnexion
        logoutButton.addEventListener("click", logout);
    } else {
        // Utilisateur non connecté
        loginButton.classList.remove("hidden");
        logoutButton.classList.add("hidden");

        // Afficher les filtres
        if (filters) {
            filters.classList.remove("hidden");
        }

        // Masquer #modifySection lorsque l'utilisateur n'est pas connecté
        modifySection.classList.add("hidden");

        // Ajouter un écouteur d'événements pour le bouton de connexion
        loginButton.addEventListener("click", redirectToLoginPage);
    }
}

function redirectToLoginPage() {
    window.location.href = "login.html";
}

function logout() {
    // Supprimer les informations de connexion du sessionStorage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");

    // Redirection vers la page d'accueil
    window.location.href = "index.html";
}

// Appeler cette fonction au chargement de la page
checkLoginStatus();