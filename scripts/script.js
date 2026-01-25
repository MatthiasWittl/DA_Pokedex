const buttonvisibility = document.getElementById("open_more_Pokemon_id").classList;
const searchbarvisibility = document.getElementById("header_input_search_id").classList;
const scrollToTopButtonvisibility = document.getElementById("scroll_to_top_id").classList;
const inputSearch = document.querySelector("form");
const pokedexMainContainer = document.getElementById("main_container").classList;
const pokemonBoxDialog = document.getElementById("single_view_Pokemon_Dialog_Box_id");
let renderdPokemonBoxes = 0;
let promises = [];
let promisesMoves = [];

window.addEventListener("scroll", () => {
  if (window.scrollY < 10) {
    scrollToTopButtonvisibility.remove("visible");
  } else if (window.scrollY > 80) {
    scrollToTopButtonvisibility.add("visible");
  }
});

inputSearch.addEventListener("submit", (event) => {
  if (!inputSearch.checkValidity()) {
    return;
  }
  event.preventDefault();
  searchPokemonFromInputField();
});

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
    console.log(
      "Alle Daten sind geladen",
      (pokemonData = results.filter(({ status }) => status === "fulfilled").map(({ value }) => value)),
      storageLocalFirstPokemonData(),
      loadAllReaminingPokemon(),
      startrender()
    );
  });
}

function storageLocalFirstPokemonData() {
  let dateOfFetch = new Date();
  localStorage.setItem("lastFetch", dateOfFetch.getTime());
  localStorage.setItem("pokemonData", JSON.stringify(pokemonData));
}

function startrender() {
  document.getElementById("main_container").innerHTML = "";
  for (let index = 0; index < Object.keys(pokemonData).length; index++) {
    document.getElementById("main_container").innerHTML += renderPokemonBox(index);
    renderdPokemonBoxes++;
  }
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
  }
  buttonvisibility.add("visible");
  searchbarvisibility.add("visible");
}

function renderMorePokemon() {
  let endRenderIndex;
  if (renderdPokemonBoxes >= 145) {
    return;
  } else if (renderdPokemonBoxes == 144) {
    endRenderIndex = 151;
  } else {
    endRenderIndex = renderdPokemonBoxes + moreAmountOfLoadingPokemon;
  }
  for (let index = renderdPokemonBoxes; index < endRenderIndex; index++) {
    document.getElementById("main_container").innerHTML += renderPokemonBox(index);
    renderdPokemonBoxes++;
  }
  let viewpoint = document.querySelector(".pokemon_box:last-child");
  viewpoint.scrollIntoView({ behavior: "smooth" });
}

function scrollToTop() {
  document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  document.body.scrollTo({ top: 0, behavior: "smooth" });
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
  pokedexMainContainer.add("justify_center");
  buttonvisibility.remove("visible");
}

function backToMainSite() {
  document.getElementById("main_container").innerHTML = "";
  for (let index = 0; index < renderdPokemonBoxes; index++) {
    document.getElementById("main_container").innerHTML += renderPokemonBox(index);
  }
  pokedexMainContainer.remove("justify_center");
  buttonvisibility.add("visible");
}

async function openDialogBox(index, colorOne, colorTwo) {
    await getPokemonMoves(index);
    pokemonBoxDialog.showModal();
    pokemonBoxDialog.innerHTML = renderSingleViewPokemonBox(index, colorOne, colorTwo);
    /* filter function einfügen um die 4 Moves mit den richtigen Farben zu bekommen */
  
}


async function getPokemonMoves(index) {
  if (!movesData.length == 0) {
    for (let moveIndex = 0; moveIndex < 4; moveIndex++) {
      let moveURL = pokemonData[index].moves[moveIndex].move.url;
      let moveName = pokemonData[index].moves[moveIndex].move.name;
      for (let index = 0; index < Object.keys(movesData).length; index++) {
        if (moveName === movesData[index].name) {
          console.log("Move schon vorhanden", movesData[index]);
          break;
        } else if (index === Object.keys(movesData).length - 1) {
          let promise = await fetch(moveURL).then((response) => {
            if (!response.ok) {
              retryFetch(moveURL);
            }
            return response.json();
          });
          movesData[Object.keys(movesData).length] = {...promise};
          return true;  
        }
      }
    };
  } else {
    for (let moveIndex = 0; moveIndex < 4; moveIndex++) {
      let moveURL = pokemonData[index].moves[moveIndex].move.url;
      let promise = fetch(moveURL).then((response) => {
        if (!response.ok) {
          retryFetch(moveURL);
        }
        return response.json();
      });
      promisesMoves.push(promise);
    }
    let results = await Promise.allSettled(promisesMoves)
    movesData = results.filter(({ status }) => status === "fulfilled").map(({ value }) => value)
    }; return true;
    
    
  }


/* bei erstellen der Moves von PokemonData nehmen. Die Farben der Moves im nachgang anpassen da mit filter
der index von movesData nicht mehr mit dem index von PokemonData übereinstimmt.  */