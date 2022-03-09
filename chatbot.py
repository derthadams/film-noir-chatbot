from transformers import AutoModelForCausalLM, AutoTokenizer # noqa
import torch # noqa
from collections import deque


class Chatbot: # noqa
    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained('output-medium')
        self.model = AutoModelForCausalLM.from_pretrained('output-medium')
        self.queue = deque()
        self.chat_history_ids = torch.tensor([], dtype=torch.long)

    def _trim_chat_history(self):
        if len(self.queue) > 10:
            discard_length = self.queue.popleft()
            discard_length += self.queue.popleft()
            self.chat_history_ids = self.chat_history_ids[:, discard_length:]

    def _encode_message(self, message):
        return self.tokenizer.encode(message + self.tokenizer.eos_token,
                                     return_tensors='pt')

    def clear_chat_history(self):
        self.chat_history_ids = torch.tensor([], dtype=torch.long)
        self.queue = deque()

    def get_chat_history_length(self):
        return len(self.queue)

    def get_response(self, message):
        # encode user message using tokenizer
        user_message_input_ids = self._encode_message(message)

        # add an integer representing the length of user message to end of queue
        user_message_input_length = user_message_input_ids.size()[1]
        self.queue.append(user_message_input_length)

        # prepare input tensor for bot by concatenating chat history and user message
        bot_input_ids = torch.cat([self.chat_history_ids, user_message_input_ids], dim=-1)

        # calculate length of chat history before bot generates a response
        prior_chat_history_length = bot_input_ids.size()[1]

        # generate a bot response and add it to the end of the chat history
        self.chat_history_ids = self.model.generate(
            bot_input_ids, max_length=1000,
            pad_token_id=self.tokenizer.eos_token_id,
            no_repeat_ngram_size=3,
            do_sample=True,
            top_k=100,
            top_p=0.7,
            temperature=0.8
        )

        # calculate length of bot response and add it to the queue
        bot_input_length = self.chat_history_ids.size()[1] - prior_chat_history_length
        self.queue.append(bot_input_length)

        # return the bot response
        response = self.tokenizer.decode(self.chat_history_ids[:, bot_input_ids.shape[-1]:][0],
                                         skip_special_tokens=True)

        # trim the head of the chat history if it's more than 10 messages long
        self._trim_chat_history()

        return response

