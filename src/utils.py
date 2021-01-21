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
    count = 0
    for emoji in UNICODE_EMOJI:
        count += s.count(emoji)
        if count > 1:
            return False
    return bool(count)

def count_emojis(m):
    emoji_count = 0
    for w in m:
        if is_emoji(w):
            emoji_count+=1
    return emoji_count