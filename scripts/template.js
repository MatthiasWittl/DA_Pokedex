function renderPokemonBox(index) {
  if (pokemonData[index].types.length == 1) {
    let pokemonType = pokemonData[index].types[0].type.name;
    let pokemonTypeColor = typeColors[pokemonType];

    return `
    <button class="only_view" onclick="openDialogBox(${index}, '${pokemonTypeColor}', '${pokemonTypeColor}')">
     <section class="pokemon_box" style= "--type1: ${pokemonTypeColor};">
            <h2 class="pokemon_box_title_glow" id="pokemon_name" >${pokemonData[index].name} #${pokemonData[index].id}</h2>
            <div class="pokemon_box_img_container pkmn_box_color">
                <img class="pokemon_box_img" 
                src="${pokemonData[index].sprites.other["official-artwork"].front_default}" alt="">
            </div>
            <div class="pokemon_box_type_container">
                <p class="pokemon_box_type_container background_color_by_type_one">${pokemonData[index].types[0].type.name}</p>
            </div>
                   
        </section>
    </button>
    `;
  } else {
    let pokemonTypeOne = pokemonData[index].types[0].type.name;
    let pokemonTypeColor = typeColors[pokemonTypeOne];
    let pokemonTypeTwo = pokemonData[index].types[1].type.name;
    let pokemonTypeColorTwo = typeColors[pokemonTypeTwo];
    return `
    <button class="only_view" onclick="openDialogBox(${index}, '${pokemonTypeColor}', '${pokemonTypeColorTwo}')">
        <section class="pokemon_box" style= "--type1: ${pokemonTypeColor}; --type2: ${pokemonTypeColorTwo};">
            <h2 class="pokemon_box_title_glow" >${pokemonData[index].name} #${pokemonData[index].id}</h2>
            <div class="pokemon_box_img_container pkmn_box_color grid_area"> 
                <img 
                    class="pokemon_box_img" 
                    src="${pokemonData[index].sprites.other["official-artwork"].front_default}" alt="">
            </div>
            <div class="pokemon_box_type_container">
                <p class="pokemon_box_type_container background_color_by_type_one">${pokemonData[index].types[0].type.name}</p>
                <p class="pokemon_box_type_container background_color_by_type_two">${pokemonData[index].types[1].type.name}</p>                
            </div>
        </section>
    </button>
        `;
  }
}

function renderSingleViewPokemonBox(index, colorOne, colorTwo) {
  return `
  <button onclick="closeDialog()" style="--type1: ${colorOne}" class="closing_Button_dialog_Box">X</button>
<section class="single_view_Pokemon_Box" style="--type1: ${colorOne}; --type2: ${colorTwo};">
    <h2 class="pokemon_box_title_glow">${pokemonData[index].name} #${pokemonData[index].id}</h2>
    <div class="pokemon_box_img_container pkmn_box_color">
        <img class="pokemon_box_img" src="${pokemonData[index].sprites.other["official-artwork"].front_default}"
            alt="">
    </div>
    <h3 class="pkmn_box_details" id="swap_container_header">Battle Stats</h3>
    <section class="pokemon_single_view_data">
        <button onclick="sectionSwitch('previous', ${index})" >&#8592</button>
        <section id="swap_container">
            <dl id="battle_stats_datalist">
            </dl>
        </section>
        <button onclick="sectionSwitch('next', ${index})">&#8594</button>
    </section>
    `;
}

function renderBattleStatsContainer() {
    return `
    <dl id="battle_stats_datalist">
    </dl>
    `
}

function renderBattleStats(index, iStats, statusBarFill) {
    return `
    <div class="pokemon_base_stats">
        <dt>${pokemonData[index].stats[iStats].stat.name}: </dt>
        <dd class="status_bar_container">
            <div class="status_bar" style="--type3: ${statusBarFill}%;">
                <span>${pokemonData[index].stats[iStats].base_stat}</span>
            </div>
        </dd>
    </div>
`            
}

function renderEvolutionChainImg(index) {
  return `
    <img class="evolution_img" src="${pokemonData[index].sprites.other["official-artwork"].front_default}" alt="${pokemonData[index].name}">
`;
}

function renderMoves(index) {
    return `
    <section class="pokemon_single_view_moves_section">
        <ul class="move_backgr_color">
            <li  ><img src="" class="move_icon">${pokemonData[index].moves[0].move.name}</li>
            <li  ><img src="" class="move_icon">${pokemonData[index].moves[1].move.name}</li>
            <li  ><img src="" class="move_icon">${pokemonData[index].moves[2].move.name}</li>
            <li  ><img src="" class="move_icon">${pokemonData[index].moves[3].move.name}</li>
        </ul>
        </section>
`;
}

function renderSearchField() {
    return `
    <form role="search">
    <label for="header_input_search_field" class="sr_only">Search Pokemon</label>
    <input id="header_input_search_field" placeholder="Search Pokemon" type="text" maxlength="12"
        inputmode="search" minlength="3" pattern="[A-Za-z]+" title="Min three Letters" required />
    <button type="submit" id="header_input_search_button" aria-label="Suchen">&#128269</button>
    </form>
`
}
/*Stats Section */
/*

*/

/*move Section */
/* <section class="pokemon_single_view_moves_section">
        <ul class="move_backgr_color">
            <li  ><img src="" class="move_icon">${pokemonData[index].moves[0].move.name}</li>
            <li  ><img src="" class="move_icon">${pokemonData[index].moves[1].move.name}</li>
            <li  ><img src="" class="move_icon">${pokemonData[index].moves[2].move.name}</li>
            <li  ><img src="" class="move_icon">${pokemonData[index].moves[3].move.name}</li>
        </ul>
        </section>
        <button>&#8594</button>
    </section>
    /*

    /* Evolution Chain container
    <section class="evolution_chain_img_container pkmn_box_color" id="evolution_chain_img_container_id">
        </section>

    /*


/*
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
*/