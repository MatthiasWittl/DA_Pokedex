
let promises = [];

function getFirstPokemonData() {

    for (let index = 0; index < firstAmountOfLoadingPokemon; index++) {
        let promise = fetch ("https://pokeapi.co/api/v2/pokemon/" + (index+1025)/*1025 tst*/).then(response => {
            if ([500, 502, 503].includes(response.status)) {
                retryFetch("https://pokeapi.co/api/v2/pokemon/" + (index+1025));
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

async function retryFetch(url, retries = 3) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`${response.status} - Retry left:  ${retries}`);
            if (retries > 0) {
                return retryFetch(url, retries - 1);
            }
            throw new Error(`Request failed with ${response.status}`)
        }
        return await response.json();
    } catch (error) {
        
    }
}
