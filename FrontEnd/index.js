
// Sélectionne les éléments nécessaires dans le DOM
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");

// Charge les projets à partir de l'API
async function loadProjects() {
   const response = await fetch("http://localhost:5678/api/works");
   return await response.json();
}

// Crée un élément de projet à partir d'un objet photo
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

// Affiche tous les projets
async function showProjects() {
   const projects = await loadProjects();
   projects.forEach(createProjectElement);
}

// Charge les catégories à partir de l'API
async function loadCategories() {
   const response = await fetch("http://localhost:5678/api/categories");
   return await response.json();
}

// Affiche les boutons de filtrage des catégories
async function showCategoriesButtons() {
   const categories = await loadCategories();

   categories.forEach((group) => {
       const button = document.createElement("button");
       button.textContent = group.name;
       button.id = group.id;
       filters.appendChild(button);
   });
}

// Filtre les projets par catégorie lorsqu'un bouton de catégorie est cliqué
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

// Initialise l'affichage des projets et des boutons de filtrage
async function init() {
   await showProjects();
   await showCategoriesButtons();
   filterCategories();
}

init();

// Vérifie le statut de connexion de l'utilisateur
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

       // Affiche le div si l'utilisateur est connecté
       let editionModeDiv = document.querySelector('.editionMode');
       if (editionModeDiv) {
           editionModeDiv.classList.remove("hidden"); // Supprime la classe 'hidden'
       }
   } else {
       loginButton.classList.remove("hidden");
       logoutButton.classList.add("hidden");

       if (filters) {
           filters.classList.remove("hidden");
       }

       modifySection.classList.add("hidden");
       loginButton.addEventListener("click", redirectToLoginPage);

       // Cache le div si l'utilisateur n'est pas connecté
       let editionModeDiv = document.querySelector('.editionMode');
       if (editionModeDiv) {
           editionModeDiv.classList.add("hidden"); // Ajoute la classe 'hidden'
       }
   }
}



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



