import os
from emoji import UNICODE_EMOJI
from whatstk import WhatsAppChat

def get_chat(file_path):
    return WhatsAppChat.from_source(filepath=file_path)

def list_chats(folder_path):
    names = os.listdir(folder_path)
    names = [n for n in names if '.txt' in n]
    return names


def is_emoji(s):
    return s in UNICODE_EMOJI

def count_emojis(m):
    emoji_list = []
    for w in m:
        if is_emoji(w):
            emoji_list.append(w)
    return emoji_list