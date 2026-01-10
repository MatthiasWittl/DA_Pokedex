const buttonvisibility = document.getElementById("open_more_Pokemon_id").classList;
let renderdPokemonBoxes = 0;
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
        .map(({ value }) => value), storageLocalFirstPokemonData(),
        loadAllReaminingPokemon(), startrender());
    })
    
    
} 


function startrender() {
    for (let index = 0; index < Object.keys(pokemonData).length; index++) {
        document.getElementById("main_container").innerHTML += renderPokemonBox(index);
        renderdPokemonBoxes++;
    }
    
}

async function loadAllReaminingPokemon() {
    for (let index = 0; index < remainingPokemonDataToLoad; index++) {
        let promise = await fetch ("https://pokeapi.co/api/v2/pokemon/" + (index+1+firstAmountOfLoadingPokemon)).then(response => {
            if (!response.ok) {
                retryFetch("https://pokeapi.co/api/v2/pokemon/" + (index+1+firstAmountOfLoadingPokemon));
            } return response.json();
        })
        pokemonData[(index+firstAmountOfLoadingPokemon)] = {...promise}
    }
    buttonvisibility.add("visible");
    
}


function renderMorePokemon(){
    let endRenderIndex;
    if (renderdPokemonBoxes >= 145) {
        return;
    } else if (renderdPokemonBoxes == 144) {
        endRenderIndex = 151;
    } else {
        endRenderIndex = renderdPokemonBoxes + moreAmountOfLoadingPokemon;
    }
    for (let index = renderdPokemonBoxes; index < (endRenderIndex); index++) {
        document.getElementById("main_container").innerHTML += renderPokemonBox(index);
        renderdPokemonBoxes++;
    }
}

function storageLocalFirstPokemonData() {
    localStorage.setItem("pokemonData", JSON.stringify(pokemonData));
}