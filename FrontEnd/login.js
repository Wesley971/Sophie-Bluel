// Sélection des éléments du DOM nécessaires
const email = document.querySelector("form #email");
const password = document.querySelector("form #password");
const form = document.querySelector("form");
const errorMessage = document.querySelector("#login p");

// Ajout d'un écouteur d'événement au formulaire
form.addEventListener("submit", (event) => {
  // Prévention de l'action par défaut du formulaire (rechargement de la page)
  event.preventDefault();

  // Récupération des valeurs des champs email et mot de passe
  const userEmail = email.value;
  const userPassword = password.value;

  // Création de l'objet contenant les données du formulaire
  const loginData = {
      email: userEmail,
      password: userPassword,
  };

  // Envoi de la requête à l'API avec fetch
  fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
  })
  .then((response) => {
      // Vérification de la réponse du serveur
      if (!response.ok) {
          // Si la réponse n'est pas ok, retourner une promesse rejetée avec une erreur
          return Promise.reject(new Error("Erreur HTTP : " + response.status));
      }
      // Si la réponse est ok, retourner la réponse convertie en JSON
      return response.json();
  })
  .then((data) => {
      // Traitement des données reçues de l'API
      const userId = data.userId;
      const userToken = data.token;

      // Stockage des informations dans sessionStorage
      sessionStorage.setItem("token", userToken);
      sessionStorage.setItem("userId", userId);

      // Redirection vers la page index.html
      location.href = "index.html";
  })
  .catch((error) => {
      // Affichage de l'erreur dans la console
      console.error("Erreur : ", error);

      // Affichage d'un message d'erreur dans le DOM
      errorMessage.textContent = "Une erreur est survenue lors de la connexion.";

        // Affichage de mon message d'erreur en couleur rouge
      errorMessage.style.color = "red";
  });
});
