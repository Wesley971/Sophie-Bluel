// Sélectionne l'élément avec la classe 'gallery' du DOM 
const gallery = document.querySelector(".gallery");

// Sélectionne l'élément avec la classe 'filters' du DOM 
const filters = document.querySelector(".filters");

// Définit une fonction asynchrone pour charger les projets depuis l'API
async function loadProjects() {
    // Effectue une requête GET vers l'API pour récupérer les travaux
    const response = await fetch("http://localhost:5678/api/works");
    
    // Attend la réponse de l'API et la convertit en JSON
    return await response.json();
}

// Définit une fonction pour créer un élément de projet à partir d'un objet photo
function createProjectElement(photo) {
    // Crée un nouvel élément 'figure' pour contenir l'image et le titre
    const showPicture = document.createElement("figure");
    
    // Crée un nouvel élément 'figcaption' pour le titre du projet
    const showTitle = document.createElement("figcaption");
    
    // Crée un nouvel élément 'img' pour l'image du projet
    const showImg = document.createElement("img");
    
    // Définit l'attribut 'src' de l'image avec l'URL de l'image du projet
    showImg.src = photo.imageUrl;
    
    // Définit le texte interne de l'élément 'figcaption' avec le titre du projet
    showTitle.innerText = photo.title;
    
    // Ajoute l'image et le titre à l'élément 'figure'
    showPicture.appendChild(showImg);
    showPicture.appendChild(showTitle);
    
    // Ajoute l'élément 'figure' contenant le projet à la galerie dans le DOM
    gallery.appendChild(showPicture);
}

// Définit une fonction asynchrone pour afficher tous les projets
async function showProjects() {
    // Charge les projets à partir de l'API
    const projects = await loadProjects();
    
    // Appelle la fonction 'createProjectElement' pour chaque projet chargé
    projects.forEach(createProjectElement);
}

// Définit une fonction asynchrone pour charger les catégories depuis l'API
async function loadCategories() {
    // Effectue une requête GET vers l'API pour récupérer les catégories
    const response = await fetch("http://localhost:5678/api/categories");
    
    // Attend la réponse de l'API et la convertit en JSON
    return await response.json();
}

// Définit une fonction pour afficher les boutons de filtrage des catégories
async function showCategoriesButtons() {
    // Charge les catégories à partir de l'API
    const categories = await loadCategories();
    
    // Pour chaque catégorie, crée un bouton et l'ajoute aux filtres dans le DOM
    categories.forEach((group) => {
        const button = document.createElement("button");
        button.textContent = group.name;
        button.id = group.id;
        filters.appendChild(button);
    });
}

// Définit une fonction pour filtrer les projets par catégorie lorsqu'un bouton est cliqué
async function filterCategories() {
    // Charge les projets à partir de l'API
    const projects = await loadProjects();
    
    // Sélectionne tous les boutons de catégorie dans les filtres
    const buttons = document.querySelectorAll(".filters button");
    
    // Pour chaque bouton, ajoute un écouteur d'événement 'click'
    buttons.forEach((button) => {
        button.addEventListener("click", async (event) => {
            // Récupère l'ID du bouton cliqué
            const btnId = event.target.id;
            
            // Vide la galerie pour préparer l'affichage des projets filtrés
            gallery.innerHTML = "";
            
            // Si l'ID du bouton n'est pas "0", filtre les projets par catégorie
            if (btnId !== "0") {
                // Filtre les projets dont l'ID de catégorie correspond à l'ID du bouton
                const projectCategories = projects.filter((project) => project.categoryId == btnId);
                
                // Crée et ajoute un élément de projet pour chaque projet filtré
                projectCategories.forEach(createProjectElement);
            } else {
                // Sinon, affiche tous les projets
                await showProjects();
            }
        });
    });
}

// Définit une fonction pour initialiser l'affichage des projets et des boutons de filtrage
async function init() {
    // Affiche tous les projets
    await showProjects();
    
    // Affiche les boutons de filtrage des catégories
    await showCategoriesButtons();
    
    // Configure les écouteurs d'événements pour le filtrage par catégorie
    filterCategories();
}

// Appelle la fonction 'init' pour démarrer le processus d'initialisation
init();

// Définit une fonction pour vérifier le statut de connexion de l'utilisateur
function checkLoginStatus() {
    // Récupère le token de session stocké dans le stockage de session
    const token = sessionStorage.getItem("token");
    
    // Sélectionne les boutons de connexion et de déconnexion du DOM
    const loginButton = document.getElementById("loginButton");
    const logoutButton = document.getElementById("logoutButton");
    
    // Sélectionne la section de modification du DOM
    const modifySection = document.getElementById("modifySection");
    
    // Sélectionne les filtres du DOM
    const filters = document.querySelector(".filters");
    
            // Si un token de session est trouvé, cela signifie que l'utilisateur est connecté
            if (token) {
                // Masque le bouton de connexion et affiche le bouton de déconnexion
                loginButton.classList.add("hidden");
                logoutButton.classList.remove("hidden");
    
                // Si des filtres existent, les cache
                if (filters) {
                    filters.classList.add("hidden");
                }
    
                // Affiche la section de modification
                modifySection.classList.remove("hidden");
                logoutButton.addEventListener("click", logout);
    
                // Si un div d'édition est présent, le rend visible
                let editionModeDiv = document.querySelector('.editionMode');
                if (editionModeDiv) {
                    editionModeDiv.classList.remove("hidden"); // Supprime la classe 'hidden'
                }
            } else {
                // Si aucun token n'est trouvé, l'utilisateur n'est pas connecté
                // Affiche le bouton de connexion et masque le bouton de déconnexion
                loginButton.classList.remove("hidden");
                logoutButton.classList.add("hidden");
    
                // Si des filtres existent, les affiche
                if (filters) {
                    filters.classList.remove("hidden");
                }
    
                // Masque la section de modification
                modifySection.classList.add("hidden");
                loginButton.addEventListener("click", redirectToLoginPage);
    
                // Si un div d'édition est présent, le cache
                let editionModeDiv = document.querySelector('.editionMode');
                if (editionModeDiv) {
                    editionModeDiv.classList.add("hidden"); // Ajoute la classe 'hidden'
                }
            }
        }
    
    // Définit une fonction pour rediriger l'utilisateur vers la page de connexion
    function redirectToLoginPage() {
        // Change l'URL actuelle vers la page de connexion
        window.location.href = "login.html";
    }
    
    // Définit une fonction pour déconnecter l'utilisateur
    function logout() {
        // Supprime le token de session et l'ID d'utilisateur du stockage de session
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userId");
        
        // Redirige l'utilisateur vers la page d'accueil
        window.location.href = "index.html";
    }
    
    // Vérifie le statut de connexion de l'utilisateur dès le chargement de la page
    checkLoginStatus();
    



// Redirige l'utilisateur vers la page de connexion
function redirectToLoginPage() {
   window.location.href = "login.html";
}

// Déconnecte l'utilisateur
function logout() {
   sessionStorage.removeItem("token");
   sessionStorage.removeItem("userId");
   window.location.href = "index.html";
}

// Vérifie le statut de connexion de l'utilisateur au chargement de la page
checkLoginStatus();



