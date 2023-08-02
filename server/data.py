import pybaseball
import pandas as pd
import numpy as np
import difflib

# player_name, player_id, year, xwoba, xba, xslg, xiso, xobp, brl, brl_percent, exit_velocity, hard_hit_percent, k_percent, bb_percent
# whiff_percent, sprint_speed, oaa

# want:
# xwoba, brl_percent, exit_velocity, hard_hit_percent, k_percent, bb_percent, whiff_percent, sprint_speed, oaa

# TESTING
# pd.set_option('display.max_columns', None)
# print(pybaseball.statcast_batter_percentile_ranks(2023))
# print(pybaseball.statcast_batter_expected_stats(2023))
# print(pybaseball.statcast_batter_exitvelo_barrels(2023))
# print(pybaseball.statcast_fielding.statcast_outs_above_average(2023, 'SS'))


# player searches ####################################################
def closest_player(player):
    fangraphs_players = pybaseball.batting_stats(2023, qual = 100)["Name"]
    statcast_players = pybaseball.statcast_batter_percentile_ranks(2023)["player_name"]
    fangraphs_closest = difflib.get_close_matches(player, fangraphs_players)
    statcast_closest = difflib.get_close_matches(player, statcast_players)
    return [fangraphs_closest[0], statcast_closest[0]]

def find_player_id(player):
    last = player.split(' ')[1:][0]
    first = player.split(' ')[0]
    print(last)
    print(first)
    player_id = pybaseball.playerid_lookup(last, first).loc[0, 'key_mlbam']
    return player_id

def load_data(name):
    df = pd.read_csv('player_ids.csv')[['Name', 'MLBAMID', 'FangraphsID', 'Team', 'ESPN_POS']]
    df = df[df['Name'].str.lower() == name.lower()]
    # print(df.head)
    return df

#############################################################

def statcast_percentiles(player_id):
    data = pybaseball.statcast_batter_percentile_ranks(2023)
    batter_data = data.loc[data.player_id == player_id]
    # columns = ["xwoba", "brl_percent", "exit_velocity", 'hard_hit_percent', 'k_percent', 'bb_percent', 'whiff_percent', 'sprint_speed', 'oaa']
    columns = ["xwoba", 'oaa']
    my_batter_data = batter_data[columns].iloc[0]
    return my_batter_data.to_dict()

def get_player_percentile(data, player_id):
    sorted_data = data.sort_values("WAR", ascending=False)
    # print(sorted_data)
    player_war = sorted_data.loc[sorted_data["IDfg"] == player_id, "WAR"].iloc[0]
    percentile = np.sum(sorted_data["WAR"] <= player_war) / len(sorted_data["WAR"]) * 100
    return round(percentile, 0)

def fangraphs_stats(player_id):
    data = pybaseball.batting_stats(2023)
    player_id = int(player_id)
    batter_data = data[data.IDfg == player_id]
    my_batter_data = batter_data["WAR"].iloc[0]
    batter_pct = get_player_percentile(data, player_id)
    return my_batter_data, batter_pct

def merge_stats(player):
    # player_fangraphs, player_statcast = closest_player(player)
    df = load_data(player)
    statcast_id = df.iloc[0, df.columns.get_loc('MLBAMID')]
    fangraphs_id = df.iloc[0, df.columns.get_loc('FangraphsID')]
    print("load data works")
    statDict = statcast_percentiles(statcast_id)
    print("statcast percentiles works")
    fg_stats = fangraphs_stats(fangraphs_id)
    print('fangraphs works')
    statDict['fwar'] = fg_stats[0]
    statDict['fwar_pct'] = fg_stats[1]
    statDict['id'] = str(statcast_id)
    return statDict

#### standings

def standings_stats(league):
    leagues = {"ALE":0, "ALC":1, "ALW":2, "NLE":3, "NLC":4, "NLW":5}
    my_league = leagues[league]
    data = pybaseball.standings()
    my_data = data[my_league]
    return my_data.to_dict()