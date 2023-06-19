from flask import Flask, request, jsonify
from flask_cors import CORS
from data import *

app = Flask(__name__)
CORS(app)

@app.route("/player/<string:player_name>", methods=["GET"])
def playerData(player_name):
    player_name = player_name.replace("-"," ")
    data = merge_stats(player_name)
    return jsonify(data)

@app.route("/standings/<string:league>", methods=["GET"])
def getStandings(league):
    data = standings_stats(league)
    return data

if __name__ == "__main__":
    app.run(debug=True, port=5000)

