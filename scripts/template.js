function renderPokemonBox(index) {
    if (pokemonData[index].value.types.length == 1) {
        let pokemonType = pokemonData[index].value.types[0].type.name
        let pokemonTypeColor = typeColors[pokemonType];
    return `
     <section class="pokemon_box">
            <h1>${pokemonData[index].value.name}</h1>
            <div class="pokemon_box_img_container pkmn_box_color" style= "--type1: ${pokemonTypeColor};">
                <img class="pokemon_box_img" 
                src="${pokemonData[index].value.sprites.other['official-artwork'].front_default}" alt="">
            </div>
            <div>
                <p>${pokemonData[index].value.height}</p>
                <p>${pokemonData[index].value.types[0].type.name}</p>
            </div>

        </section>
    ` } else {
        let pokemonTypeOne = pokemonData[index].value.types[0].type.name
        let pokemonTypeColor = typeColors[pokemonTypeOne];
        let pokemonTypeTwo = pokemonData[index].value.types[1].type.name
        let pokemonTypeColorTwo = typeColors[pokemonTypeTwo];
        return `
     <section class="pokemon_box">
            <h1>${pokemonData[index].value.name}</h1>
            <div class="pokemon_box_img_container pkmn_box_color" 
                    style= "--type1: ${pokemonTypeColor}; --type2: ${pokemonTypeColorTwo};">
                <img 
                    class="pokemon_box_img" 
                    src="${pokemonData[index].value.sprites.other['official-artwork'].front_default}" alt="">
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

