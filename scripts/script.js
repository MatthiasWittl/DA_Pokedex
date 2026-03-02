const openMorePkmnBtn = document.getElementById("open_more_Pokemon_id").classList;
const scrollToTopButtonvisibility = document.getElementById("scroll_to_top_id").classList;
const scrollToBottomButtonvisibility = document.getElementById("scroll_to_bottom_id").classList;
const pokedexMainContainer = document.getElementById("main_container").classList;
const pokemonBoxDialog = document.getElementById("single_view_Pokemon_Dialog_Box_id");
const pokedexLoading = document.getElementById("pokedex_loader_id").classList;
const backToMainBtn = document.getElementById("back_to_main_btn").classList;
const backBtnSingleView = document.getElementById("back_btn_single_view_id").classList;
let endRenderIndex;
let observer;
let typesHTML = "";
let userscreenView;
let singleViewPkmnIndex;
let swapContainerClasses;
let renderdPokemonBoxes = 0;
let promises = [];
let promisesMoves = [];
let target1;
let target2;

function checkForLocalStorageData() {
  if (localStorage.getItem("pokemonData") == null) {
    getFirstPokemonData();
  } else if (localStorage.getItem("lastFetch") > 0) {
    differenceLastToNewFetch();
    if (differenceLastToNewFetch() >= 24) {
      getFirstPokemonData();
    } else {
      pokemonData = JSON.parse(localStorage.getItem("pokemonData"));
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
      firstLoadingChain();
  });
}

function firstLoadingChain() {
  storageLocalFirstPokemonData();
  startrender();
}

function storageLocalFirstPokemonData() {
  let dateOfFetch = new Date();
  localStorage.setItem("lastFetch", dateOfFetch.getTime());
  localStorage.setItem("pokemonData", JSON.stringify(pokemonData));
}

async function loadMorePokemon() {
  changeSearchForLoader();
  for (let index = renderdPokemonBoxes + 1; index <= endRenderIndex; index++) {
    let promise = await fetch("https://pokeapi.co/api/v2/pokemon/" + (index)).then(
      (response) => {
        if (!response.ok) {
          retryFetch("https://pokeapi.co/api/v2/pokemon/" + (index));
        }
        return response.json();
      }
    );
    pokemonData[index - 1] = { ...promise };
    loadingTicker();
  }
}

function loadingTicker() {
  loadedPkmn++;
  loadingBarAnimation();
}

function startrender() {
  document.getElementById("main_container").innerHTML = "";
  for (let index = 0; index < Object.keys(pokemonData).length; index++) {
    document.getElementById("main_container").innerHTML += renderPokemonBox(index);
    renderdPokemonBoxes++;
  }
  pokedexLoading.add("display_none");
  checkInputSearchField();
  startobeserver();
}

function renderPokemonBox(index) {
  let pokemon = pokemonData[index];
  let pkmnTypes = pokemon.types.map((t) => t.type.name);
  let styleVarSet = `--type1: ${typeColors[pokemonData[index].types[0].type.name]};`;
  if (pokemon.types[1]) {
    styleVarSet += ` --type2: ${typeColors[pokemonData[index].types[1].type.name]};`;
  }
  renderPkmnTypes(pkmnTypes);
  return renderPokemonBoxes(index, pokemon, pkmnTypes, styleVarSet);
}

function renderPkmnTypes(pkmnTypes) {
  typesHTML = pkmnTypes
    .map((name, i) => {
      return `
      <p class="background_color_by_type" style="--type-color: ${typeColors[name]};">
          ${name}
      </p>`;
    })
    .join("");
}

function loadingBarAnimation() {
  document.getElementById("loading_counter").innerHTML = loadedPkmn + " / " + endRenderIndex;
  let loadingBarfiller = (maxpercentage / endRenderIndex) * loadedPkmn;
  document.documentElement.style.setProperty("--type5", loadingBarfiller + "%");
}

function changeLoaderForSearch() {
  if (endRenderIndex < maxPokemonOnSite) {
    openMorePkmnBtn.remove("visible_hidden");
  }
  document.getElementById("header_input_search_id").innerHTML = renderSearchField();
  checkInputSearchField();
}

function changeSearchForLoader() {
  openMorePkmnBtn.add("visible_hidden");
  document.getElementById("header_input_search_id").innerHTML = renderLoadingBar();
}

async function renderMorePokemon() {
  if (renderdPokemonBoxes > calcLimitForMaxLoad) {
    return;
  } else if (renderdPokemonBoxes == calcLimitForMaxLoad) {
    endRenderIndex = maxPokemonOnSite;
    
  } else {
    endRenderIndex = renderdPokemonBoxes + moreAmountOfLoadingPokemon;
  }
  await loadMorePokemon();
  addMorePokemonBoxes();
  scrollToLastPkmnBox();
  changeLoaderForSearch();
}

function addMorePokemonBoxes() {
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
  let { colorOne, colorTwo } = dialogBoxColorSet(color);
  singleViewPkmnIndex = index;
  await getPokemonMoves(index);
  await getPokemonEvolutionChain(index);
  pokemonBoxDialog.showModal();
  pokemonBoxDialog.innerHTML = renderSingleViewPokemonBox(index, colorOne, colorTwo);
  pokemonBoxUtilities(index);
}

function dialogBoxColorSet(color) {
  let colors = color.split(",");
  let colorOne = typeColors[colors[0]];
  if (colors[1]) {
    colorTwo = typeColors[colors[1]];
  } else {
    colorTwo = "unset";
  }
  return { colorOne, colorTwo };
}

function pokemonBoxUtilities(index) {
  soundsByOpening(index);
  swapContainerClasses = document.getElementById("swap_container_id").classList;
  showBattleStats(index);
  document.body.classList.add("overflow_hidden");
  pokemonBoxDialog.focus();
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

function singleViewSwitch(direction, index) {
  let highestNrPkmnBox = calcHighestNrPkmnBox();
    if (direction === "next" && index == highestNrPkmnBox) {
      index = 0;
    } else if (direction === "previous" && index == 0) {
      index = highestNrPkmnBox;
    } else if (direction === "next") {
      index++;
    } else {
      index--;
    }
  openDialogAfterSwitch(index);
}

function calcHighestNrPkmnBox() {
  lastPkmnBoxNr = Object.keys(pokemonData).length - 1;
  return lastPkmnBoxNr;
}

function openDialogAfterSwitch(index) {
  let pkmnColor = pokemonData[index].types.map((t) => t.type.name);
  let color = pkmnColor.join(",");
  openDialogBox(index, color);
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

function startobeserver() {
  declareObserverTargets();
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      targetAndVisibilityHandler(entry);
    });
  });
  startObserverTargets();
}

function targetAndVisibilityHandler(entry) {
  if (entry.isIntersecting) {
    if (entry.target === target1) {
      scrollToBottomButtonvisibility.remove("visible");
    } else {
      scrollToTopButtonvisibility.remove("visible");
    }
  } else {
    if (entry.target === target1) {
      scrollToBottomButtonvisibility.add("visible");
    } else {
      scrollToTopButtonvisibility.add("visible");
    }
  }
}

function declareObserverTargets() {
  target1 = document.querySelector("footer");
  target2 = document.querySelector(".pokedex_container").firstElementChild;
}

function startObserverTargets() {
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
