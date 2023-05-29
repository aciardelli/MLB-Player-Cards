# from pybaseball import statcast_batter_percentile_ranks
import pybaseball
import pandas as pd

# Set the display options to show all columns without truncation
pd.set_option('display.max_columns', None)
pd.set_option('display.expand_frame_repr', False)

# this is for batters
data = pybaseball.statcast_batter_percentile_ranks(2023)
#batter_data = data.loc[data.player_name == "Wander Franco"]
# df = pd.DataFrame(data)
# print(df)
#print(batter_data)

# player_name, player_id, year, xwoba, xba, xslg, xiso, xobp, brl, brl_percent, exit_velocity, hard_hit_percent, k_percent, bb_percent
# whiff_percent, sprint_speed, oaa

# want:
# xwoba, brl_percent, exit_velocity, hard_hit_percent, k_percent, bb_percent, whiff_percent, sprint_speed, oaa

def statcast_percentiles(player):
    batter_data = data.loc[data.player_name == player]
    columns = ["xwoba", "brl_percent", "exit_velocity", 'hard_hit_percent', 'k_percent', 'bb_percent', 'whiff_percent', 'sprint_speed', 'oaa']
    my_batter_data = batter_data.iloc[0][columns]
    return my_batter_data