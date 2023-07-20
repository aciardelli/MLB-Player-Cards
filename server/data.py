import pybaseball
import pandas as pd
import numpy as np
import difflib
# player_name, player_id, year, xwoba, xba, xslg, xiso, xobp, brl, brl_percent, exit_velocity, hard_hit_percent, k_percent, bb_percent
# whiff_percent, sprint_speed, oaa

# want:
# xwoba, brl_percent, exit_velocity, hard_hit_percent, k_percent, bb_percent, whiff_percent, sprint_speed, oaa

# player search
def closest_player(player):
    fangraphs_players = pybaseball.batting_stats(2023, qual = 100)["Name"]
    statcast_players = pybaseball.statcast_batter_percentile_ranks(2023)["player_name"]
    fangraphs_closest = difflib.get_close_matches(player, fangraphs_players)
    statcast_closest = difflib.get_close_matches(player, statcast_players)
    return [fangraphs_closest[0], statcast_closest[0]]

def statcast_percentiles(player):
    data = pybaseball.statcast_batter_percentile_ranks(2023)
    batter_data = data.loc[data.player_name == player]
    # columns = ["xwoba", "brl_percent", "exit_velocity", 'hard_hit_percent', 'k_percent', 'bb_percent', 'whiff_percent', 'sprint_speed', 'oaa']
    columns = ["xwoba", 'oaa']
    my_batter_data = batter_data[columns].iloc[0]
    return my_batter_data.to_dict()

def fangraphs_stats(player):
    data = pybaseball.batting_stats(2023)
    batter_data = data.loc[data.Name == player]
    my_batter_data = batter_data["WAR"].iloc[0]
    batter_pct = get_player_percentile(data, player)
    return my_batter_data, batter_pct


def get_player_percentile(data, player):
    sorted_data = data.sort_values("WAR", ascending=False)
    player_war = sorted_data.loc[sorted_data["Name"] == player, "WAR"].iloc[0]
    percentile = np.sum(sorted_data["WAR"] <= player_war) / len(sorted_data["WAR"]) * 100
    return round(percentile, 0)

def merge_stats(player):
    player_fangraphs, player_statcast = closest_player(player)

    statDict = statcast_percentiles(player_statcast)
    fg_stats = fangraphs_stats(player_fangraphs)
    statDict['fwar'] = fg_stats[0]
    statDict['fwar_pct'] = fg_stats[1]
    print(statDict)
    return statDict

#### standings

def standings_stats(league):
    leagues = {"ALE":0, "ALC":1, "ALW":2, "NLE":3, "NLC":4, "NLW":5}
    my_league = leagues[league]
    data = pybaseball.standings()
    my_data = data[my_league]
    return my_data.to_dict()