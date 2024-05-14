from flask import Flask, request, jsonify
from chatbot import Chatbot

app = Flask(__name__)
chatbot = Chatbot()

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json['message']
    intent = chatbot.predict_intent(user_input)
    response = chatbot.get_response(intent)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
