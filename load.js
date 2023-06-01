function fetchPlayerData() {
    var playerName = "Replace with the player's name"; // Replace with the actual player name from the URL or data

    var url = 'http://127.0.0.1:5000/player/' + playerName;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            generatePlayerCard(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Function to generate the player card dynamically
function generatePlayerCard(playerData) {
    var playerCardDiv = document.getElementById("playerCard");

    // Create elements to display player stats
    var bbPercent = document.createElement("p");
    bbPercent.textContent = "BB Percent: " + playerData.bb_percent;

    var brlPercent = document.createElement("p");
    brlPercent.textContent = "BRL Percent: " + playerData.brl_percent;

    // Repeat the above process for other player stats

    // Append the player stats to the player card div
    playerCardDiv.appendChild(bbPercent);
    playerCardDiv.appendChild(brlPercent);

    // Repeat the above process for other player stats

}

// Call the fetchPlayerData function when the page loads
window.addEventListener("load", fetchPlayerData);