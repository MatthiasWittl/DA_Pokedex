function renderPokemonBox(index) {
    if (pokemonData[index].types.length == 1) {
        let pokemonType = pokemonData[index].types[0].type.name
        let pokemonTypeColor = typeColors[pokemonType];
        
    return `
     <section class="pokemon_box" style= "--type1: ${pokemonTypeColor};">
            <h2 class="pokemon_box_title_glow" >${pokemonData[index].name} #${pokemonData[index].id}</h2>
            <div class="pokemon_box_img_container pkmn_box_color">
                <img class="pokemon_box_img" 
                src="${pokemonData[index].sprites.other['official-artwork'].front_default}" alt="">
            </div>
            <div class="pokemon_box_type_container">
                <p class="pokemon_box_type_container background_color_by_type_one">${pokemonData[index].types[0].type.name}</p>
            </div>

        </section>
    ` } else {
        let pokemonTypeOne = pokemonData[index].types[0].type.name
        let pokemonTypeColor = typeColors[pokemonTypeOne];
        let pokemonTypeTwo = pokemonData[index].types[1].type.name
        let pokemonTypeColorTwo = typeColors[pokemonTypeTwo];
        return `
     <section class="pokemon_box" style= "--type1: ${pokemonTypeColor}; --type2: ${pokemonTypeColorTwo};">
            <h2 class="pokemon_box_title_glow" >${pokemonData[index].name} #${pokemonData[index].id}</h2>
            <div class="pokemon_box_img_container pkmn_box_color grid_area"> 
                <img 
                    class="pokemon_box_img" 
                    src="${pokemonData[index].sprites.other['official-artwork'].front_default}" alt="">
            </div>
             <div class="pokemon_box_type_container">
                <p class="pokemon_box_type_container background_color_by_type_one">${pokemonData[index].types[0].type.name}</p>
                <p class="pokemon_box_type_container background_color_by_type_two">${pokemonData[index].types[1].type.name}</p>                
            </div>
            

        </section>
        `
    }

}

