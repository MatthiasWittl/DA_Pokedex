function renderPokemonBox(index) {
    if (pokemonData[index].types.length == 1) {
        let pokemonType = pokemonData[index].types[0].type.name
        let pokemonTypeColor = typeColors[pokemonType];
        
    return `
    <button onclick="openDialogBox()">
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
    </button>
    ` } else {
        let pokemonTypeOne = pokemonData[index].types[0].type.name
        let pokemonTypeColor = typeColors[pokemonTypeOne];
        let pokemonTypeTwo = pokemonData[index].types[1].type.name
        let pokemonTypeColorTwo = typeColors[pokemonTypeTwo];
        return `
    <button onclick="openDialogBox()">
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
    </button>
        `
    }

}

function renderSingleViewPokemonBox(index) {
    return `
    <section class="single_view_Pokemon_Box">
    <h2 class="pokemon_box_title_glow" >${pokemonData[index].name} #${pokemonData[index].id}</h2>
    <div class="pokemon_box_img_container pkmn_box_color">
        <img class="pokemon_box_img" 
        src="${pokemonData[index].sprites.other['official-artwork'].front_default}" alt="">
    </div>
    <section class="pokemon_base_stats_container">
        <div>
            <div>${pokemonData[index].stats[0].stat.name} </div>
            <div>${pokemonData[index].stats[1].stat.name} </div>
            <div>${pokemonData[index].stats[2].stat.name} </div>
            <div>${pokemonData[index].stats[3].stat.name} </div>
            <div>${pokemonData[index].stats[4].stat.name} </div>
            <div>${pokemonData[index].stats[5].stat.name} </div>
        </div>
        <div>
            <div>${pokemonData[index].stats[0].base_stat}</div>
            <div>${pokemonData[index].stats[1].base_stat}</div>
            <div>${pokemonData[index].stats[2].base_stat}</div>
            <div>${pokemonData[index].stats[3].base_stat}</div>
            <div>${pokemonData[index].stats[4].base_stat}</div>
            <div>${pokemonData[index].stats[5].base_stat}</div>
        </div>
    </section> 

</section>
`}


/* Dialog Window Base States:
        <div>${pokemonData[index].stats[0].stat.name} <div>${pokemonData[index].stats[0].base_stat}</div></div>
        <div>${pokemonData[index].stats[1].stat.name} <div>${pokemonData[index].stats[1].base_stat}</div></div>
        <div>${pokemonData[index].stats[2].stat.name} <div>${pokemonData[index].stats[2].base_stat}</div></div>
        <div>${pokemonData[index].stats[3].stat.name} <div>${pokemonData[index].stats[3].base_stat}</div></div>
        <div>${pokemonData[index].stats[4].stat.name} <div>${pokemonData[index].stats[4].base_stat}</div></div>
        <div>${pokemonData[index].stats[5].stat.name} <div>${pokemonData[index].stats[5].base_stat}</div></div>
        Zeile 47 /*style= "--type1: ${pokemonTypeColor};"*
*/

/* Dialog Window Base Attacks:
                  <section>
        <!--Moves // pokemonData[0].moves[0].move.name-->
        <p>${pokemonData[index].moves[0].move.name}</p>
        <p>${pokemonData[index].moves[1].move.name}</p>
        <p>${pokemonData[index].moves[2].move.name}</p>
        <p>${pokemonData[index].moves[3].move.name}</p>
        </section>

*/

/* Evolution Chain:
         <section>
                    <img src="" alt="">
                    <img src="" alt="">
                    <img src="" alt="">
                    </section>
    neue Anfrage an PokeAPI nach https://pokeapi.co/api/v2/evolution-chain/[z.B. 1 für Bisasam zu Bisaknosp zu Bisaflor]/
    Die namen aus der Chain holen und mit search in Pokemon Data die Bilder holen.

*/

/* Sound beim öffnen und für Sound und Shiny Seite:
        cries: pokemonData[0].cries.legacy
        shiny: pokemonData[0].sprites.front_shiny
*/