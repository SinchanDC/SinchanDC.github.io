from fuzzywuzzy import process  # Make sure to install fuzzywuzzy and python-Levenshtein for performance
import torch
from transformers import BertTokenizer, BertForSequenceClassification
import numpy as np
import json

class Chatbot:
    def __init__(self, model_path='./model', intents_path='intents.json', label_classes_path='./model/label_classes.npy'):
        self.tokenizer = BertTokenizer.from_pretrained(model_path)
        self.model = BertForSequenceClassification.from_pretrained(model_path)
        self.label_classes = np.load(label_classes_path, allow_pickle=True)
        
        with open(intents_path, 'r', encoding='utf-8') as file:
            intents_data = json.load(file)
        self.intents = intents_data['intents']
        self.patterns = {intent['tag']: intent['patterns'] for intent in self.intents}

        self.model.eval()

    def predict_intent(self, text):
        inputs = self.tokenizer.encode_plus(
            text,
            add_special_tokens=True,
            max_length=64,
            padding='max_length',
            truncation=True,
            return_attention_mask=True,
            return_tensors='pt',
        )
        
        input_ids = inputs['input_ids']
        attention_mask = inputs['attention_mask']

        with torch.no_grad():
            outputs = self.model(input_ids=input_ids, attention_mask=attention_mask)
        
        logits = outputs.logits
        probabilities = torch.nn.functional.softmax(logits, dim=-1)
        confidence, predicted_label_idx = torch.max(probabilities, dim=-1)
        
        # If confidence is below a certain threshold, use fuzzy matching
        if confidence < 0.5:
            return self.find_closest_intent(text)

        predicted_label = self.label_classes[predicted_label_idx]
        return predicted_label

    def find_closest_intent(self, text):
        # Fuzzy match the text to patterns and take the best match
        all_patterns = [item for sublist in self.patterns.values() for item in sublist]
        best_match, score = process.extractOne(text, all_patterns)
        if score > 85:  # Threshold for fuzzy match confidence
            for tag, patterns in self.patterns.items():
                if best_match in patterns:
                    return tag
        return 'noanswer'

    def get_response(self, intent):
        for intent_dict in self.intents:
            if intent_dict['tag'] == intent:
                return np.random.choice(intent_dict['responses'])
        return "Sorry, I don't understand that."

    def chat(self):
        print("Chatbot is ready to talk! Type 'quit' to exit.")
        
        while True:
            message = input("You: ")
            if message.lower() == "quit":
                break
            
            intent = self.predict_intent(message)
            response = self.get_response(intent)
            print(f"Bot: {response}")

if __name__ == "__main__":
    chatbot = Chatbot()
    chatbot.chat()
