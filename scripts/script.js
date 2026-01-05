
let promises = [];

function getFirstPokemonData() {

    for (let index = 0; index < firstAmountOfLoadingPokemon; index++) {
        let promise = fetch ("https://pokeapi.co/api/v2/pokemon/" + (index+1)/*1025 tst*/).then(response => {
            if (!response.ok) {
                retryFetch("https://pokeapi.co/api/v2/pokemon/" + (index+1));
            } return response.json();
        })
        promises.push(promise)
    }
    Promise.allSettled(promises)
    .then(results => {console.log("Alle Daten sind geladen", pokemonData = {...results}, startrender());
    })
    
} 


function startrender() {
    for (let index = 0; index < Object.keys(pokemonData).length; index++) {
        document.getElementById("main_container").innerHTML += renderPokemonBox1(index);
        
    }
    
}



