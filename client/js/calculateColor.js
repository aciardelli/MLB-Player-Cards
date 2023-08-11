export function calculateColor(percentile) {
    if(percentile !== "None"){
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
    return 'rgb(255,255,255)'
  }
