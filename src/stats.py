import utils
import os
import csv
from tqdm import tqdm

INPUTS_PATH = os.path.join('..','data','raw_errors')
OUTPUT_FILE = os.path.join('..','data','output','stats.csv')


with open(OUTPUT_FILE, 'w') as f:
    csvf = csv.writer(f, quoting=csv.QUOTE_NONE, escapechar=' ')
    csvf.writerow(['Chat Name', 'Total Messages', 'Average Characters Length', 'Emoji Count' 'Start Date', 'End Date'])

    # Count total messages + start date + end date
    chats = utils.list_chats(INPUTS_PATH)
    for chat_name in chats:
        print('#'*50)
        print('#'*50)
        print(chat_name)
        print('-'*50)
        chat_path = os.path.join(INPUTS_PATH, chat_name)
        chat = utils.get_chat(chat_path)

        # Remove messages from user
        r = chat.df[(chat.df.username=='Giuliander Carpes')].index
        chat.df.drop(r)

        # Total messages
        total_messages = len(chat.df)

        # Average messages
        message_lengths=[len(x) for x in chat.df.message]
        average_length = sum(message_lengths)/len(message_lengths)

        # Emoji count
        # Note: some emojis (e.g. ▪) should not be counted
        emoji_count = 0
        # for m in tqdm(chat.df.message):
        #     emoji_count += utils.count_emojis(m)
        
        # TODO Message frequency by hour
        # hours = [0] * 24
        # import pdb;pdb.set_trace()
        # TODO Message frequency per day of the week
        # TODO Messages per month

        # TODO Line break analysis
        # TODO First word analysis
        # TODO Exclamation mark !/? analysis
        # TODO Capital letters analysis
        # TODO Links analysis
        # TODO Common words analysis
        # TODO Emoji: popular emojis
        # TODO Emoji: country flags used

        # TODO Sentiment analysis: PCA representation in clusters
        # TODO Sentiment analysis positive/negative & subjective/objective (PT!)




        # print(total_messages, average_length, emoji_count, chat.start_date, chat.end_date)

        
                
        csvf.writerow([chat_name, total_messages, average_length, emoji_count, chat.start_date, chat.end_date])

print('Finished')