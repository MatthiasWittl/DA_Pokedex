async function getPokemonEvolutionChain(index) {
  await getPokemonSpecies(index);
  let promise = await fetch(pokemonSpecies.evolution_chain.url).then((response) => {
    if (!response.ok) {
      retryFetch(pokemonSpecies.evolution_chain.url);
    }
    return response.json();
  });
  pokemonEvolutionChain = { ...promise };
  pokemonEvolutionChain = parseEvolutionTree(pokemonEvolutionChain.chain);
}

async function getPokemonSpecies(index) {
  let pokemonSpeciesURL = pokemonData[index].species.url;
  let promise = await fetch(pokemonSpeciesURL).then((response) => {
    if (!response.ok) {
      retryFetch(pokemonSpeciesURL);
    }
    return response.json();
  });
  pokemonSpecies = { ...promise };
  return pokemonSpecies.evolution_chain.url;
}

function parseEvolutionTree(chain, list = []) {
  let pkmnNumberURL = chain.species.url.split("/").filter(Boolean);
  pkmnNumberURL = Number(pkmnNumberURL[pkmnNumberURL.length - 1]);
  if (pkmnNumberURL <= maxPokemonOnSite) {
    list.push(chain.species.name);
  }
  chain.evolves_to.forEach((child) => {
    parseEvolutionTree(child, list);
  });
  return list;
}

function evoChainImgSet() {
  changeSingleViewBtnHighlight("evo_chain_btn");
  document.getElementById("swap_container_id").innerHTML = "";
  for (let i = 0; i < pokemonEvolutionChain.length; i++) {
    let nrPkmnImg = indexFinder(pokemonEvolutionChain[i]);
    document.getElementById("swap_container_id").innerHTML += renderEvolutionChainImg(nrPkmnImg);
  }
  swapContainerClasses.add("evolution_chain_img_container", "pkmn_box_color");
}

function indexFinder(evolutionName) {
  for (let indexEvoToData = 0; indexEvoToData < Object.keys(pokemonData).length; indexEvoToData++) {
    if (evolutionName == pokemonData[indexEvoToData].name) return indexEvoToData;
  }
}
