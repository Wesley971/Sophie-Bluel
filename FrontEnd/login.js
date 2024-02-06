// Sélection des éléments du DOM nécessaires
const email = document.querySelector("form #email"); // Sélectionne l'élément email dans le formulaire
const password = document.querySelector("form #password"); // Sélectionne l'élément mot de passe dans le formulaire
const form = document.querySelector("form"); // Sélectionne le formulaire lui-même
const errorMessage = document.querySelector("#login p"); // Sélectionne le paragraphe d'erreur dans l'élément avec l'ID login

// Ajout d'un écouteur d'événement au formulaire
form.addEventListener("submit", (event) => { // Attache un gestionnaire d'événements qui répondra à l'événement submit du formulaire
  // Prévention de l'action par défaut du formulaire (rechargement de la page)
  event.preventDefault(); // Empêche le rechargement de la page

  // Récupération des valeurs des champs email et mot de passe
  const userEmail = email.value; // Récupère la valeur du champ email
  const userPassword = password.value; // Récupère la valeur du champ mot de passe

  // Création de l'objet contenant les données du formulaire
  const loginData = { // Crée un objet avec les clés email et password
      email: userEmail, // Définit la clé email avec la valeur de userEmail
      password: userPassword, // Définit la clé password avec la valeur de userPassword
  };

  // Envoi de la requête à l'API avec fetch
  fetch("http://localhost:5678/api/users/login", { // Effectue une requête POST à l'URL spécifiée
      method: "POST", // Spécifie que la méthode HTTP est POST
      headers: {
          "Content-Type": "application/json", // Définit le type de contenu comme JSON
      },
      body: JSON.stringify(loginData), // Convertit l'objet loginData en chaîne JSON
  })
  .then((response) => { // Gère la réponse de la requête fetch
      // Vérification de la réponse du serveur
      if (!response.ok) { // Si la réponse n'est pas OK (par exemple, si le statut HTTP est autre que  2xx)
          // Si la réponse n'est pas ok, retourner une promesse rejetée avec une erreur
          return Promise.reject(new Error("Erreur HTTP : " + response.status)); // Crée une nouvelle erreur avec le statut HTTP et la rejette
      }
      // Si la réponse est ok, retourner la réponse convertie en JSON
      return response.json(); // Convertit la réponse en JSON
  })
  .then((data) => { // Gère les données de la réponse
      // Traitement des données reçues de l'API
      const userId = data.userId; // Extrait l'identifiant de l'utilisateur de la réponse
      const userToken = data.token; // Extrait le token de l'utilisateur de la réponse

      // Stockage des informations dans sessionStorage
      sessionStorage.setItem("token", userToken); // Stocke le token dans sessionStorage
      sessionStorage.setItem("userId", userId); // Stocke l'identifiant de l'utilisateur dans sessionStorage

      // Redirection vers la page index.html
      location.href = "index.html"; // Redirige l'utilisateur vers index.html
  })
  .catch((error) => { // Gère les erreurs éventuelles
      // Affichage de l'erreur dans la console
      console.error("Erreur : ", error); // Log l'erreur dans la console du navigateur

      // Affichage d'un message d'erreur dans le DOM
      errorMessage.textContent = "Une erreur est survenue lors de la connexion."; // Met à jour le texte du paragraphe d'erreur

        // Affichage de mon message d'erreur en couleur rouge
      errorMessage.style.color = "red"; // Change la couleur du texte du paragraphe d'erreur en rouge
  });
});
