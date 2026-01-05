function renderPokemonBox(index) {
    if (pokemonData[index].value.types.length == 1) {
    return `
     <section class="pokemon_box">
            <h1>${pokemonData[index].value.name}</h1>
            <div class="pokemon_box_img_container">
                <img class="pokemon_box_img" src="${pokemonData[index].value.sprites.other['official-artwork'].front_default}" alt="">
            </div>
            <div>
                <p>${pokemonData[index].value.height}</p>
                <p>${pokemonData[index].value.types[0].type.name}</p>
            </div>

        </section>
    ` } else {
        return `
     <section class="pokemon_box">
            <h1>${pokemonData[index].value.name}</h1>
            <div class="pokemon_box_img_container">
                <img class="pokemon_box_img" src="${pokemonData[index].value.sprites.other['official-artwork'].front_default}" alt="">
            </div>
            <div>
                <p>${pokemonData[index].value.height}</p>
                <p>${pokemonData[index].value.types[0].type.name}</p>
                <p>${pokemonData[index].value.types[1].type.name}</p>                
            </div>

        </section>
        `
    }

}

