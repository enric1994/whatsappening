import os
import emoji
from whatstk import WhatsAppChat
import re
import regex
from collections import Counter
from emoji_extractor.extract import Extractor


def get_chat(file_path):
    return WhatsAppChat.from_source(filepath=file_path)

def list_chats(folder_path):
    names = os.listdir(folder_path)
    names = [n for n in names if '.txt' in n]
    return names

def count_emojis(m):

    extract = Extractor()
    return extract.count_emoji(m, check_first=True)