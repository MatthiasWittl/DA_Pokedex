function renderPokemonBox(index) {
  let pokemon = pokemonData[index];
  let pkmnTypes = pokemon.types.map((t) => t.type.name);
  let styleVarSet = `--type1: ${typeColors[pokemonData[index].types[0].type.name]};`;
  if (pokemon.types[1]) {
    styleVarSet += ` --type2: ${typeColors[pokemonData[index].types[1].type.name]};`;
  }
  let typesHTML = pkmnTypes
    .map((name, i) => {
      return `
        <p class="pokemon_box_type_container background_color_by_type" style="--type-color: ${typeColors[name]};">
            ${name}
        </p>`;
    })
    .join("");
  return `
    <button class="only_view" onclick="openDialogBox(${index}, '${pkmnTypes}')">
    <section class="pokemon_box" style= "${styleVarSet};">
        <h2 class="pokemon_box_title_glow" id="pokemon_name" >${pokemon.name} #${pokemon.id}</h2>
        <div class="pokemon_box_img_container pkmn_box_color">
            <img class="pokemon_box_img" 
                src="${pokemon.sprites.other["official-artwork"].front_default}" alt="">        
        </div>
        <div class="pokemon_box_type_container">
               ${typesHTML}
        </div>       
    </section>
    </button>
`;
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
        <section class="pokemon_single_view_data_header">
        <button onclick="" >Battle Stats</button>
        <button onclick="" >Moves</button>
        <button onclick="" >Evo Chain</button>
        </section>
            <section id="swap_container">
            <dl id="battle_stats_datalist">
            </dl>
            </section>
            
    
`;
}

function renderBattleStatsContainer() {
  return `
    <dl id="battle_stats_datalist">
    </dl>
`;
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
`;
}

function renderEvolutionChainImg(index) {
  return `
    <img class="evolution_img" src="${pokemonData[index].sprites.other["official-artwork"].front_default}" alt="${pokemonData[index].name}">
`;
}

function renderMoves(index) {
  let itemsHTML = "";
for (let iMove = 0; iMove < pokemonData[index].moves.length && iMove < maxAmountMoves; iMove++) {
  itemsHTML += 
  `<li  ><img src="" class="move_icon">${pokemonData[index].moves[iMove].move.name}</li>`
}
  return `
    <section class="pokemon_single_view_moves_section">
        <ul class="move_backgr_color">
            ${itemsHTML}
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
`;
}


/* old render single view

<button onclick="sectionSwitch('next', ${index})">&#8594</button>
<button onclick="sectionSwitch('previous', ${index})" >&#8592</button>

*/

