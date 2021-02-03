import utils
import os
import csv
from tqdm import tqdm

INPUTS_PATH = os.path.join('..','data','raw')
OUTPUT_FILE = os.path.join('..','data','output','stats.csv')


with open(OUTPUT_FILE, 'w') as f:
    csvf = csv.writer(f, quoting=csv.QUOTE_NONE, escapechar=' ')
    csvf.writerow([
        'Chat Name',
        'Total Messages', 
        'Average Characters Length', 
        'Emoji Count',
        'Start Date', 'End Date',
        'Messages at 0 hours', 'Messages at 1 hours', 'Messages at 2 hours', 'Messages at 3 hours',
        'Messages at 4 hours', 'Messages at 5 hours', 'Messages at 6 hours', 'Messages at 7 hours',
        'Messages at 8 hours', 'Messages at 9 hours', 'Messages at 10 hours', 'Messages at 11 hours',
        'Messages at 12 hours', 'Messages at 13 hours', 'Messages at 14 hours', 'Messages at 15 hours',
        'Messages at 16 hours', 'Messages at 17 hours', 'Messages at 18 hours', 'Messages at 19 hours',
        'Messages at 20 hours', 'Messages at 21 hours', 'Messages at 22 hours', 'Messages at 23 hours',
        'Messages January', 'Messages February', 'Messages March', 'Messages April',
        'Messages May', 'Messages June', 'Messages July', 'Messages August',
        'Messages September', 'Messages October', 'Messages November', 'Messages December',
        'Messages Monday', 'Messages Tuesday', 'Messages Wednesday', 'Messages Thursday',
        'Messages Friday', 'Messages Saturday', 'Messages Sunday',
        'Total breaks',
        'Total exclamations!',
        'Total interrogations?'
        ])

    # Count total messages + start date + end date
    chats = utils.list_chats(INPUTS_PATH)
    for chat_name in chats:
        print('#'*50)
        print('#'*50)
        print(chat_name)
        print('-'*50)
        chat_path = os.path.join(INPUTS_PATH, chat_name)
        chat = utils.get_chat(chat_path)

        print('Chat start date: ', chat.start_date)
        print('Chat end date: ', chat.end_date)

        # Remove messages from user
        r = chat.df[(chat.df.username=='Giuliander Carpes')].index
        chat.df.drop(r)

        # Limit study period (2020-08-01) until (2021-00-00)
        days_before = chat.df[(chat.df.date<= '2020-08-01')].index
        aux_chat = chat.df.drop(days_before)
        days_after = aux_chat[(aux_chat.date>= '2021-01-01')].index
        chat_df = aux_chat.drop(days_after)

        # Total messages
        total_messages = len(chat_df)
        print('Total Messages: ', total_messages)

        # Average messages
        message_lengths=[len(x) for x in chat_df.message]
        average_length = sum(message_lengths)/len(message_lengths)
        print('Average length: ', average_length)

        # Emoji count
        # Note: some emojis (e.g. ▪) should not be counted
        emoji_count = 0
        # for m in tqdm(chat.df.message):
        #     emoji_count += utils.count_emojis(m)
        print('Emoji count: ', emoji_count)
        
        # Message frequency per hour
        hours = [0] * 24
        for d in chat_df.date:
            hours[d.hour]+=1
        print('Message frequency per hour: ', hours)
        
        # Message frequency per month
        months = [0] * 12
        for m in chat_df.date:
            months[m.month - 1]+=1
        print('Message frequency per month: ', months)

        # Message frequency per day of the week
        week_days = [0] * 7
        for w in chat_df.date:
            week_days[w.dayofweek]+=1
        print('Message frequency per day of the week: ', week_days)

        # Line break analysis
        total_breaks = 0
        for m in chat_df.message:
            total_breaks += len(m.split('\n'))
        print('Total breaks: ',total_breaks)

        # Exclamation mark analysis
        total_exclamations = 0
        for m in chat_df.message:
            total_exclamations += len([x for x in m if x=='!'])
        print('Total exclamation marks: ',total_exclamations)

        # Interrogation mark analysis
        total_interrogations = 0
        for m in chat_df.message:
            total_interrogations += len([x for x in m if x=='?'])
        print('Total interrogation marks: ',total_interrogations)

        


        # TODO First word analysis
        # TODO Exclamation mark !/? analysis
        # TODO Capital letters analysis
        # TODO Links analysis and media
        # TODO Common words analysis
        # TODO Emoji: popular emojis
        # TODO Emoji: country flags used

        # TODO Sentiment analysis: PCA representation in clusters
        # TODO Sentiment analysis positive/negative & subjective/objective (PT!)




        # print(total_messages, average_length, emoji_count, chat.start_date, chat.end_date)

        
                
        csvf.writerow([
            chat_name, 
            total_messages, 
            average_length, 
            emoji_count, 
            chat.start_date, chat.end_date] +
            hours +
            months +
            week_days +
            [total_breaks] +
            [total_exclamations] +
            [total_interrogations]
            )

print('Finished')