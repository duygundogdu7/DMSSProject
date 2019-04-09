from flask import Flask, request, jsonify
from flask_restful import Resource, Api, reqparse
import json
from pymongo import MongoClient
from pprint import pprint
import urllib
from bson import json_util, ObjectId
import operator
import random



app = Flask(__name__)
api = Api(app)
client = MongoClient('localhost', 27017)
db = client['DMSS']

parser = reqparse.RequestParser()


min_user = 3

class CreateTeams(Resource):
    def __init__(self):
        self.users = db.Users

    def get(self):
        userss = self.users.find({})
        teams = []
        members = []
        userss = list(userss)
        user_count = userss.__len__()
        team_count = int(user_count/min_user)
        while True:
            user_count = userss.__len__()
            if user_count == 0:
                break
            if user_count <= 2:
                r = 0
            else:
                r = random.randint(0,user_count-1)
            
            print(r)
            if user_count < min_user : 
                if team_count <= 2:
                    tr = 0
                else:
                    tr = random.randint(0,team_count-1)
                teams[tr].append(userss[r])
                print(teams[tr])
                userss.pop(r)
            elif  members.__len__() <= min_user:
                members.append(userss[r])
                userss.pop(r)
                if members.__len__() == min_user:
                    print("members")
                    print(members)
                    teams.append(members)
                    members = []

        print("MAL")
        for team in teams:
            print("team")
            print(team)

        '''
        for user in userss:
            members.append(user)
            count = count+1                
            if count == min_user:
                count = 0
                team_count = team_count +1
                members = []
                teams.append(members)
                member_count = member_count + min_user
        remain = user_count -member_count
        remaing = userss[-remain:]
        for rem in remaing:
            r = random.randint(0,team_count-1)
            teams[r].append(rem)

        for team in teams:
            print("team")
            print(team)
        '''



api.add_resource(CreateTeams,  '/create',  methods=['GET'])

class TaskList(Resource):
    def __init__(self):
        self.tasks = db.Tasks

    def get(self):
        user_id = request.args.get('user_id')
        tasks_of_user = self.tasks.find({"user_id": user_id})
        results = list(tasks_of_user)
        for res in results:
            del res["_id"]
        return  (jsonify(tasks=results))
           
api.add_resource(TaskList,  '/task',  methods=['GET'])

class ScoreTable(Resource):
    def __init__(self):
        self.users = db.Users

    def get(self):
        users = self.users.find({})
        newlist = sorted(users, key=lambda k: k['score'], reverse=True) 
        for res in newlist:
            del res["_id"]
        return (jsonify(scoreTable=newlist))
      
api.add_resource(ScoreTable,  '/scoreTable',  methods=['GET'])

class Profile(Resource):
    def __init__(self):
        self.users = db.Users

    def get(self):
        user_id = request.args.get('user_id')
        user = self.users.find_one({"_id": user_id})
        manager = self.users.find_one({"_id": user["manager_id"]})
        manager = manager["name"]
        friends = self.users.find({"team_id": user["team_id"]})
        friends = list(friends)
        for friend in friends:
            del friend["_id"]
        return (jsonify(score=user['score'], friends=friends, manager=manager))

api.add_resource(Profile,  '/profile' ,  methods=['GET'])

class Register(Resource):
    def __init__(self):
        self.users = db.Users
    def post(self):
        try:
            data = request.get_json()
            user = {
                "name": data['name'],
                "email": data['email'],
                "password": data['password']
            }
            db.Users.insert_one(user)
            print(user)
            return (jsonify(res="1")) 
        except Exception as e:
            print(e)
            return (jsonify(res="0"))

api.add_resource(Register,  '/register',  methods=['POST'])

class User(Resource):
    def __init__(self):
        self.users = db.Users

    def get(self):
        user_id = request.args.get('user_id')
        user = self.users.find_one({"_id": user_id})
        return (jsonify(user=user))

    def post(self):
        data = request.get_json()
        user = self.users.find_one({"email": data["email"], "password": data["password"]})
        if user is None:
            return (jsonify(res="0"))
        return (jsonify(res="1"))
      
    def delete(self, user_id):
        self.users.delete_one({"_id": user_id})


        
api.add_resource(User,  '/user/<user_id>' ,'/user', '/',  methods=['GET', 'POST'])

if __name__ == '__main__':
     app.run(host='0.0.0.0', port='8086')




