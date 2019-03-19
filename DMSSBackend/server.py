from flask import Flask, request, jsonify
from flask_restful import Resource, Api, reqparse
import json
from pymongo import MongoClient
from pprint import pprint
import urllib
from bson import json_util, ObjectId


app = Flask(__name__)
api = Api(app)
client = MongoClient('localhost', 27017)
db = client['DMSS']

parser = reqparse.RequestParser()

class TaskList(Resource):
    def __init__(self):
        self.tasks = db.Tasks

    def get(self,user_id):
        task = self.tasks.find({"user_id": user_id})
        print(task)
        return (jsonify(task=task))

    def post(self):
        pass
      
    def delete(self, user_id):
        pass

      
api.add_resource(TaskList,  '/task/<user_id>',  methods=['GET'])


class User(Resource):
    def __init__(self):
        self.users = db.Users

    def get(self,user_id):
        user = self.users.find_one({"_id": user_id})
        return (jsonify(user=user))

    def post(self):
        data = request.get_json()
        user = self.users.find_one({"email": data["email"], "password": data["password"]})
        if user is None:
            return (jsonify(res="0"))
        return (jsonify(res="1"))
        '''
        user = {}
        for key in data.keys():
            user[key] = data[key]
        print("user inserted")
        print(user)
        self.users.insert(user)
        '''
      
    def delete(self, user_id):
        self.users.delete_one({"_id": user_id})


        
api.add_resource(User,  '/user/<user_id>' ,'/user', '/',  methods=['GET', 'POST'])

if __name__ == '__main__':
     app.run(host='0.0.0.0', port='8086')
