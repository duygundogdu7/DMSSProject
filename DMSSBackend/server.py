from flask import Flask, request, jsonify, make_response
from flask_restful import Resource, Api, reqparse
import json
from pymongo import MongoClient
from pprint import pprint
import urllib
from bson import json_util, ObjectId
import operator
import random
import uuid
import http
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import confusion_matrix
from sklearn.metrics import classification_report
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
import base64
import csv
import pandas as pd


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
        atanan = 0
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
            if user_count < min_user and atanan == 0 : 
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
                atanan=atanan+1
                if members.__len__() == min_user:
                    teams.append(members)
                    members = []
                    atanan=0
        for team in teams:
            tid = uuid.uuid4()
            tr = random.randint(0,team.__len__())
            manager = team[tr]
            while manager["is_manager"]:
                tr = random.randint(0,team.__len__())
                manager = team[tr]
            team.pop(tr)
            for member in team:
                db.Users.update_one({"_id": member["_id"]},{"$set": {"team_id":tid,"is_manager":False,"manager_id": manager["_id"]}})
            db.Users.update_one({"_id": manager["_id"]},{"$set": {"team_id":tid ,"is_manager":True,"manager_id": ""}})

api.add_resource(CreateTeams,  '/create',  methods=['GET'])

class TaskList(Resource):
    def __init__(self):
        self.tasks = db.Tasks

    def get(self):
        user_id = request.args.get('user_id')
        tasks_of_user = self.tasks.find({"user_id": user_id, "is_complete":False})
        results = list(tasks_of_user)
        for res in results:
            res["id"] = str(res["_id"])
            del res["_id"]
        return  (jsonify(tasks=results))
           
api.add_resource(TaskList,  '/taskList',  methods=['GET'])


class ManagerTaskList(Resource):
    def __init__(self):
        self.tasks = db.Tasks

    def get(self):
        user_id = request.args.get('user_id')
        tasks_of_user = self.tasks.find({"manager_id": user_id, "is_complete":True, "is_approved":False})
        results = list(tasks_of_user)
        for res in results:
            res["id"] = str(res["_id"])
            del res["_id"]
        return  (jsonify(tasks=results))
           
api.add_resource(ManagerTaskList,  '/managerTaskList',  methods=['GET'])

class UpdateTask(Resource):
    def __init__(self):
        pass

    def post(self):
        try:
            data = request.get_json()
            print(data)
            db.Tasks.update_one({"_id": ObjectId(data['id'])},{"$set": {"title":data['title'],"date":data['date'],"type":data['type']}})
            return (jsonify(res="1")) 
        except Exception as e:
            print(e)
            return (jsonify(res="0"))

    def delete(self):
        try:
            data = request.get_json()
            print(data)
            db.Tasks.delete_one({"_id": ObjectId(data['id'])})
            return '',http.HTTPStatus.OK
        except Exception as e:
            print(e)
            return '',http.HTTPStatus.NO_CONTENT

           
api.add_resource(UpdateTask,  '/updateTask',  methods=['POST','DELETE'])

class CompleteTask(Resource):
    def __init__(self):
        pass

    def post(self):
        try:
            data = request.get_json()
            print(data)
            db.Tasks.update_one({"_id": ObjectId(data['id'])},{"$set": {"is_complete":True}})
            return '',http.HTTPStatus.OK
        except Exception as e:
            print(e)
            return '',http.HTTPStatus.NO_CONTENT

           
api.add_resource(CompleteTask,  '/completeTask',  methods=['POST'])

class ApproveTask(Resource):
    def __init__(self):
        pass

    def post(self):
        try:
            data = request.get_json()
            print(data)
            db.Tasks.update_one({"_id": ObjectId(data['id'])},{"$set": {"is_approved":True}})
            return '',http.HTTPStatus.OK
        except Exception as e:
            print(e)
            return '',http.HTTPStatus.NO_CONTENT

           
api.add_resource(ApproveTask,  '/approveTask',  methods=['POST'])

class Task(Resource):
    def __init__(self):
        self.tasks = db.Tasks

    def get(self):
        id = request.args.get('id')
        task = self.tasks.find({"_id": id})
        del task["_id"]
        return  (jsonify(tasks=task))

    def post(self):
        try:
            data = request.get_json()
            task = {
                #TODO: add the more properties of task
                "user_id": data['user_id'],
                "title": data['title'],
                "date": data['date'],
                "type": data['type'],
                "is_complete":False,
                "is_approved":False
            }
            db.Tasks.insert_one(task)
            print(task)
            return '',http.HTTPStatus.OK
        except Exception as e:
            print(e)
            return '',http.HTTPStatus.NO_CONTENT
           
api.add_resource(Task,  '/task',  methods=['GET','POST'])

class ScoreTable(Resource):
    def __init__(self):
        self.users = db.Users

    def get(self):
        users = self.users.find({})
        newList = sorted(users, key=lambda k: k['score'], reverse=True) 
        for res in newList:
            del res["_id"]
            if res["is_manager"]:
                newList.remove(res)

        return (jsonify(scoreTable=newList))
      
api.add_resource(ScoreTable,  '/scoreTable',  methods=['GET'])

class Profile(Resource):
    def __init__(self):
        self.users = db.Users

    def get(self):
        user_id = request.args.get('user_id')
        user = self.users.find_one({"_id": user_id})
        print(user)
        manager = self.users.find_one({"_id": user["manager_id"]})
        manager = manager["name"]
        friends = self.users.find({"team_id": user["team_id"]})
        friends = list(friends)
        newList = sorted(friends, key=lambda k: k['score'], reverse=True) 
        for friend in newList:
            del friend["_id"]
            if friend["is_manager"]:
                newList.remove(friend)
        return (jsonify(score=user['score'], friends=newList, manager=manager, name=user['name'], id=user["_id"]))

api.add_resource(Profile,  '/profile' ,  methods=['GET'])

class Register(Resource):
    def __init__(self):
        self.users = db.Users
    def post(self):
        try:
            data = request.get_json()
            print(data)
            user = {
                "name": data['name'],
                "surname": data['surname'],
                "email": data['email'],
                "password": data['password'],
                "score": "0",
                "admin": False
            }
            db.Users.insert_one(user)
            print(user)
            return '',http.HTTPStatus.OK
        except Exception as e:
            print(e)
            return '',http.HTTPStatus.NO_CONTENT

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
        if user is not None:
            user["id"] = str(user["_id"])
            #return make_response(jsonify(isManager=user["is_manager"],userID=["_id"]),200)
            return (jsonify(res="1",isManager=user["is_manager"],userID=["_id"]))
        
        else:
            print(user)
            #return make_response('',204)
            return (jsonify(res="0"))
      
    def delete(self, user_id):
        self.users.delete_one({"_id": user_id})


        
api.add_resource(User,  '/user/<user_id>' ,'/user', '/',  methods=['GET', 'POST'])

class FileUpload(Resource):
    def __init__(self):
        self.users = db.Users
        
    def post(self):
        data = request.get_json()
        print(data)
        data = data['file']
        dd = data.strip('data:text/plain;base64,')
        print("parsed:",dd)
        print("parse done")
        text =  base64.b64decode(dd).decode('UTF-8')
        f = open("temp_file.csv", "w")
        f.write(text)
        f.close()
        df = pd.read_csv("temp_file.csv") 
        records_ = df.to_dict(orient = 'records')
        db.Emp.insert_many(records_ )
        
api.add_resource(FileUpload,  '/file',  methods=['POST'])

class AnalysisResults(Resource):
    def __init__(self):
        self.results = db.Results
        
    def get(self):
        results = self.results.find({})
        results = list(results)
        for res in results:
            del res["_id"]
        print(results)
        arr = []
        #TODO: dont send concat
        for res in results:
            arr.append("Bölge: " + res["region"] + " KNN: " + str(res["knn"]) + " Decision Tree: " + str(res["tree"]))
        return (jsonify(results=arr))

    def post(self):
        data = request.get_json()
        print(data)
        

api.add_resource(AnalysisResults,  '/results',  methods=['GET'])

class Regions(Resource):
    def __init__(self):
        self.regions = db.FileInfo
        
    def get(self):
        regions = self.regions.find({})
        regions = list(regions)
        print(regions)
        for res in regions:
            del res["_id"]
        print(regions)
        return (jsonify(regions=regions))

    def post(self):
        try:
            data = request.get_json()
            print(data)
            file_info = {
                "region": data['region'],
                "type": data['type']
            }
            db.FileInfo.insert_one(file_info)
            print(file_info)
            return '',http.HTTPStatus.OK
        except Exception as e:
            print(e)
            return '',http.HTTPStatus.NO_CONTENT 
        

api.add_resource(Regions,  '/regions',  methods=['GET','POST'])

class UpdateDataset(Resource):

    def post(self):
        try:
            data = request.get_json()
            print(data)
            record = {
                "yetki": data['yetki'],
                "yapili": data['yapili'],
                "esyali": data['esyali'],
                "fiyat": data['fiyat'],
                "bolum": data['bolum'],
                "m2": data['m2'],
                "katSayisi": data['katSayisi'],
                "bulKat": data['bulKat'],
                "aidat": data['aidat'],
                "region": data['region'],
                "type": data['type']
            }
            db.Records.insert_one(record)
            print(record)
            return '',http.HTTPStatus.OK
        except Exception as e:
            print(e)
            return '',http.HTTPStatus.NO_CONTENT 

api.add_resource(UpdateDataset,  '/updateDataset',  methods=['POST'])

class Analyze(Resource):
    def __init__(self):
        self.records = db.Emp

    '''
    def get(self):
        type = request.args.get('type')
        region = request.args.get('region')
        records = self.records.find({type: type, region: region})
        records = list(records)
        df = pd.DataFrame(records) 
        df = df.rename(columns={'Fiyat': 'class'})
        X = df.drop(['class'],axis=1)
        y = df['class']
        X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0)
        scaler = MinMaxScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)
        DTC = DecisionTreeClassifier(max_depth=None).fit(X_train_scaled, y_train)
        y_predicted = DTC.predict(new_data)
    '''
        

api.add_resource(Analyze,  '/analyze',  methods=['GET'])

if __name__ == '__main__':
     app.run(host='0.0.0.0', port='8086')




