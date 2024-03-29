import pybaseball
from pymongo.mongo_client import MongoClient
import datetime
import os
from dotenv import load_dotenv

load_dotenv()

mongopass = os.getenv("MONGODB_PASSWORD")
CURRENT_DATE = str(datetime.date.today())
now = datetime.datetime.now()
CURRENT_TIME = str(now.time())

uri = f"mongodb+srv://anthciardelli:{mongopass}@mlb-standings.onjc4lo.mongodb.net/?retryWrites=true&w=majority"
# Create a new client and connect to the server
client = MongoClient(uri)
mydb = client["MLB-Standings"]
mycol = mydb["Standings"]

def insert_data():
    try:
        standings = {}
        order = []
        data = pybaseball.standings()

        divisions = ["ALE", "ALC", "ALW", "NLE", "NLC", "NLW"]
        all_standings = {}
        for i in range(6):
            all_standings[divisions[i]] = data[i].to_dict()

        for division, division_data in all_standings.items():
            standings[division] = {}
            order = []
            for team_id, team_name in division_data["Tm"].items():
                standings[division][team_name] = {
                    "W": division_data["W"][team_id],
                    "L": division_data["L"][team_id],
                    "W-L%": division_data["W-L%"][team_id],
                    "GB": division_data["GB"][team_id]
                }
                if team_name == "St. Louis Cardinals":
                    team_name == "St Louis Cardinals"
                order.append(team_name)
                standings[division]["Order"] = order
        # standings["NLC"]["St Louis Cardinals"] = standings["NLC"].pop("St. Louis Cardinals")
        standings["Date"] = CURRENT_DATE
        standings["Time"] = CURRENT_TIME
        x = mycol.insert_one(standings)
        print("Data successfully added")
    except Exception as e:
        print(e)

# insert_data(mycol)
def delete_data(date):
    try:
        cursor = mycol.find()
        for c in cursor:
            if c["Date"] == date:
                mycol.delete_one(c)
        print("Data successfully deleted")
    except Exception as e:
        print(e)

def run_daily(date):
    file = open(r'C:\Users\Anthony\GitHub\MLB-Player-Cards\server\logs\standings_log.txt', 'a')
    try:
        cursor = mycol.find()
        for c in cursor:
            if c["Date"] == date:
                raise Exception("Standings have already been added for today") 
        insert_data()
        file.write(f'{datetime.datetime.now()} - The script successfully ran\n')
    except Exception as e:
        file.write(f'{datetime.datetime.now()} - The script did not run - Error message: {e}\n')
        print(e)

def get_standings(league):
    try:
        cursor = mycol.find()
        for c in cursor:
            if c["Date"] == CURRENT_DATE:
                return c[league]
        raise Exception("No standings for that date exist")
    except Exception as e:
        print(e)
            
run_daily(CURRENT_DATE)