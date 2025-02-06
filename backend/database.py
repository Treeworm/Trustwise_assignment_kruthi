from pymongo import MongoClient
from datetime import datetime
from config import Config  
class Database:
    def __init__(self):
        self.client = MongoClient(Config.MONGODB_URI)
        self.db = self.client[Config.DB_NAME]
        self.collection = self.db[Config.COLLECTION_NAME]
    
    def insert_score(self, text, scores):
        document = {
            'text': text,
            'scores': scores,
            'timestamp': datetime.utcnow()
        }
        return self.collection.insert_one(document)
    
    def get_all_scores(self):
        return list(self.collection.find({}, {'_id': 0}))