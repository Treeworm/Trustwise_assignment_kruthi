from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch

class ToxicityModel:
    def __init__(self):
        self.model_name = "unitary/toxic-bert" 
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
        self.model = AutoModelForSequenceClassification.from_pretrained(self.model_name)
        self.model.eval()  
    
    def get_score(self, text):
        inputs = self.tokenizer(
            text,
            return_tensors="pt",
            truncation=True,
            max_length=512,
            padding=True
        )
        
        with torch.no_grad():
            outputs = self.model(**inputs)
            scores = torch.sigmoid(outputs.logits)
        return float(scores[0][0])  