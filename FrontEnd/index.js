
// Variables globales

const gallery = document.querySelector(".gallery")

// Contact API pour récupérer les projets

async function loadProject(){

    const response = await fetch("http://localhost:5678/api/works");

    const responseJson = await response.json();

    console.log(responseJson);
    return await responseJson;
}

loadProject();

// Afficher les images dans HTML

async function showProject(){
    
    const arrayProject = await loadProject();
    
    // Element transformer en photo  et recupérer mon projet par photo 
    arrayProject.forEach((photo) => {

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

        console.log("test élements",showTitle, showPicture);
    });
     
}
showProject()





