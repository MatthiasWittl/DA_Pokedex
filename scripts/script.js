
async function loadFirstPokemon() {
    let data = await fetch ("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");
    dataJson = await data.json(); 
    startrender();
    
    
}
    
function startrender() {
    for (let index = 0; index < dataJson.results.length; index++) {
        document.getElementById("main_container").innerHTML += renderPokemonBox(index);
        
    }
    
}