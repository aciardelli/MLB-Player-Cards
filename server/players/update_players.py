import pandas as pd

def get_active_players():
    df = pd.read_csv("player_ids.csv")
    filtered_df = df[df["NFBCID"].notnull()]
    filtered_df.to_csv("active_players.csv")

get_active_players()