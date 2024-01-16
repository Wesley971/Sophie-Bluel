document.addEventListener("DOMContentLoaded", function () {
    // Variables globales
    const modifySection = document.getElementById("modifySection");
    const closeModalButton = document.getElementById("closeModalButton");
    const addPhotoButton = document.getElementById("addPhotoButton");
    const modalContainer = document.querySelector(".containeModals");
    const projectsModal = document.querySelector(".projectsModal");
 
    // Fonction pour vérifier si l'utilisateur est connecté
    function isLoggedIn() {
        const token = sessionStorage.getItem("token");
        return !!token;
    }
 
    // Fonction pour ouvrir la modale
    function openModal() {
        if (isLoggedIn()) {
            modalContainer.style.display = "flex";
            document.querySelector('.overlay').style.display = 'block';
        } else {
            redirectToLoginPage();
        }
    }
 
    // Fonction pour fermer la modale
    function closeModal() {
        modalContainer.style.display = "none";
        document.querySelector('.overlay').style.display = 'none';
    }
 
    // Fonction pour rediriger vers la page de connexion
    function redirectToLoginPage() {
        window.location.href = "login.html";
    }
 
    // Ajoutez des écouteurs d'événements
    modifySection.addEventListener("click", openModal);
 
    const modifyIcon = document.querySelector(".fa-pen-to-square");
    if (modifyIcon) {
        modifyIcon.addEventListener("click", openModal);
    }
 
    closeModalButton.addEventListener("click", () => {
        closeModal();
    });
 
    addPhotoButton.addEventListener("click", () => {
        if (isLoggedIn()) {
            // Ajoutez ici le code pour gérer l'ajout de photo
            // Peut-être une autre modal pour ajouter une photo, etc.
        } else {
            redirectToLoginPage();
        }
    });
 });
 
 async function displayProjectsModal() {
    const projectsModal = document.querySelector(".projectsModal");
    projectsModal.innerHTML = "";
 
    const projects = await loadProjects();
 
    projects.forEach(project => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const span = document.createElement("span");
        const del = document.createElement("i");
 
        del.classList.add("fas", "fa-trash-can");
        del.id = project.id;
 
        img.src = project.imageUrl;
 
        span.appendChild(del);
        figure.appendChild(span);
        figure.appendChild(img);
 
        projectsModal.appendChild(figure);
    });
 
    deleteProjects(); // Ajoutez cet appel pour initialiser les événements de suppression
 }
 
 displayProjectsModal();
 
 function deleteProject(id) {
    const init = {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("token") } 
    };
    
    fetch(`http://localhost:5678/api/works/${id}`, init)
        .then(response => {
            if (!response.ok) {
                throw new Error("Le delete n'a pas fonctionné !");
            }
            return response.json();
        })
        .then(data => {
            console.log("Le delete a réussi. Voici la data :", data);
            // Mettez à jour les actions nécessaires après la suppression du projet
            // Par exemple, réafficher la modal ou mettre à jour l'affichage des projets
            displayProjectsModal();
            loadProjects();
        })
        .catch(error => {
            console.error("Erreur lors de la suppression :", error);
        });
 }
 
 function deleteProjects() {
    const deleteAll = document.querySelectorAll(".fa-trash-can");
    deleteAll.forEach(deleteItem => {
        deleteItem.addEventListener("click", (event) => {
            const id = deleteItem.id;
            deleteProject(id);
        });
    });
 }
 