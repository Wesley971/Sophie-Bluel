// Variable recuperation DOM

const email = document.querySelector("form #email")

const password = document.querySelector("form #password")

const form = document.querySelector("form")

const errorMessage = document.querySelector("#login p")


// Écouteur d'événement sur le formulaire
form.addEventListener("submit", (event) => {
    event.preventDefault();

// Récupération des valeurs des champs email et mot de passe
    
    const userEmail = email.value;
    const userPassword = password.value;

    // Création de l'objet avec les données du formulaire
    const loginData = {
        email: userEmail,
        password: userPassword,
     
    };
    
    // Envoi de la requête à l'API avec fetch
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
    
    // j'indiquez au serveur que les données j'ai envoyez dans le corps de la requête sont formatées en JSON
        headers: {
            "Content-Type": "application/json",
        },
        
        body: JSON.stringify(loginData),
    })
    .then((response) => {
        if (!response.ok) {
            // Gestion des erreurs HTTP
            throw new Error("Erreur HTTP : " + response.status);
        }
        return response.json();
    })
    .then((data) => {
        // Traitement des données reçues de l'API valeur extraires
        const userId = data.userId;
        const userToken = data.token;

        // Stockage des informations dans sessionStorage
        sessionStorage.setItem("token", userToken);
        sessionStorage.setItem("userId", userId);

        // Redirection vers la page index.html)
        location.href = "index.html";
    })
    .catch((error) => {
        // Gestion des erreurs lors de la requête ou du traitement
        console.error("Erreur : ", error);
        errorMessage.textContent = "Une erreur est survenue lors de la connexion.";
    });
});

