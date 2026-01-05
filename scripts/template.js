

/* function renderPokemonBox(index) {
    return `
     <section class="pokemon_container">
            <h1>${pokemonNames[index].name}</h1>
            <img class="main_site_img_box" src="${pokemonNames[index].sprites.other['official-artwork'].front_default}" alt="">
            <div>
                <p>${pokemonNames[index].height}</p>
            </div>

        </section>
    `
} */



function renderPokemonBox(index) {
    return `
     <section class="pokemon_container">
            <h1>${pokemonData[index].value.name}</h1>
            <img class="main_site_img_box" src="${pokemonData[index].value.sprites.other['official-artwork'].front_default}" alt="">
            <div>
                <p>${pokemonData[index].value.height}</p>
            </div>

        </section>
    `
}