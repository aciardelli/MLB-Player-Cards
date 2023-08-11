from flask import Flask, request, jsonify
from flask_cors import CORS
from data import *
from standings_database import get_standings

app = Flask(__name__)
CORS(app)

@app.route("/player/<string:player_name>", methods=["GET"])
def playerData(player_name):
    player_name = player_name.replace("-"," ")
    # data = merge_stats(player_name)
    data = all_stats(player_name)
    return jsonify(data)

@app.route("/standings/<string:league>", methods=["GET"])
def getStandings(league):
    data = get_standings(league)
    return data

@app.route("/players-list", methods=["GET"])
def getPlayerList():
    return get_player_list()

if __name__ == "__main__":
    app.run(debug=True, port=5000)

