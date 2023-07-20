import pybaseball
from pymongo.mongo_client import MongoClient
from datetime import date, timedelta
import os
from dotenv import load_dotenv

load_dotenv()

mongopass = os.getenv("MONGODB_PASSWORD")
CURRENT_DATE = str(date.today())

uri = f"mongodb+srv://anthciardelli:{mongopass}@mlb-standings.onjc4lo.mongodb.net/?retryWrites=true&w=majority"
# Create a new client and connect to the server
client = MongoClient(uri)
mydb = client["MLB-Standings"]
mycol = mydb["Standings"]

def insert_data(col):
    try:

        data = pybaseball.standings()
        standings = {}

        data = pybaseball.standings()

        divisions = ["ALE", "ALC", "ALW", "NLE", "NLC", "NLW"]
        all_standings = {}
        for i in range(6):
            all_standings[divisions[i]] = data[i].to_dict()


        for division, division_data in all_standings.items():
            standings[division] = {}
            for team_id, team_name in division_data["Tm"].items():
                standings[division][team_name] = {
                    "W": division_data["W"][team_id],
                    "L": division_data["L"][team_id],
                    "W-L%": division_data["W-L%"][team_id],
                    "GB": division_data["GB"][team_id]
                }
        standings["NLC"]["St Louis Cardinals"] = standings["NLC"].pop("St. Louis Cardinals")
        standings["Date"] = CURRENT_DATE
        x = col.insert_one(standings)
        print("Data successfully added")
    except Exception as e:
        print(e)

# insert_data(mycol)
def delete_data(col, date):
    try:
        cursor = col.find()
        for c in cursor:
            if c["Date"] == date:
                col.delete_one(c)
        print("Data successfully deleted")
    except Exception as e:
        print(e)

def run_daily(col, date):
    try:
        cursor = col.find()
        for c in cursor:
            if c["Date"] == date:
                raise Exception("Standings have already been added for today") 
        insert_data(col)
    except Exception as e:
        print(e)

# delete_data(mycol, CURRENT_DATE)
run_daily(mycol, CURRENT_DATE)