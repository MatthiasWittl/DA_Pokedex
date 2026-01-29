function renderPokemonBox(index) {
    if (pokemonData[index].types.length == 1) {
        let pokemonType = pokemonData[index].types[0].type.name
        let pokemonTypeColor = typeColors[pokemonType];
        
    return `
    <button onclick="openDialogBox(${index}, '${pokemonTypeColor}', '${pokemonTypeColor}')">
     <section class="pokemon_box" style= "--type1: ${pokemonTypeColor};">
            <h2 class="pokemon_box_title_glow" id="pokemon_name" >${pokemonData[index].name} #${pokemonData[index].id}</h2>
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
    <button onclick="openDialogBox(${index}, '${pokemonTypeColor}', '${pokemonTypeColorTwo}')">
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

function renderSingleViewPokemonBox(index, colorOne, colorTwo) {
    return `
<section class="single_view_Pokemon_Box" style="--type1: ${colorOne}; --type2: ${colorTwo};">
    <h2 class="pokemon_box_title_glow">${pokemonData[index].name} #${pokemonData[index].id}</h2>
    <div class="pokemon_box_img_container pkmn_box_color">
        <img class="pokemon_box_img" src="${pokemonData[index].sprites.other['official-artwork'].front_default}" alt="">
    </div>
    <section class="pokemon_single_view_data">
        <button>&#8592</button> 
        <section class="pokemon_single_view_moves_section">
        <h3> Base Attacks </h3>
        <ul class="move_backgr_color">
            <li  ><img src="" class="move_icon">${pokemonData[index].moves[0].move.name}</li>
            <li  ><img src="" class="move_icon">${pokemonData[index].moves[1].move.name}</li>
            <li  ><img src="" class="move_icon">${pokemonData[index].moves[2].move.name}</li>
            <li  ><img src="" class="move_icon">${pokemonData[index].moves[3].move.name}</li>
        </ul>
        </section>
        <button>&#8594</button>
    </section>
</section>
`
}

/*
<dl>
<div class="pokemon_base_stats">
    <dt>${pokemonData[index].stats[0].stat.name}: </dt>
    <dd class="status_bar_container">
        <div class="status_bar" style="--type3: ${pokemonData[index].stats[0].base_stat}px;">
            <span>${pokemonData[index].stats[0].base_stat}</span>
        </div>
    </dd>
</div>

<div class="pokemon_base_stats">
    <dt>${pokemonData[index].stats[1].stat.name}: </dt>
    <dd class="status_bar_container">
        <div class="status_bar" style="--type3: ${pokemonData[index].stats[1].base_stat}px;">
            <span>${pokemonData[index].stats[1].base_stat}</span>
        </div>
    </dd>
</div>

<div class="pokemon_base_stats">
    <dt>${pokemonData[index].stats[2].stat.name}: </dt>
    <dd class="status_bar_container">
        <div class="status_bar" style="--type3: ${pokemonData[index].stats[2].base_stat}px;">
            <span>${pokemonData[index].stats[2].base_stat}</span>
        </div>
    </dd>
</div>

<div class="pokemon_base_stats">
    <dt>${pokemonData[index].stats[3].stat.name}: </dt>
    <dd class="status_bar_container">
        <div class="status_bar" style="--type3: ${pokemonData[index].stats[3].base_stat}px;">
            <span>${pokemonData[index].stats[3].base_stat}</span>
        </div>
    </dd>
</div>

<div class="pokemon_base_stats">
    <dt>${pokemonData[index].stats[4].stat.name}: </dt>
    <dd class="status_bar_container">
        <div class="status_bar" style="--type3: ${pokemonData[index].stats[4].base_stat}px;">
            <span>${pokemonData[index].stats[4].base_stat}</span>
        </div>
    </dd>
</div>

<div class="pokemon_base_stats">
    <dt>${pokemonData[index].stats[5].stat.name}: </dt>
    <dd class="status_bar_container">
        <div class="status_bar" style="--type3: ${pokemonData[index].stats[5].base_stat}px;">
            <span>${pokemonData[index].stats[5].base_stat}</span>
        </div>
    </dd>
</div>

</dl>
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


/*
style="--type4: ${typeColors[movesData[0].type.name]}
style="--type4: ${typeColors[movesData[1].type.name]}
style="--type4: ${typeColors[movesData[2].type.name]}
style="--type4: ${typeColors[movesData[3].type.name]}
*/

/*
    <li  >${movesData[0].name}</li>
            <li  >${movesData[1].name}</li>
            <li  >${movesData[2].name}</li>
            <li  >${movesData[3].name}</li>*/
