
async function loadFirstPokemons() {
    let data = await fetch ("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");
    pokemonNames = await data.json();
    await loadPokemonData();
    startrender();
}
    
function startrender() {
    for (let index = 0; index < pokemonNames.results.length; index++) {
        document.getElementById("main_container").innerHTML += renderPokemonBox(index);
        
    }
    
}

async function loadPokemonData() {
    for (let index = 0; index < pokemonNames.results.length; index++) {
        let data = await fetch ("https://pokeapi.co/api/v2/pokemon/" + (index+1));
        let pokemonuno = await data.json();
        pokemonNames.results[index] = {
            ...pokemonNames.results[index],
            ...pokemonuno
        };
  
    }
}