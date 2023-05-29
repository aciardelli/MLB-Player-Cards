from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/player/<player_name>")
def player_stats(player_name):
    return render_template("player_stats.html", player_name=player_name, stats=player_stats)

if __name__ == "__main__":
    app.run(debug=True)

