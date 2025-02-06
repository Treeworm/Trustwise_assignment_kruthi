from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch

class VectaraModel:
    def __init__(self):
        self.model_name = "microsoft/deberta-large-mnli"
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
        self.model = AutoModelForSequenceClassification.from_pretrained(self.model_name)
        self.model.eval()  
    
    def get_score(self, text):
        
        inputs = self.tokenizer(
            text,
            text,  
            return_tensors="pt",
            truncation=True,
            max_length=512,
            padding=True
        )
        
        with torch.no_grad():
            outputs = self.model(**inputs)
            
            probs = torch.softmax(outputs.logits, dim=1)
            entailment_score = float(probs[0][2])  
            
        return entailment_score