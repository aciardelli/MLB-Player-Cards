from flask import Flask, request, jsonify
from flask_cors import CORS
import pybaseball
import pandas as pd

# player_name, player_id, year, xwoba, xba, xslg, xiso, xobp, brl, brl_percent, exit_velocity, hard_hit_percent, k_percent, bb_percent
# whiff_percent, sprint_speed, oaa

# want:
# xwoba, brl_percent, exit_velocity, hard_hit_percent, k_percent, bb_percent, whiff_percent, sprint_speed, oaa

def statcast_percentiles(player):
    data = pybaseball.statcast_batter_percentile_ranks(2023)
    batter_data = data.loc[data.player_name == player]
    columns = ["xwoba", "brl_percent", "exit_velocity", 'hard_hit_percent', 'k_percent', 'bb_percent', 'whiff_percent', 'sprint_speed', 'oaa']
    my_batter_data = batter_data[columns].iloc[0]
    return my_batter_data.to_dict()

app = Flask(__name__)
CORS(app)

@app.route("/player/<string:player_name>", methods=["GET"])
def playerData(player_name):
    player_name = player_name.replace("-"," ")
    data = statcast_percentiles(player_name)
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)

