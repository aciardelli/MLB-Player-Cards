import { handleFormSubmission } from './formSubmission.js';
import { getPlayers, loadSuggestionBox } from './suggestionBox.js';

async function loadHTML() {
  // suggestion box
  const suggestionBox = document.querySelector(`.suggestionBox`)
  const playerForm = document.querySelector(`.player-input`);
  
  const playerNames = await getPlayers();
  playerForm.addEventListener("keyup", function() {loadSuggestionBox(playerForm, suggestionBox, playerNames)});

  // remove all
  const remove_all = document.querySelector(".remove-all");

  remove_all.addEventListener("click", () => {
    console.log("Removed all");
    const players = document.querySelectorAll(".player");
    players.forEach((player) => {
      list_el.removeChild(player);
    });
  });
  
  // form submission
  const form = document.querySelector("#new-player-form");
  const input = document.querySelector(".player-input");
  const list_el = document.querySelector("#players");
  handleFormSubmission(form, input, list_el)
}

window.addEventListener("load", () => {
  loadHTML();
});
