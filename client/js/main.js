async function loadHTML() {
  const form = document.querySelector("#new-player-form");
  const input = document.querySelector(".player-input");
  const list_el = document.querySelector("#players");

  const remove_all = document.querySelector(".remove-all");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const player = input.value;

    if (!player) {
      return;
    }
    /*
        <!-- <div class="player">

                <div class="content">

                    <p class="player-name">Joe Random</p>
                    <div class = "stats">
                        <div class="stat-box">
                            <p class="avg">Avg</p><br>
                            <p class="avg-val">.300</p>
                        </div>
                        <div class="stat-box">
                            <p class="ops">OPS</p><br>
                            <p class="ops-val">.850</p>
                        </div>
                    </div>
                </div>
                <div class="actions">
                    <button class="remove">Remove</button>
                </div>

            </div> -->
    */
    const playerStats = await getStats(player);
    // player div
    const player_el = document.createElement("div");
    player_el.classList.add("player");

    // content div
    const player_content_el = document.createElement("div");
    player_content_el.classList.add("content");

    // player-name div
    const player_name_el = document.createElement("p");
    player_name_el.classList.add("player-name");
    player_name_el.innerText = player;

    // stats div
    const player_stats_el = document.createElement("div");
    player_stats_el.classList.add("stats");

    // player pic div
    const player_img_el = document.createElement("img");
    player_img_el.classList.add("player-img");
    player_img_el.src = "../pictures/blank_headshot.jpeg";
    player_img_el.alt = "Image of " + player;

    // stat-box div
    const player_statbox1_el = document.createElement("div");
    player_statbox1_el.classList.add("stat-box");

    const player_statbox2_el = document.createElement("div");
    player_statbox2_el.classList.add("stat-box");

    const player_statbox3_el = document.createElement("div");
    player_statbox3_el.classList.add("stat-box");

    // fWar p
    const player_fwar_el = document.createElement("p");
    player_fwar_el.classList.add("fwar");
    player_fwar_el.innerText = "fWAR\n" + playerStats.fwar;

    // fWar % p
    const player_fwar_pct = document.createElement("p");
    player_fwar_pct.classList.add("fwar");
    player_fwar_pct.innerText = playerStats.fwar_pct + "%";
    player_statbox1_el.style.backgroundColor = calculateColor(
      playerStats.fwar_pct
    );

    // xWOBA p
    const player_xwoba_el = document.createElement("p");
    player_xwoba_el.classList.add("xwoba");
    player_xwoba_el.innerText = "xWOBA\n" + playerStats.xwoba + "%";
    player_statbox2_el.style.backgroundColor = calculateColor(
      playerStats.xwoba
    );
    console.log(calculateColor(playerStats.xwoba));

    // oaa p
    const player_oaa_el = document.createElement("p");
    player_oaa_el.classList.add("oaa");
    player_oaa_el.innerText = "OAA\n" + playerStats.oaa + "%";
    player_statbox3_el.style.backgroundColor = calculateColor(playerStats.oaa);
    console.log(calculateColor(playerStats.oaa));

    // actions (buttons)
    const player_actions_el = document.createElement("div");
    player_actions_el.classList.add("actions");

    const player_remove_btn = document.createElement("button");
    player_remove_btn.classList.add("remove");
    player_remove_btn.innerText = "Remove";

    // adds remove button to actions
    player_actions_el.appendChild(player_remove_btn);

    //adding fwar to statbox1
    player_statbox1_el.appendChild(player_fwar_el);
    player_statbox1_el.appendChild(player_fwar_pct);

    // adding xwoba to statbox2
    player_statbox2_el.appendChild(player_xwoba_el);

    // adding oaa to statbox3
    player_statbox3_el.appendChild(player_oaa_el);

    // add statboxes to stats
    player_stats_el.appendChild(player_img_el);
    player_stats_el.appendChild(player_statbox1_el);
    player_stats_el.appendChild(player_statbox2_el);
    player_stats_el.appendChild(player_statbox3_el);

    // adds player name to content
    player_content_el.appendChild(player_name_el);

    // adds stats to content
    player_content_el.appendChild(player_stats_el);

    // adds content to player
    player_el.appendChild(player_content_el);

    // adds remove btn to player
    player_el.appendChild(player_actions_el);

    list_el.appendChild(player_el);

    player_remove_btn.addEventListener("click", () => {
      list_el.removeChild(player_el);
    });

    remove_all.addEventListener("click", () => {
      console.log("Submit button clicked!");
      const players = document.querySelectorAll(".player");
      players.forEach((player) => {
        list_el.removeChild(player);
      });
    });
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
  let player_name = player.replace(/ /g, "-");
  const url = "http://127.0.0.1:5000/player/" + player_name;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

window.addEventListener("load", () => {
  loadHTML();
});
