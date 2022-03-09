from flask import Flask, request, render_template
from chatbot import Chatbot

app = Flask(__name__)

bot = Chatbot()


@app.route('/api/load', methods=['POST'])
def load():
    if request.method == 'POST':
        json_data = request.json
        # bot.load_chat(json_data)
        # print(type(json_data))
        # print(json_data)
        return {"status": "chat loaded"}


@app.route('/api', methods=['POST'])
def api():
    if request.method == 'POST':
        json_data = request.json
        if json_data.get("clear"):
            bot.clear_chat_history()
            length = bot.get_chat_history_length()
            return {"status": "chat history cleared",
                   "length": length}
        else:
            message = json_data["text"]
            bot_response = bot.get_response(message)
            length = bot.get_chat_history_length()
            return {"text": bot_response,
                    "user": False}


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html') # noqa

