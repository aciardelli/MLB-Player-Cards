function createPlayerDiv(player){
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

    // stat-box div
    const player_statbox1_el = document.createElement("div");
    player_statbox1_el.classList.add("stat-box");

    const player_statbox2_el = document.createElement("div");
    player_statbox2_el.classList.add("stat-box");

    // avg p
    const player_avg_el = document.createElement("p");
    player_avg_el.classList.add("avg");
    player_avg_el.innerText = "Avg";

    // avg-val p
    const player_avg_val = document.createElement("p");
    player_avg_val.classList.add("avg-val");
    player_avg_val.innerText = ".300";

    // ops p
    const player_ops_el = document.createElement("p");
    player_ops_el.classList.add("ops");
    player_ops_el.innerText = "OPS";

    // ops-val p
    const player_ops_val = document.createElement("p");
    player_ops_val.classList.add("ops-val");
    player_ops_val.innerText = ".800";

    // actions (buttons)
    const player_actions_el = document.createElement("div")
    player_actions_el.classList.add("actions")

    const player_remove_btn = document.createElement("button")
    player_remove_btn.classList.add("remove")

    // adds remove button to actions
    player_actions_el.appendChild(player_remove_btn)

    // adding avg to statbox1
    player_statbox1_el.appendChild(player_avg_el);
    player_statbox1_el.appendChild(player_avg_val);

    // adding ops and ops val to statbox2
    player_statbox2_el.appendChild(player_ops_el);
    player_statbox2_el.appendChild(player_ops_val);

    // add both statboxes to stats
    player_stats_el.appendChild(player_statbox1_el);
    player_stats_el.appendChild(player_statbox2_el);

    // adds player name to content
    player_content_el.appendChild(player_name_el);

    // adds stats to content
    player_content_el.appendChild(player_stats_el);

    // adds content to player
    player_el.appendChild(player_content_el);

    // adds remove btn to player
    player_el.appendChild(player_actions_el)

    const list_el = document.getElementById("players");
    list_el.appendChild(player_el);
}

function getStats(){
    fetch('https://api.example.com/data')
    .then(response => {
    if (!response.ok) {
      throw new Error('Request failed');
    }
    return response.json();
    })
    .then(data => {
    // Process the response data
    console.log(data);
    })
    .catch(error => {
    // Handle any errors
    console.error(error);
    });
}

window.addEventListener('load', () => {
    const form = document.querySelector('#new-player-form')
    const input = document.querySelector('.player-input')
    const list_el = document.querySelector('#players')

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const player = input.value;

        if (!player){
            alert("Please enter a player")
            return
        }
        
        createPlayerDiv(player)

    })

})