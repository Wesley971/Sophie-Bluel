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

    modifySection.addEventListener("click", (event) => {
        // Vérifier si l'élément cliqué est le bouton "Modifier" ou l'icône
        if (event.target.id === "modifySection" || event.target.classList.contains("fa-pen-to-square")) {
            if (isLoggedIn()) {
                modalContainer.classList.remove("hidden");
            } else {
                redirectToLoginPage();
            }
        }
    });

    closeModalButton.addEventListener("click", () => {
        modalContainer.classList.add("hidden");
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
