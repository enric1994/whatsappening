import os

from whatstk import WhatsAppChat

def get_chat(file_path):
    return WhatsAppChat.from_source(filepath=file_path)

def list_chats():
    names = os.listdir('../data/raw')
    names = [n for n in names if '.txt' in n]
    return names

