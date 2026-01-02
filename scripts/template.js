

function renderPokemonBox(index) {
    return `
     <section class="pokemon_container">
            <h1>${pokemonNames[index].name}</h1>
            <img class="main_site_img_box" src="${pokemonNames[index].sprites.other['official-artwork'].front_default}" alt="">
            <div>
                <p>${pokemonNames[index].height}</p>
            </div>

        </section>
    `
}

/*sprites.other['official-artwork'].front_default*/

function renderPokemonBox1(index) {
    return `
     <section class="pokemon_container">
            <h1>${pokemonNames1.results[index].name}</h1>
            <img class="main_site_img_box" src="${pokemonNames1.results[index].sprites.other['official-artwork'].front_default}" alt="">
            <div>
                <p>${pokemonNames1.results[index].height}</p>
            </div>

        </section>
    `
}