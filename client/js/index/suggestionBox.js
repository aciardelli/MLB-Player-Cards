
export async function getPlayers() {
    const playerNamesRequest = await fetch(`http://127.0.0.1:5000/players-list`)
    let playerNames = await playerNamesRequest.json()
    return playerNames
}

export function loadSuggestions(playerForm, playerNames){
    let input = playerForm.value
    let result = []
    if(input.length){
      result = playerNames.filter((names) => {
        return names.toLowerCase().substring(0,input.length).includes(input.toLowerCase())
      })
    }
    return result
}

export async function loadSuggestionBox(playerForm, suggestionBox, playerNames) {
    const results = await loadSuggestions(playerForm, playerNames);
  
    // Use slice to get the first 5 items
    const firstFiveResults = results.slice(0, 5);
  
    const html = firstFiveResults.map((name) => {
      return `<div class="suggestionItem">${name}</div>`;
    });
  
    suggestionBox.innerHTML = html.join(""); // Join the array of HTML strings into a single string
  
    const suggestionItems = suggestionBox.querySelectorAll(".suggestionItem");
  
    // Add click event listener to each suggestionItem
    suggestionItems.forEach((item) => {
      item.addEventListener("click", () => {
        playerForm.value = item.innerHTML; // Submit the form when the suggestionItem is clicked
        suggestionBox.innerHTML = '';
      });
    });
  };