export async function getStats(player) {
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