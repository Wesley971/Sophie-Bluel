
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