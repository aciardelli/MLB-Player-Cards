import pybaseball
import pandas as pd
import numpy as np

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
def load_data(name):
    df = pd.read_csv('./players/active_players.csv')[['Name', 'MLBAMID', 'FangraphsID', 'Team', 'ESPN_POS']]
    df = df[df['Name'].str.lower() == name.lower()]
    # print(df.head)
    return df

def get_player_list():
    df = pd.read_csv("./players/active_players.csv")
    names = df["Name"].to_list()
    return names

##################### NEW BACKEND
def get_fangraph_batter_percentile(data, player_id):
    # gets fwar%
    sorted_data = data.sort_values("WAR", ascending=False)
    player_war = sorted_data.loc[sorted_data["IDfg"] == player_id, "WAR"].iloc[0]
    fwar_percentile = round(np.sum(sorted_data["WAR"] <= player_war) / len(sorted_data["WAR"]) * 100, 0)

    # gets wrc+%
    sorted_data = data.sort_values("wRC+", ascending=False)
    player_wrc = sorted_data.loc[sorted_data["IDfg"] == player_id, "wRC+"].iloc[0]
    wrc_percentile = round(np.sum(sorted_data["wRC+"] <= player_wrc) / len(sorted_data["wRC+"]) * 100, 0)

    return (fwar_percentile, wrc_percentile)

def fangraphs_batter_stats(fg_id):
    stats = ['BB%', 'K%', "wRC+", "WAR"]
    try:
        data = pybaseball.batting_stats(2023)
        batter_data = data.loc[data.IDfg == fg_id]
        batter_data = batter_data[stats].iloc[0]

        # Round 'K%' and 'BB%' to 3 decimal places
        batter_data['K%'] = round(batter_data['K%'], 3) * 100
        batter_data['BB%'] = round(batter_data['BB%'], 3) * 100
        
        # percentiles data
        percentiles = get_fangraph_batter_percentile(data, fg_id)
        batter_data["fwar_pct"] = percentiles[0]
        batter_data["wrc_pct"] = percentiles[1]

        return batter_data
    except:
        return pd.DataFrame(0, columns=stats)
    
def statcast_batter_stats(statcast_id):
    expected_stats = ['est_woba']
    percentile_stats = ['xwoba', 'brl', 'k_percent', 'bb_percent', 'sprint_speed', 'oaa']
    try:
        expected_data = pybaseball.statcast_batter_expected_stats(2023)
        expected_batter_data = expected_data.loc[expected_data.player_id == statcast_id]
        expected_batter_data = expected_batter_data[expected_stats].iloc[0]

        percentile_data = pybaseball.statcast_batter_percentile_ranks(2023)
        percentile_batter_data = percentile_data.loc[percentile_data.player_id == statcast_id]
        percentile_batter_data = percentile_batter_data[percentile_stats].iloc[0]

        merge_df = pd.concat([expected_batter_data, percentile_batter_data], axis=0)
        return merge_df
    except:
        data = {col: 0 for col in expected_stats + percentile_stats}
        df = pd.DataFrame(data)
        return df
    
def all_stats(player):
    # player info
    df = load_data(player)
    statcast_id = df.iloc[0, df.columns.get_loc('MLBAMID')]
    fangraphs_id = np.int64(df.iloc[0, df.columns.get_loc('FangraphsID')])
    pos = df.iloc[0, df.columns.get_loc('ESPN_POS')]
    # fangraphs_id = np.int64(fangraphs_id)

    if(pos != 'RP' or pos != 'SP'):
        # data
        fg_data = fangraphs_batter_stats(fangraphs_id)
        statcast_data = statcast_batter_stats(statcast_id)
        merge_df = pd.concat([fg_data, statcast_data], axis=0)
        merge_df['img'] = f'https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/{statcast_id}/headshot/67/current'
        
        # dictionary fixes
        stats_dict =  merge_df.to_dict()
        stats_dict['wRC'] = stats_dict.pop('wRC+')
        stats_dict['bb_rate'] = stats_dict.pop('BB%')
        stats_dict['k_rate'] = stats_dict.pop('K%')

    stats_dict['img'] = f'https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/{statcast_id}/headshot/67/current'
    return stats_dict 

########################################## OLD BACKEND

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

def fangraphs_stats1(player_id):
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
    print(statcast_id)
    print(fangraphs_id)
    print("load data works")
    statDict = statcast_percentiles(statcast_id)
    print("statcast percentiles works")
    fg_stats = fangraphs_stats1(fangraphs_id)
    print('fangraphs works')
    statDict['fwar'] = fg_stats[0]
    statDict['fwar_pct'] = fg_stats[1]
    statDict['id'] = str(statcast_id)
    return statDict


#################### testing lab batting

# pd.set_option('display.max_columns', None)
# STATCAST
# data = pybaseball.statcast_batter_exitvelo_barrels(2023) # maybe fbld or ev95plus and ev95percent

# data = pybaseball.statcast_batter_expected_stats(2023) # est_woba

# data = pybaseball.statcast_outs_above_average(2023, pos="SS")

# statcast percentages #######
# data = pybaseball.statcast_batter_percentile_ranks(2023) #xwoba, brl, k_percent, bb_percent, sprint_speed, oaa

# FANGRAPHS
# data = pybaseball.batting_stats(2023) # BB%, K%, wRC+, WAR, 

# okay so we want fWAR, wRC+, xwoba, K%, BB%, brl, oaa, drs, sprint speed

# print(data)

######################## testing lab pitching

pd.set_option('display.max_columns', None)
# STATCAST

# data = pybaseball.statcast_pitcher_percentile_ranks(2023)

# FANGRAPHS
data = pybaseball.pitching_stats(2023) # WAR, K/9, BB/9, FIP, GB%, SIERA, K-BB%, CSW%
print(data)