// Attendez que le contenu du DOM soit complètement chargé
document.addEventListener("DOMContentLoaded", function () {
    // Sélection des éléments du DOM nécessaires
    const modifySection = document.getElementById("modifySection");
    const closeModalButton = document.getElementById("closeModalButton");
    const closeModalButtonSecondModal = document.querySelector('.addPhotoModal #closeModalButton');
    const addPhotoButton = document.getElementById("addPhotoButton");
    const modalContainer = document.querySelector(".containeModals");
    const projectsModal = document.querySelector(".projectsModal");
 
    // Fonction pour vérifier si l'utilisateur est connecté
    function isLoggedIn() {
        // Récupération du token de session
        const token = sessionStorage.getItem("token");
        // Retourne true si le token existe, false sinon
        return !!token;
    }
 
    // Fonction pour ouvrir la modale
    function openModal() {
        // Si l'utilisateur est connecté, affiche la modale
        if (isLoggedIn()) {
            modalContainer.style.display = "flex";
            document.querySelector('.overlay').style.display = 'block';
        } else {
            // Sinon, redirige vers la page de connexion
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

    closeModalButtonSecondModal.addEventListener('click', function () {
    closeModal();
    });

 

    addPhotoButton.addEventListener("click", () => {
        if (isLoggedIn()) {
            const photoModal = document.querySelector(".addPhotoModal")
            photoModal.style.display = "flex"
            // Ajoutez ici le code pour gérer l'ajout de photo
            // Peut-être une autre modal pour ajouter une photo, etc.
        } else {
            redirectToLoginPage();
        }
    });    
 });

 document.getElementById('previewImage').addEventListener('click', function () {
    document.getElementById('uploadImage').click();
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.querySelector('.addPhotoModal img').src = e.target.result;
            document.querySelector('.previewBox h4').classList.add('hide');
            document.querySelector('.previewBox i').classList.add('hide');
            document.querySelector('.previewBox label').classList.add('hide');
        }

        reader.readAsDataURL(input.files[0]);
    }
}

// Supprimez l'un des écouteurs d'événements en double
document.querySelector('.addPhotoModal input[type="file"]').addEventListener('change', function () {
    readURL(this);
    document.querySelector('.previewBox h4').classList.remove('hide');
    document.querySelector('.previewBox i').classList.remove('hide');
    document.querySelector('.previewBox label').classList.remove('hide');
});

fetch('http://localhost:5678/api/categories/')
    .then(response => response.json())
    .then(data => {
        const select = document.getElementById("category");
        data.forEach((cat) => {
            const opt = document.createElement('option');
            opt.value = cat.id;
            opt.innerHTML = cat.name;
            select.appendChild(opt);
        });
    })
    .catch(error => console.error('Erreur :', error));

document.getElementById('imageTitle').addEventListener('input', validateForm);
document.getElementById('category').addEventListener('change', validateForm);
document.querySelector('.addPhotoModal input[type="file"]').addEventListener('change', validateForm);

function validateForm() {
    const title = document.getElementById('imageTitle').value;
    const category = document.getElementById('category').value;
    const fileInput = document.querySelector('.addPhotoModal input[type="file"]'); // Corrigez le sélecteur de l'input de fichier

    if (title && category && fileInput.files.length > 0) {
        document.getElementById('validateButton').disabled = false;
        document.getElementById('validateButton').style.backgroundColor = 'green';
    } else {
        document.getElementById('validateButton').disabled = true;
        document.getElementById('validateButton').style.backgroundColor = 'grey';
    }
}


    
 // Fonction pour afficher la modale des projets
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
 
 // Fonction pour supprimer un projet
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
 
 // Fonction pour ajouter des écouteurs d'événements aux boutons de suppression
 function deleteProjects() {
    const deleteAll = document.querySelectorAll(".fa-trash-can");
    deleteAll.forEach(deleteItem => {
        deleteItem.addEventListener("click", (event) => {
            const id = deleteItem.id;
            deleteProject(id);
        });
    });
 }
 document.getElementById('returnModal').addEventListener('click', function () {
    const containerModals = document.querySelector('.containeModals');
    const addPhotoModal = document.querySelector('.addPhotoModal');

    // Affiche la première modal et cache la deuxième modal
    containerModals.style.display = 'flex';
    addPhotoModal.style.display = 'none';
    document.querySelector('.overlay').style.display = 'block';
});
