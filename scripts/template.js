function renderPokemonBoxes(index, pokemon, pkmnTypes, styleVarSet) {

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
    <button aria-label="Button to Open Dialog Box for Details" onclick="closeDialog()" style="--type1: ${colorOne}" class="closing_Button_dialog_Box">X</button>
    <section class="single_view_Pokemon_Box" style="--type1: ${colorOne}; --type2: ${colorTwo};">
      <h2 class="pokemon_box_title_glow">${pokemonData[index].name} #${pokemonData[index].id}</h2>
      <div class="pokemon_box_img_container pkmn_box_color">
        <img class="pokemon_box_img" src="${pokemonData[index].sprites.other["official-artwork"].front_default}"
          alt="">
      </div>
    <section class="pokemon_single_view_data_header">
      <button id="battle_stats_btn" onclick="showBattleStats(${index})" >Battle Stats</button>
      <button id="pkmn_moves_btn" onclick="showPkmnMoves(${index})" >Moves</button>
      <button id="evo_chain_btn" onclick="evoChainImgSet(${index})" >Evo Chain</button>
    </section>
    <section id="swap_container_id" class="swap_container">
      <dl id="battle_stats_datalist">
      </dl>
    </section>
    <section class="single_view_switch_container">
      <button aria-label="Button to previous Pokemon" class="single_view_switch" onclick="singleViewSwitch('previous', ${index})" >&#10094</button>
      <button aria-label="Button to next Pokemon" class="single_view_switch" onclick="singleViewSwitch('next', ${index})">&#10095</button>
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

function renderMoves(itemsHTML) {
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
        inputmode="search" minlength="3" pattern="[A-Za-z]+" title="Only Letters" required />
    <button type="submit" id="header_input_search_button" aria-label="Suchen">&#128269</button>
    </form>
`;
}
