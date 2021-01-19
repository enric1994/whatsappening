import utils
import os

chats = utils.list_chats()

total = 0

for chat_name in chats:
    print(chat_name)
    chat_path = os.path.join('..','data','raw',chat_name)
    chat = utils.get_chat(chat_path)
    print(chat.start_date, chat.end_date, len(chat.df))
    total += len(chat.df)

    # Ignore messages from user

print(total)