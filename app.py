from flask import Flask, render_template
from stats import statcast_percentiles

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/player/<player_name>")
def player_stats(player_name):
    data = statcast_percentiles(player_name)
    return render_template("player_stats.html", player_name=player_name, stats=data)

if __name__ == "__main__":
    app.run(debug=True)

