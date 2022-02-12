from flask import Flask, request, render_template
from chatbot import Chatbot

app = Flask(__name__)

bot = Chatbot()


@app.route('/api', methods=['POST'])
def api():
    if request.method == 'POST':
        json_data = request.json
        if json_data.get("clear"):
            bot.clear_chat_history()
            length = bot.get_chat_history_length()
            return{"status": "chat history cleared",
                   "length": length}
        else:
            message = json_data["text"]
            bot_response = bot.get_response(message)
            length = bot.get_chat_history_length()
            return {"text": bot_response,
                    "length": length}


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('chat/index.html') # noqa

