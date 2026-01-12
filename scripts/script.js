const buttonvisibility = document.getElementById("open_more_Pokemon_id").classList;
const searchbarvisibility = document.getElementById("header_input_search_id").classList;
const scrollToTopButtonvisibility = document.getElementById("scroll_to_top_id").classList;
let renderdPokemonBoxes = 0;
let promises = [];

window.addEventListener("scroll", () => {
    if (window.scrollY < 10) {
        scrollToTopButtonvisibility.remove("visible");
    } else if (window.scrollY > 80) {
        scrollToTopButtonvisibility.add("visible");
    }
});


function checkForLocalStorageData() {
    if (localStorage.getItem("pokemonData") == null) {
        getFirstPokemonData();
    } else if (localStorage.getItem("lastFetch") > 0) {
        differenceLastToNewFetch();
        if (differenceLastToNewFetch() >= 24) {
            getFirstPokemonData();
        } else {
            pokemonData = JSON.parse(localStorage.getItem("pokemonData"));
            loadAllReaminingPokemon();
            startrender();
        }
}}

function differenceLastToNewFetch() {
    let lastFetch = localStorage.getItem("lastFetch");
    let timeNow = new Date();
    let difference = timeNow.getTime() - lastFetch;
    let differenceInHours = difference / (1000 * 60 * 60);
    return differenceInHours;
}

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

function storageLocalFirstPokemonData() {
    let dateOfFetch = new Date();
    localStorage.setItem("lastFetch", dateOfFetch.getTime());
    localStorage.setItem("pokemonData", JSON.stringify(pokemonData));
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
    searchbarvisibility.add("visible");
    
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
    let viewpoint = document.querySelector(".pokemon_box:last-child");
        viewpoint.scrollIntoView({behavior: "smooth"});
        scrollToTopButtonvisibility.add("visible");
}

function scrollToTop() {
    document.documentElement.scrollTo({top: 0, behavior: "smooth"});
    document.body.scrollTo({top: 0, behavior: "smooth"});
}


