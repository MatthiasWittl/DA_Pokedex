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
  checkIfNotFound(inputStorage, input);
}

function checkIfNotFound(inputStorage, input) {
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
