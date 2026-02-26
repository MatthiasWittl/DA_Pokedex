const openMorePkmnBtn = document.getElementById("open_more_Pokemon_id").classList;
const scrollToTopButtonvisibility = document.getElementById("scroll_to_top_id").classList;
const scrollToBottomButtonvisibility = document.getElementById("scroll_to_bottom_id").classList;
const pokedexMainContainer = document.getElementById("main_container").classList;
const pokemonBoxDialog = document.getElementById("single_view_Pokemon_Dialog_Box_id");
const pokedexLoading = document.getElementById("pokedex_loader_id").classList;
const backToMainBtn = document.getElementById("back_to_main_btn").classList;
const backBtnSingleView = document.getElementById("back_btn_single_view_id").classList;
let observer;
let userscreenView;
let singleViewPkmnIndex;
let swapContainerClasses;
let renderdPokemonBoxes = 0;
let promises = [];
let promisesMoves = [];
let allLoadedPkmn = "false";

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
  openMorePkmnBtn.add("visible");
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
  allLoadedPkmn = "true";
}

function checkInputSearchField() {
  const inputSearch = document.querySelector("form");
  inputSearch.addEventListener("submit", (event) => {
    userscreenView = window.scrollY;
    event.preventDefault();
    searchPokemonFromInputField();
  });
}

function searchPokemonFromInputField() {
  let inputStorage = [];
  let input = document.getElementById("header_input_search_field").value.toLowerCase();
  let inputLength = input.length;
  for (let index = 0; index < Object.keys(pokemonData).length; index++) {
    let searchPkmn = pokemonData[index].name.slice(0, inputLength);
    if (input === pokemonData[index].name || input === searchPkmn) {
      inputStorage.push(index);
    }
  }
  if (inputStorage.length == 0) {
    showToast(`Pokémon nicht gefunden.
              Bitte überprüfe deine Eingabe:
              ${input}`);
    return;
  }
    searchPokemonOutput(inputStorage);
    document.getElementById("header_input_search_field").value = "";
}

function showToast(message, duration = 2500) {
  const toast = document.getElementById("search_result_output_id");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}

function searchPokemonOutput(inputStorage) {
  document.getElementById("main_container").innerHTML = "";
  changeViewForSearchResult(inputStorage);
  for (let index = 0; index < inputStorage.length; index++) {
    document.getElementById("main_container").innerHTML += renderPokemonBox(inputStorage[index]);
  }
}

function changeViewForSearchResult(inputStorage) {
  observer.disconnect();
  scrollToBottomButtonvisibility.remove("visible");
  scrollToTopButtonvisibility.remove("visible");
  openMorePkmnBtn.add("display_none");
  backToMainBtn.add("button_highlight");
  backBtnSingleView.add("display_unset");
  if (inputStorage.length == 1) {
    pokedexMainContainer.add("justify_center");
  }
}

function renderMorePokemon() {
  let endRenderIndex;
  if (renderdPokemonBoxes > calcLimitForMaxLoad) {
    return;
  } else if (renderdPokemonBoxes == calcLimitForMaxLoad) {
    endRenderIndex = maxPokemonOnSite;
    openMorePkmnBtn.remove("visible");
  } else {
    endRenderIndex = renderdPokemonBoxes + moreAmountOfLoadingPokemon;
  }
  addmorePokemonBoxes(endRenderIndex);
  scrollToLastPkmnBox()
}

function addmorePokemonBoxes(endRenderIndex) {
  for (let index = renderdPokemonBoxes; index < endRenderIndex; index++) {
    document.getElementById("main_container").insertAdjacentHTML("beforeend", renderPokemonBox(index));
    renderdPokemonBoxes++;
  }
}

function scrollToLastPkmnBox() {
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
  openMorePkmnBtn.remove("display_none");
  backToMainBtn.remove("button_highlight");
  backBtnSingleView.remove("display_unset");
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
  soundsByOpening(index);
  swapContainerClasses = document.getElementById("swap_container_id").classList;
  showBattleStats(index);
  document.body.classList.add("overflow_hidden");
}

function showBattleStats(index) {
  changeSingleViewBtnHighlight("battle_stats_btn");
  swapContainerClasses.remove("evolution_chain_img_container", "pkmn_box_color");
  document.getElementById("swap_container_id").innerHTML = "";
  document.getElementById("swap_container_id").innerHTML += renderBattleStatsContainer();
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
  changeSingleViewBtnHighlight("pkmn_moves_btn");
  swapContainerClasses.remove("evolution_chain_img_container", "pkmn_box_color");
  document.getElementById("swap_container_id").innerHTML = "";
  document.getElementById("swap_container_id").innerHTML += renderMoves(index);
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

/* Evolution Chain Functions End */

/* Switch between Single View Pokemon */

function singleViewSwitch(direction, index) {
  if (allLoadedPkmn == "true") {
    if (direction === "next" && index == maxAmountofPokemonFromAPI) {
      index = 0;
    } else if (direction === "previous" && index == 0) {
      index = maxAmountofPokemonFromAPI;
    } else if (direction === "next") {
      index++;
    } else {
      index--;
    }

    let pkmnColor = pokemonData[index].types.map((t) => t.type.name);
    let color = pkmnColor.join(",");
    openDialogBox(index, color);
  }
}

pokemonBoxDialog.addEventListener("keydown", (e) => {
  if (e.key == "ArrowLeft") {
    singleViewSwitch("previous", singleViewPkmnIndex);
  } else if (e.key == "ArrowRight") {
    singleViewSwitch("next", singleViewPkmnIndex);
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

function changeSingleViewBtnHighlight(button) {
  document.querySelectorAll(".single_view_button_highlight").forEach((button) => {
    button.classList.remove("single_view_button_highlight");
  });
  document.getElementById(button)?.classList.add("single_view_button_highlight");
}
