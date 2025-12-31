
async function loadFirstPokemon() {
    let data = await fetch ("https://pokeapi.co/api/v2/pokemon/ditto");
    dataJson = await data.json(); 
    console.log(dataJson);
    pokemonBox += renderPokemonBox ();
    
}
    
function startrender() {
    for (let index = 0; index < 10; index++) {
        document.getElementById("main_container").innerHTML += renderPokemonBox();
        
    }
    
}