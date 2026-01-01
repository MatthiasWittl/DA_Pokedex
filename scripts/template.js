

function renderPokemonBox(index) {
    return `
     <section class="pokemon_container">
            <h1>${pokemonNames.results[index].name}</h1>
            <img src="" alt="">
            <div>
                <p>${pokemonNames.results[index].height}</p>
            </div>

        </section>
    `
}