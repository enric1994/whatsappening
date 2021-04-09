import os
import emoji
from whatstk import WhatsAppChat
import re
import regex

def get_chat(file_path):
    return WhatsAppChat.from_source(filepath=file_path)

def list_chats(folder_path):
    names = os.listdir(folder_path)
    names = [n for n in names if '.txt' in n]
    return names


def is_emoji(s):
    return s in UNICODE_EMOJI

def extract_emojis(text):
    emoji_list = []
    data = regex.findall(r'\X', text)
    flags = regex.findall(u'[\U0001F1E6-\U0001F1FF]', text) 
    for word in data:
        if any(char in emoji.UNICODE_EMOJI for char in word):
            emoji_list.append(word)

    return emoji_list + flags


def count_emojis(m):
    # import pdb;pdb.set_trace()
    emojis_verbose = emoji.demojize(m)
    emojis = re.findall(r'(:[^:]*:)', emojis_verbose)
    list_emoji = [emoji.emojize(x) for x in emojis if len(x) < 10]
    return list_emoji
    # print(list_emoji)



    # emoji_list = []
    # for w in m:
    #     if is_emoji(w):
    #         emoji_list.append(w)
    # return emoji_list