async function loadHTML() {
  const form = document.querySelector("#new-player-form");
  const input = document.querySelector(".player-input");
  const list_el = document.querySelector("#players");

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
      playerImageElement.src = "https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/" + playerStats.id + "/headshot/67/current";
      playerImageElement.alt = "Image of " + player;
  
      const fwarElement = playerCard.querySelector("#fwar");
      fwarElement.innerText = `fWAR\n${playerStats.fwar}`;
      fwarElement.style.backgroundColor = calculateColor(playerStats.fwar_pct);
  
      const xwobaElement = playerCard.querySelector("#xwoba");
      xwobaElement.innerText = `xWOBA\n${playerStats.xwoba}%`;
      xwobaElement.style.backgroundColor = calculateColor(playerStats.xwoba);
  
      const oaaElement = playerCard.querySelector("#oaa");
      oaaElement.innerText = `OAA\n${playerStats.oaa}%`;
      oaaElement.style.backgroundColor = calculateColor(playerStats.oaa);
  
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
