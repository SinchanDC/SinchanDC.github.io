import torch
from torch.utils.data import DataLoader, Dataset, RandomSampler, SequentialSampler
from transformers import BertTokenizer, BertForSequenceClassification, AdamW, get_linear_schedule_with_warmup
import json
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

class CustomDataset(Dataset):
    def __init__(self, texts, labels, tokenizer, max_length):
        self.tokenizer = tokenizer
        self.texts = texts
        self.labels = labels
        self.max_length = max_length

    def __len__(self):
        return len(self.texts)

    def __getitem__(self, idx):
        text = self.texts[idx]
        labels = self.labels[idx]

        encoding = self.tokenizer.encode_plus(
            text,
            add_special_tokens=True,
            max_length=self.max_length,
            padding='max_length',
            truncation=True,
            return_attention_mask=True,
            return_tensors='pt',
        )

        return {
            'input_ids': encoding['input_ids'].flatten(),
            'attention_mask': encoding['attention_mask'].flatten(),
            'labels': torch.tensor(labels, dtype=torch.long)
        }

def load_data(file_path, tokenizer, max_len=64):
    with open(file_path, 'r', encoding='utf-8') as f:
        intents = json.load(f)['intents']
    texts = [pattern for intent in intents for pattern in intent['patterns']]
    tags = [intent['tag'] for intent in intents for _ in intent['patterns']]

    label_enc = LabelEncoder()
    labels = label_enc.fit_transform(tags)

    dataset = CustomDataset(texts=texts, labels=labels, tokenizer=tokenizer, max_length=max_len)
    return dataset, label_enc

def train(model, data_loader, optimizer, device, scheduler):
    model.train()
    total_loss = 0

    for batch in data_loader:
        input_ids = batch['input_ids'].to(device)
        attention_mask = batch['attention_mask'].to(device)
        labels = batch['labels'].to(device)

        model.zero_grad()
        outputs = model(input_ids=input_ids, attention_mask=attention_mask, labels=labels)
        
        loss = outputs[0]
        total_loss += loss.item()
        loss.backward()

        torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
        optimizer.step()
        scheduler.step()

    average_loss = total_loss / len(data_loader)
    print(f"Training loss: {average_loss}")

def main():
    file_path = 'intents2.json'
    model_name = 'bert-base-uncased'
    max_len = 64
    batch_size = 32
    epochs = 50

    tokenizer = BertTokenizer.from_pretrained(model_name)
    
    dataset, label_enc = load_data(file_path, tokenizer, max_len)
    num_labels = len(label_enc.classes_)  # Correctly determine the number of unique labels

    model = BertForSequenceClassification.from_pretrained(model_name, num_labels=num_labels)

    train_size = int(0.9 * len(dataset))
    val_size = len(dataset) - train_size

    train_dataset, val_dataset = torch.utils.data.random_split(dataset, [train_size, val_size])
    train_loader = DataLoader(train_dataset, sampler=RandomSampler(train_dataset), batch_size=batch_size)
    val_loader = DataLoader(val_dataset, sampler=SequentialSampler(val_dataset), batch_size=batch_size)

    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model.to(device)

    optimizer = AdamW(model.parameters(), lr=5e-5)
    total_steps = len(train_loader) * epochs
    scheduler = get_linear_schedule_with_warmup(optimizer, num_warmup_steps=0, num_training_steps=total_steps)

    for epoch in range(epochs):
        print(f'Epoch {epoch + 1}/{epochs}')
        train(model, train_loader, optimizer, device, scheduler)

    model.save_pretrained('./model')
    tokenizer.save_pretrained('./model')
    np.save('./model/label_classes.npy', label_enc.classes_)

if __name__ == '__main__':
    main()
