
// Variables globales

const gallery = document.querySelector(".gallery")

const filters = document.querySelector(".filters")

// Contact API pour récupérer les projets

async function loadProjects(){

    const response = await fetch("http://localhost:5678/api/works");

    return await response.json();

    // Deuxieme solution
    // const responseJson = await response.json();

    // return await responseJson;
}

loadProjects();

//  
 function createProject(photo) {

    // Creation des balises pour la photo
    const showPicture = document.createElement("figure")


    // creation des balises pour le titre de la photo
    const showTitle = document.createElement("figcaption")

    // creation elements IMG
    const showImg = document.createElement("img")

    // Ajout des contenues crée
    showImg.src = photo.imageUrl
    showTitle.innerText = photo.title 
    
    // Ajout des elements en tant que enfants de la div gallery
    showPicture.appendChild(showImg)
    showPicture.appendChild(showTitle)
    gallery.appendChild(showPicture)

    // test des élèments afficher 

    //console.log("test élements",showTitle, showPicture);
}

// Afficher les images dans HTML

async function showProjects(){
    
    const arrayProject = await loadProjects();
    
    // Element transformer en photo  et recupérer mon projet par photo 
    arrayProject.forEach(createProject);
     
}
showProjects()

// Création des catégories 

// Récupération des Catégorie dans l'API

async function showCategories(){

    const response = await fetch("http://localhost:5678/api/categories");

    return await response.json();

}

// Création des bouton de catégories

async function showCategoriesButtons(){
    const category = await showCategories();
// Création des boutton en HTML
    category.forEach(group => {
        const button = document.createElement("button")

//     Recuperation du nom de mes bouttons 

        button.textContent = group.name

//     Récupération des numéro de mes bouttons       
        button.id = group.id

// J'indique au HTML que button est l'enfant de filters

        filters.appendChild(button)
        
    });

    console.log(category);
}
showCategoriesButtons()

// Filtrer par catégories avec mes boutons

async function filterCategories(){

    // Je recupere mon tableau du debut Le tableau /WORKS

    const projects = await loadProjects();

    
    // Je selection tout mes bouttons dans la section de filters en HTML

    const buttons = document.querySelectorAll(".filters button")

    // Parcourir mes boutons grace a forEach 

    buttons.forEach(button => {

        // je crée un ecouter d'évènement qui fonctionne au "click"

        button.addEventListener("click", (event) => {

          //  console.log(event.target.id);
            
                btnId = event.target.id
        
    // Suppression des élèments de la gallery pour pouvoir afficher ce que je souhaite
                
                gallery.innerHTML = "";
                
                // Boucles pour afficher par catégorie

                if (btnId !== "0")  {

                    // utilisation de la fonction filter
                    const projectCategories = projects.filter((project) => {
                        return project.categoryId == btnId;
                    

                    })
                        projectCategories.forEach(createProject);
                }
            
        });
    });

}
filterCategories()

