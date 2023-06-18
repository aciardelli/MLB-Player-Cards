import pybaseball
import pandas as pd
import numpy as np

# player_name, player_id, year, xwoba, xba, xslg, xiso, xobp, brl, brl_percent, exit_velocity, hard_hit_percent, k_percent, bb_percent
# whiff_percent, sprint_speed, oaa

# want:
# xwoba, brl_percent, exit_velocity, hard_hit_percent, k_percent, bb_percent, whiff_percent, sprint_speed, oaa

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
    statDict = statcast_percentiles(player)
    fg_stats = fangraphs_stats(player)
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

print(standings_stats("NLE"))