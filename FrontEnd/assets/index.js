

async function loadProject() {

    const response = await fetch("http://localhost:5678/api/works");
    
    const responseJson = await response.json();

    console.log(responseJson);
}
loadProject();