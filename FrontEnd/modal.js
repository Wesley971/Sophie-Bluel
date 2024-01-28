// Attendre que le contenu du DOM soit complètement chargé
document.addEventListener("DOMContentLoaded", function () {
    // Sélectionner les éléments du DOM nécessaires
    const modifySection = document.getElementById("modifySection"); // Sélectionne la section de modification
    const closeModalButton = document.getElementById("closeModalButton"); // Sélectionne le bouton pour fermer la modale
    const closeModalButtonSecondModal = document.querySelector('.addPhotoModal #closeModalButton'); // Sélectionne le bouton pour fermer la deuxième modale
    const addPhotoButton = document.getElementById("addPhotoButton"); // Sélectionne le bouton pour ajouter une photo
    const modalContainer = document.querySelector(".containeModals"); // Sélectionne le conteneur des modales
    const projectsModal = document.querySelector(".projectsModal"); // Sélectionne la modale des projets

    // Fonction pour vérifier si l'utilisateur est connecté
    function isLoggedIn() {
        // Récupérer le token de session
        const token = sessionStorage.getItem("token");
        // Retourner true si le token existe, false sinon
        return !!token;
    }

    // Fonction pour ouvrir la modale
    function openModal() {
        // Si l'utilisateur est connecté, afficher la modale
        if (isLoggedIn()) {
            modalContainer.style.display = "flex"; // Afficher le conteneur de la modale
            document.querySelector('.overlay').style.display = 'block'; // Afficher l'overlay
        } else {
            // Sinon, rediriger vers la page de connexion
            redirectToLoginPage();
        }
    }

    // Fonction pour fermer la modale
    function closeModal() {
        modalContainer.style.display = "none"; // Cacher le conteneur de la modale
        document.querySelector('.overlay').style.display = 'none'; // Cacher l'overlay
    }

    // Fonction pour rediriger vers la page de connexion
    function redirectToLoginPage() {
        window.location.href = "login.html"; // Rediriger vers la page de connexion
    }

    // Ajouter des écouteurs d'événements
    modifySection.addEventListener("click", openModal); // Lorsque la section de modification est cliquée, ouvrir la modale

    const modifyIcon = document.querySelector(".fa-pen-to-square"); // Sélectionne l'icône de modification
    if (modifyIcon) {
        modifyIcon.addEventListener("click", openModal); // Lorsque l'icône de modification est cliquée, ouvrir la modale
    }

    closeModalButton.addEventListener("click", () => {
        closeModal(); // Lorsque le bouton de fermeture de la modale est cliqué, fermer la modale
    });
    closeModalButtonSecondModal.addEventListener('click', function () {
        closeModal(); // Lorsque le bouton de fermeture de la deuxième modale est cliqué, fermer la modale
    });

    addPhotoButton.addEventListener("click", () => {
        if (isLoggedIn()) {
            const photoModal = document.querySelector(".addPhotoModal") // Sélectionne la modale d'ajout de photo
            photoModal.style.display = "flex" // Affiche la modale d'ajout de photo
            // Ajouter ici le code pour gérer l'ajout de photo
            // Peut-être une autre modal pour ajouter une photo, etc.
        } else {
            redirectToLoginPage(); // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
        }
    });
});

document.getElementById('previewImage').addEventListener('click', function() {
    document.getElementById('uploadImage').click(); // Lorsque l'image de prévisualisation est cliquée, déclencher le clic sur le champ de téléchargement
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.querySelector('.addPhotoModal img').src = e.target.result;
            document.querySelector('.previewBox h4').classList.add('hide');
            document.querySelector('.previewBox i').classList.add('hide');
            document.querySelector('.previewBox label').classList.add('hide');
            
            // Ne cachez pas la modale ici
            // modalContainer.style.display = "none";
            // document.querySelector('.overlay').style.display = 'none';

            // Valider le formulaire après avoir chargé l'image
            validateForm();
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function validateForm() {
    console.log('La fonction validateForm a été appelée');
    const title = document.getElementById('imageTitle').value; // Obtenir la valeur du titre de l'image
    const category = document.getElementById('category').value; // Obtenir la valeur de la catégorie
    const fileInput = document.querySelector('input[type="file"]'); // Sélectionner l'input de type "file"

    if (title && category && fileInput.files.length > 0) { // Si le titre, la catégorie et le fichier de l'image existent
        document.getElementById('validateButton').disabled = false; // Activer le bouton de validation
        document.getElementById('validateButton').style.backgroundColor = '#1D6154'; // Changer la couleur de fond du bouton de validation en vert

    } else { // Sinon
        document.getElementById('validateButton').disabled = true; // Désactiver le bouton de validation
        document.getElementById('validateButton').style.backgroundColor = 'darkgray';
        document.getElementById('validateButton').style.color = 'white'; // Changer la couleur de fond du bouton de validation en gris
    }
}

// Sélectionnez le bouton "Valider"
const validateButton = document.getElementById('validateButton');

// Ajoutez un écouteur d'événements pour le clic sur ce bouton
validateButton.addEventListener('click', function() {
    // Vérifier si le bouton "Valider" est actif
    if (!this.disabled) {
        // Si le bouton "Valider" est actif, envoyer l'image à l'API
        const title = document.getElementById('imageTitle').value;
        const category = document.getElementById('category').value;
        const fileInput = document.querySelector('input[type="file"]');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('image', fileInput.files[0], fileInput.files[0].name);

        fetch('http://localhost:5678/api/works', {
            method: 'POST',
            body: formData,
            headers: {'Authorization': 'Bearer ' + sessionStorage.getItem("token")}
        })
        .then(response => response.json())
        .then(data => {
            console.log('Succès:', data);
        })
        .catch((error) => {
            console.error('Erreur:', error);
        });
    }
});





document.querySelector('.addPhotoModal input[type="file"]').addEventListener('change', function () {
    readURL(this); // Lorsque le fichier de l'image change, lire l'URL du fichier
    document.querySelector('.previewBox h4').classList.remove('hide'); // Montrer le titre de la boîte de prévisualisation
    document.querySelector('.previewBox i').classList.remove('hide'); // Montrer l'icône de la boîte de prévisualisation
    document.querySelector('.previewBox label').classList.remove('hide'); // Montrer le label de la boîte de prévisualisation
});

fetch('http://localhost:5678/api/categories/') // Récupérer les catégories depuis l'API
    .then(response => response.json()) // Convertir la réponse en JSON
    .then(data => {
        const select = document.getElementById("category"); // Sélectionner le selecteur de catégorie
        data.forEach((cat) => {
            const opt = document.createElement('option'); // Créer une nouvelle option
            opt.value = cat.id; // Définir la valeur de l'option
            opt.innerHTML = cat.name; // Définir le texte de l'option
            select.appendChild(opt); // Ajouter l'option au selecteur de catégorie
        });
    })
    .catch(error => console.error('Erreur:', error)); // En cas d'erreur, afficher le message d'erreur dans la console

document.getElementById('imageTitle').addEventListener('input', validateForm); // Ajouter un écouteur d'événements pour valider le formulaire lorsque l'utilisateur saisit le titre de l'image
document.getElementById('category').addEventListener('change', validateForm); // Ajouter un écouteur d'événements pour valider le formulaire lorsque l'utilisateur change la catégorie
document.querySelector('input[type="file"]').addEventListener('change', validateForm); // Ajouter un écouteur d'événements pour valider le formulaire lorsque l'utilisateur change le fichier de l'image


// Fonction pour afficher la modale des projets
async function displayProjectsModal() {
    const projectsModal = document.querySelector(".projectsModal"); // Sélectionner la modale des projets
    projectsModal.innerHTML = ""; // Vider le contenu de la modale des projets

    const projects = await loadProjects(); // Charger les projets

    projects.forEach(project => { // Pour chaque projet
        const figure = document.createElement("figure"); // Créer une nouvelle figure
        const img = document.createElement("img"); // Créer une nouvelle image
        const span = document.createElement("span"); // Créer une nouvelle balise span
        const del = document.createElement("i"); // Créer une nouvelle icône

        del.classList.add("fas", "fa-trash-can"); // Ajouter les classes à l'icône
        del.id = project.id; // Définir l'ID de l'icône

        img.src = project.imageUrl; // Définir la source de l'image

        span.appendChild(del); // Ajouter l'icône à la balise span
        figure.appendChild(span); // Ajouter la balise span à la figure
        figure.appendChild(img); // Ajouter l'image à la figure

        projectsModal.appendChild(figure); // Ajouter la figure à la modale des projets
    });

    deleteProjects(); // Ajouter cet appel pour initialiser les événements de suppression
}

displayProjectsModal(); // Appeler la fonction pour afficher la modale des projets

// Fonction pour supprimer un projet
function deleteProject(id) {
    const init = {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("token") } 
    };
    
    fetch(`http://localhost:5678/api/works/${id}`, init) // Envoyer une requête DELETE à l'API
    .then(response => {
        if (!response.ok) {
            throw new Error("La suppression n'a pas fonctionné !");
        }
        return response.json();
    })
    .then(data => {
        console.log("La suppression a réussi. Voici les données :", data);
        // Mettre à jour les actions nécessaires après la suppression du projet
        // Par exemple, réafficher la modale ou mettre à jour l'affichage des projets
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
// Sélectionnez l'élément qui doit retourner à la première modale
const returnToFirstModal = document.getElementById('returnModal');

// Ajoutez un écouteur d'événements pour le clic sur cet élément
returnToFirstModal.addEventListener('click', function() {
    // Cachez la deuxième modale
    document.querySelector('.addPhotoModal').style.display = "none";

    // Affichez la première modale
    document.querySelector('.containeModals').style.display = "flex";
});



deleteProjects(); // Ajouter cet appel pour initialiser les événements de suppression 
 