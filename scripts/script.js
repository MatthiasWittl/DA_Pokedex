
let promises = [];

function getFirstPokemonData() {
    for (let index = 0; index < firstAmountOfLoadingPokemon; index++) {
        let promise = fetch ("https://pokeapi.co/api/v2/pokemon/" + (index+1)).then(response => {
            if (!response.ok) {
                retryFetch("https://pokeapi.co/api/v2/pokemon/" + (index+1));
            } return response.json();
        })
        promises.push(promise)
    }
    Promise.allSettled(promises)
    .then(results => {console.log("Alle Daten sind geladen", pokemonData = results
        .filter(({ status }) => status === "fulfilled")
        .map(({ value }) => value),
        loadAllReaminingPokemon(), startrender());
    })
    
} 


function startrender() {
    for (let index = 0; index < Object.keys(pokemonData).length; index++) {
        document.getElementById("main_container").innerHTML += renderPokemonBox(index);
        
    }
    
}

async function loadAllReaminingPokemon() {
    for (let index = 0; index < remainingPokemonDataToLoad; index++) {
        let promise = await fetch ("https://pokeapi.co/api/v2/pokemon/" + (index+1+firstAmountOfLoadingPokemon)).then(response => {
            if (!response.ok) {
                retryFetch("https://pokeapi.co/api/v2/pokemon/" + (index+1+firstAmountOfLoadingPokemon));
            } return response.json();
        })
        pokemonData[(index+1+firstAmountOfLoadingPokemon)] = {...promise}
    }
    
}
