document.addEventListener("DOMContentLoaded", function () {
    const modifySection = document.getElementById("modifySection");
    const closeModalButton = document.getElementById("closeModalButton");
    const addPhotoButton = document.getElementById("addPhotoButton");
    const modalContainer = document.querySelector(".containeModals");

    // Fonction pour vérifier si l'utilisateur est connecté
    function isLoggedIn() {
        const token = sessionStorage.getItem("token");
        return !!token; // Convertit en boolean (true si le token existe, false sinon)
    }

    // Fonction pour ouvrir la modale
    function openModal() {
        if (isLoggedIn()) {
            modalContainer.style.display = "flex"; // Utilisez "flex" pour afficher la modale
        } else {
            redirectToLoginPage();
        }
    }

    modifySection.addEventListener("click", openModal);

    // Ajoutez un écouteur d'événements pour l'icône
    const modifyIcon = document.querySelector(".fa-pen-to-square");
    if (modifyIcon) {
        modifyIcon.addEventListener("click", openModal);
    }

    closeModalButton.addEventListener("click", () => {
        modalContainer.style.display = "none"; // Utilisez "none" pour masquer la modale
    });

    addPhotoButton.addEventListener("click", () => {
        if (isLoggedIn()) {
            // Ajoutez ici le code pour gérer l'ajout de photo
            // Peut-être une autre modal pour ajouter une photo, etc.
        } else {
            redirectToLoginPage();
        }
    });

    function redirectToLoginPage() {
        window.location.href = "login.html";
    }
});
