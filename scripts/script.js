const buttonvisibility = document.getElementById("open_more_Pokemon_id").classList;
const scrollToTopButtonvisibility = document.getElementById("scroll_to_top_id").classList;
const scrollToBottomButtonvisibility = document.getElementById("scroll_to_bottom_id").classList;
const pokedexMainContainer = document.getElementById("main_container").classList;
const pokemonBoxDialog = document.getElementById("single_view_Pokemon_Dialog_Box_id");
const pokedexLoading = document.getElementById("pokedex_loader_id").classList;
const backToMainBtn = document.getElementById("back_to_main_btn").classList;
let observer;
let userscreenView;
let singleViewPkmnIndex;
let swapContainerClasses;
let renderdPokemonBoxes = 0;
let promises = [];
let promisesMoves = [];

const singleViewSections = {
  0: {
    header: "Battle Stats",
    render: showBattleStats,
  },
  1: {
    header: "Moves",
    render: showPkmnMoves,
  },
  2: {
    header: "Evolution Chain",
    render: evoChainImgSet,
  },
};

const maxModulesSingleView = Object.keys(singleViewSections).length - 1;

function checkForLocalStorageData() {
  if (localStorage.getItem("pokemonData") == null) {
    getFirstPokemonData();
  } else if (localStorage.getItem("lastFetch") > 0) {
    differenceLastToNewFetch();
    if (differenceLastToNewFetch() >= 24) {
      getFirstPokemonData();
    } else {
      pokemonData = JSON.parse(localStorage.getItem("pokemonData"));
      loadAllReaminingPokemon();
      startrender();
    }
  }
}

function differenceLastToNewFetch() {
  let lastFetch = localStorage.getItem("lastFetch");
  let timeNow = new Date();
  let difference = timeNow.getTime() - lastFetch;
  let differenceInHours = difference / (1000 * 60 * 60);
  return differenceInHours;
}

function getFirstPokemonData() {
  for (let index = 0; index < firstAmountOfLoadingPokemon; index++) {
    let promise = fetch("https://pokeapi.co/api/v2/pokemon/" + (index + 1)).then((response) => {
      if (!response.ok) {
        retryFetch("https://pokeapi.co/api/v2/pokemon/" + (index + 1));
      }
      return response.json();
    });
    promises.push(promise);
  }
  Promise.allSettled(promises).then((results) => {
    (pokemonData = results.filter(({ status }) => status === "fulfilled").map(({ value }) => value)),
      storageLocalFirstPokemonData(),
      loadAllReaminingPokemon(),
      startrender();
  });
}

function storageLocalFirstPokemonData() {
  let dateOfFetch = new Date();
  localStorage.setItem("lastFetch", dateOfFetch.getTime());
  localStorage.setItem("pokemonData", JSON.stringify(pokemonData));
}

async function loadAllReaminingPokemon() {
  for (let index = 0; index < remainingPokemonDataToLoad; index++) {
    let promise = await fetch("https://pokeapi.co/api/v2/pokemon/" + (index + 1 + firstAmountOfLoadingPokemon)).then(
      (response) => {
        if (!response.ok) {
          retryFetch("https://pokeapi.co/api/v2/pokemon/" + (index + 1 + firstAmountOfLoadingPokemon));
        }
        return response.json();
      }
    );
    pokemonData[index + firstAmountOfLoadingPokemon] = { ...promise };
    loadedPkmn++;
    loadingBarAnimation();
  }
  buttonvisibility.add("visible");
  changeLoaderForSearch();
}

function startrender() {
  document.getElementById("main_container").innerHTML = "";
  for (let index = 0; index < Object.keys(pokemonData).length; index++) {
    document.getElementById("main_container").innerHTML += renderPokemonBox(index);
    renderdPokemonBoxes++;
  }
  pokedexLoading.add("display_none");
  startobeserver();
}

function loadingBarAnimation() {
  document.getElementById("loading_counter").innerHTML = loadedPkmn + " / " + maxPokemonOnSite;
  let loadingBarfiller = (maxpercentage / maxPokemonOnSite) * loadedPkmn;
  document.documentElement.style.setProperty("--type5", loadingBarfiller + "%");
}

function changeLoaderForSearch() {
  document.getElementById("header_input_search_id").innerHTML = renderSearchField();
  checkInputSearchField();
}

function checkInputSearchField() {
  const inputSearch = document.querySelector("form");
  inputSearch.addEventListener("submit", (event) => {
    if (!inputSearch.checkValidity()) {
      return;
    }
    userscreenView = window.scrollY;
    event.preventDefault();
    searchPokemonFromInputField();
  });
}

function searchPokemonFromInputField() {
  let input = document.getElementById("header_input_search_field").value.toLowerCase();
  for (let index = 0; index < Object.keys(pokemonData).length; index++) {
    if (input === pokemonData[index].name) {
      document.getElementById("main_container").innerHTML = "";
      document.getElementById("main_container").innerHTML += renderPokemonBox(index);
      changeViewForOneBox();
      break;
    } else if (index === Object.keys(pokemonData).length - 1) {
      alert("Pokémon nicht gefunden. Bitte überprüfe die Eingabe.");
    }
  }
  document.getElementById("header_input_search_field").value = "";
}

function changeViewForOneBox() {
  observer.disconnect();
  scrollToBottomButtonvisibility.remove("visible");
  scrollToTopButtonvisibility.remove("visible");
  pokedexMainContainer.add("justify_center");
  buttonvisibility.remove("visible");
  backToMainBtn.add("button_highlight");
}

function renderMorePokemon() {
  let endRenderIndex;
  if (renderdPokemonBoxes > calcLimitForMaxLoad) {
    return;
  } else if (renderdPokemonBoxes == calcLimitForMaxLoad) {
    endRenderIndex = maxPokemonOnSite;
    buttonvisibility.remove("visible");
  } else {
    endRenderIndex = renderdPokemonBoxes + moreAmountOfLoadingPokemon;
  }
  for (let index = renderdPokemonBoxes; index < endRenderIndex; index++) {
    document.getElementById("main_container").insertAdjacentHTML("beforeend", renderPokemonBox(index));
    renderdPokemonBoxes++;
  }
  let viewpoint = document.querySelector(".only_view:last-child");
  viewpoint.scrollIntoView({ behavior: "smooth" });
}

function scrollToTop() {
  document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
}

function scrollToBottom() {
  document.documentElement.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
}

function backToMainSite() {
  observer.disconnect();
  document.getElementById("main_container").innerHTML = "";
  for (let index = 0; index < renderdPokemonBoxes; index++) {
    document.getElementById("main_container").innerHTML += renderPokemonBox(index);
  }
  pokedexMainContainer.remove("justify_center");
  buttonvisibility.add("visible");
  backToMainBtn.remove("button_highlight");
  window.scroll({ top: userscreenView, behavior: "smooth" });
  startobeserver();
}

async function openDialogBox(index, color) {
  let colors = color.split(",");
  let colorOne = typeColors[colors[0]];
  if (colors[1]) {
    colorTwo = typeColors[colors[1]];
  } else {
    colorTwo = "unset";
  }
  singleViewPkmnIndex = index;
  await getPokemonMoves(index);
  await getPokemonEvolutionChain(index);
  pokemonBoxDialog.showModal();
  pokemonBoxDialog.innerHTML = renderSingleViewPokemonBox(index, colorOne, colorTwo);
  pokemonBoxUtilities(index);
  pokemonBoxDialog.focus();
}

async function getPokemonMoves(index) {
  if (!movesData.length == 0) {
      await movesFromStorage(index);
    return true;
  } else {
    await getPkmnMovesFromAPI(index);
  }
  return true;
}

async function movesFromStorage(index) {
  for (let moveIndex = 0; moveIndex < maxAmountMoves && moveIndex < pokemonData[index].moves.length; moveIndex++) {
    let moveURL = pokemonData[index].moves[moveIndex].move.url;
    let moveName = pokemonData[index].moves[moveIndex].move.name;
    for (let index = 0; index < Object.keys(movesData).length; index++) {
      if (moveName === movesData[index].name) {
        break;
      } else if (index === Object.keys(movesData).length - 1) {
        let promise = await fetch(moveURL).then((response) => {
          if (!response.ok) {
            retryFetch(moveURL);
          }
          return response.json();
        });
        movesData[Object.keys(movesData).length] = { ...promise };
      }
    }
  }
  return true;
}

async function getPkmnMovesFromAPI(index) {
  for (let moveIndex = 0; moveIndex < maxAmountMoves && moveIndex < pokemonData[index].moves.length; moveIndex++) {
    let moveURL = pokemonData[index].moves[moveIndex].move.url;
    let promise = fetch(moveURL).then((response) => {
      if (!response.ok) {
        retryFetch(moveURL);
      }
      return response.json();
    });
    promisesMoves.push(promise);
  }
  let results = await Promise.allSettled(promisesMoves);
  movesData = results.filter(({ status }) => status === "fulfilled").map(({ value }) => value);
  return true;
}

function pokemonBoxUtilities(index) {
  showBattleStats(index);
  soundsByOpening(index);
  swapContainerClasses = document.getElementById("swap_container").classList;
  document.body.classList.add("overflow_hidden");
}

function showBattleStats(index) {
  document.getElementById("swap_container").innerHTML += renderBattleStatsContainer();
  for (let iStats = 0; iStats < pokemonData[index].stats.length; iStats++) {
    let statusBarFill = (maxpercentage / highestPkmnStat) * pokemonData[index].stats[iStats].base_stat;
    document.getElementById("battle_stats_datalist").innerHTML += renderBattleStats(index, iStats, statusBarFill);
  }
}

function soundsByOpening(index) {
  let audio = new Audio(pokemonData[index].cries.legacy);
  audio.volume = 0.1;
  audio.play();
}

function showPkmnMoves(index) {
  document.getElementById("swap_container").innerHTML += renderMoves(index);
  movesTypeColorFilter();
}

function movesTypeColorFilter() {
  const moveList = document.querySelectorAll(".move_backgr_color li");
  moveList.forEach((item) => {
    let movesHtmlName = item.lastChild.data;
    let imgSource = item.querySelector("img");
    for (let i = 0; i < Object.keys(movesData).length; i++) {
      if (movesHtmlName === movesData[i].name) {
        let colorTypeMove = movesData[i].type.name;
        let movesColor = typeColors[colorTypeMove];
        item.style.setProperty("--move_type_color", movesColor);
        imgSource.src = "assets/moves_images/" + movesData[i].type.name + ".webp";
      }
    }
  });
}

/* Evolution Chain Functions Start */

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
  document.getElementById("swap_container").innerHTML = "";
  for (let i = 0; i < pokemonEvolutionChain.length; i++) {
    let nrPkmnImg = indexFinder(pokemonEvolutionChain[i]);
    document.getElementById("swap_container").innerHTML += renderEvolutionChainImg(nrPkmnImg);
  }
  swapContainerClasses.add("evolution_chain_img_container", "pkmn_box_color");
}

function indexFinder(evolutionName) {
  for (let indexEvoToData = 0; indexEvoToData < Object.keys(pokemonData).length; indexEvoToData++) {
    if (evolutionName == pokemonData[indexEvoToData].name) return indexEvoToData;
  }
}

/* Evolution Chain Functions End */

/* Switch between Sections */

function sectionSwitch(way, pkmnIndex) {
  document.getElementById("swap_container").innerHTML = "";
  swapContainerClasses.remove("evolution_chain_img_container", "pkmn_box_color");
  if (way == "previous" && singleViewCount == 0) {
    singleViewCount = maxModulesSingleView;
  } else if (way == "next" && singleViewCount == maxModulesSingleView) {
    singleViewCount = 0;
  } else {
    if (way == "next") {
      singleViewCount++;
    } else {
      singleViewCount--;
    }
  }
  singleViewSections[singleViewCount].render(pkmnIndex);
  document.getElementById("swap_container_header").innerHTML = singleViewSections[singleViewCount].header;
}

pokemonBoxDialog.addEventListener("keydown", (e) => {
  if (e.key == "ArrowLeft") {
    sectionSwitch("previous", singleViewPkmnIndex);
  } else if (e.key == "ArrowRight") {
    sectionSwitch("next", singleViewPkmnIndex);
  }
});

pokemonBoxDialog.addEventListener("click", (e) => {
  if (e.target == pokemonBoxDialog) {
    closeDialog();
  }
});

/* Switch between Sections End */

function startobeserver() {
  let target1 = document.querySelector("footer");
  let target2 = document.querySelector(".pokedex_container").firstElementChild;
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.target === target1) {
        if (entry.isIntersecting) {
          scrollToBottomButtonvisibility.remove("visible");
        } else {
          scrollToBottomButtonvisibility.add("visible");
        }
      } else {
        if (entry.isIntersecting) {
          scrollToTopButtonvisibility.remove("visible");
        } else {
          scrollToTopButtonvisibility.add("visible");
        }
      }
    });
  });
  observer.observe(target1);
  observer.observe(target2);
}

function closeDialog() {
  pokemonBoxDialog.close();
  document.body.classList.remove("overflow_hidden");
  singleViewCount = initialsingleViewCount;
}
