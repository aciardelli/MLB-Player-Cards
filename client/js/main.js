async function loadHTML() {
  const form = document.querySelector("#new-player-form");
  const input = document.querySelector(".player-input");
  const list_el = document.querySelector("#players");

  const suggestionBox = document.querySelector(`.suggestionBox`)
  const playerForm = document.querySelector(`.player-input`);
  const loadSuggestions = async () => {
    const playerNamesRequest = await fetch(`http://127.0.0.1:5000/players-list`)
    let playerNames = await playerNamesRequest.json()
    let input = playerForm.value
    let result = []
    if(input.length){
      result = playerNames.filter((names) => {
        return names.toLowerCase().substring(0,input.length).includes(input.toLowerCase())
      })
    }
    return result
  }

  const loadSuggestionBox = async () => {
    const results = await loadSuggestions();
  
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
  
  playerForm.addEventListener("keyup", function() {loadSuggestionBox()});

  const remove_all = document.querySelector(".remove-all");

  const playerCardTemplate = document.getElementById("player-card-template");

  remove_all.addEventListener("click", () => {
    console.log("Removed all");
    const players = document.querySelectorAll(".player");
    players.forEach((player) => {
      list_el.removeChild(player);
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const player = input.value;

    if (!player) {
      return;
    }

    const loadingCard = document.createElement("div");
    loadingCard.classList.add("player-loading");

    const loadingIndicator = document.createElement("div");
    loadingIndicator.classList.add("loading-indicator");

    const loadingIcon = document.createElement("img");
    loadingIcon.id = "loading-img";
    loadingIcon.src = "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif";
    loadingIcon.alt = "Loading icon";

    const loadingText = document.createElement("p");
    loadingText.textContent = "Loading...";

    loadingIndicator.appendChild(loadingIcon);
    loadingIndicator.appendChild(loadingText);
    loadingCard.appendChild(loadingIndicator);

    // Show the loading card while waiting for the player data
    list_el.appendChild(loadingCard);

    try {
      const playerStats = await getStats(player);

      list_el.removeChild(loadingCard)
      // list_el.removeChild(loadingCard);
  
      const playerCard = playerCardTemplate.content.cloneNode(true);
  
      // Find elements within the template and update their content
      const playerNameElement = playerCard.querySelector(".player-name");
      playerNameElement.innerText = player;
  
      const playerImageElement = playerCard.querySelector(".player-img")
      // playerImageElement.src = "https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/" + playerStats.id + "/headshot/67/current";
      playerImageElement.src = playerStats.img;
      playerImageElement.alt = "Image of " + player;
  
      const fwarElement = playerCard.querySelector("#fwar");
      fwarElement.innerText = `fWAR\n${playerStats.WAR}\n${playerStats.fwar_pct}%`;
      fwarElement.style.backgroundColor = calculateColor(playerStats.fwar_pct);

      const wrcElement = playerCard.querySelector("#wrc");
      wrcElement.innerText = `wRC+\n${playerStats.wRC}\n${playerStats.wrc_pct}%`;
      wrcElement.style.backgroundColor = calculateColor(playerStats.wrc_pct);
  
      const xwobaElement = playerCard.querySelector("#xwoba");
      xwobaElement.innerText = `xWOBA\n${playerStats.est_woba}\n${playerStats.xwoba}%`;
      xwobaElement.style.backgroundColor = calculateColor(playerStats.xwoba);

      const kElement = playerCard.querySelector("#k");
      kElement.innerText = `K%\n${playerStats.k_rate}\n${playerStats.k_percent}%`;
      kElement.style.backgroundColor = calculateColor(playerStats.k_percent);

      const bbElement = playerCard.querySelector("#bb");
      bbElement.innerText = `BB%\n${playerStats.bb_rate}\n${playerStats.bb_percent}%`;
      bbElement.style.backgroundColor = calculateColor(playerStats.bb_percent);

      const brlElement = playerCard.querySelector("#brl");
      brlElement.innerText = `Brl%\n${playerStats.brl}%`;
      brlElement.style.backgroundColor = calculateColor(playerStats.brl);
  
      const oaaElement = playerCard.querySelector("#oaa");
      oaaElement.innerText = `OAA\n${playerStats.oaa}%`;
      oaaElement.style.backgroundColor = calculateColor(playerStats.oaa);

      const sprintElement = playerCard.querySelector("#sprint");
      sprintElement.innerText = `Sprint Speed\n${playerStats.sprint_speed}%`;
      sprintElement.style.backgroundColor = calculateColor(playerStats.sprint_speed);
  
      const player_actions = playerCard.querySelector(".actions");
  
      const player_remove_btn = document.createElement("button");
      player_remove_btn.classList.add("remove");
      player_remove_btn.innerText = "Remove";
  
      player_actions.appendChild(player_remove_btn);
  
      player_remove_btn.addEventListener("click", () => {
        const playerDiv = player_remove_btn.closest(".player");
        list_el.removeChild(playerDiv);
        console.log("Removed")
      });
  
      list_el.appendChild(playerCard);

    } catch (error) {
      console.error(error);
      // Handle any error that occurs during loading
      list_el.removeChild(loadingCard);
      alert("Failed to load player data. Please try again.");
    }
  });
}

function calculateColor(percentile) {
  const inc = 255 / 50;
  let red, green, blue;
  if (percentile >= 50) {
    red = 255;
    green = 255 - inc * (percentile - 50);
    blue = 255 - inc * (percentile - 50);
  } else {
    blue = 255;
    green = 255 - inc * (50 - percentile);
    red = 255 - inc * (50 - percentile);
  }
  return `rgb(${red}, ${green}, ${blue})`;
}

async function getStats(player) {
  var time1 = new Date();
  let player_name = player.replace(/ /g, "-");
  const url = "http://127.0.0.1:5000/player/" + player_name;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    console.log(data);
    var time2 = new Date()
    console.log(time2 - time1)
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

window.addEventListener("load", () => {
  
  loadHTML();
});
