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


class User(Resource):
    def __init__(self):
        self.users = db.Users

    def get(self):
        us = []
        for doc in self.users.find({}):
            us.append(json_util.dumps(doc))

        return (jsonify(users=us))
        #print(self.users.find_one({"_id": user_id}))

    def post(self):
        data = request.get_json()
        print(data)
        user = {"name": data["name"]}
        #, "age": data["age"]
        print(user)
        self.users.insert(user)
      
    def delete(self, user_id):
        self.users.delete_one({"_id": user_id})


        
api.add_resource(User,  '/user/<user_id>' ,'/user', '/',  methods=['GET', 'POST'])

if __name__ == '__main__':
     app.run(host='0.0.0.0', port='8086')
