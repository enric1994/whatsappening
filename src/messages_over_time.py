import utils
import os
import csv
from tqdm import tqdm
import datetime

INPUTS_PATH = os.path.join('..','data','raw')
OUTPUT_FILE = os.path.join('..','data','output','messages_over_time.csv')

stats = {}

iter_date = datetime.datetime(2018,10,3)
end_date = datetime.datetime(2021,1,16)

while iter_date < end_date:
    stats[iter_date.strftime("%Y-%m-%d")] = 0
    iter_date = iter_date + datetime.timedelta(days=1)

with open(OUTPUT_FILE, 'w') as f:
    csvf = csv.writer(f, quoting=csv.QUOTE_NONE, escapechar=' ')
    csvf.writerow([
        'Day',
        'Total Messages', 
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

        # Remove messages from user
        r = chat.df[(chat.df.username=='Giuliander Carpes')].index
        chat.df.drop(r)

        # Total messages
        total_messages = len(chat.df)
        print('Total Messages: ', total_messages)

        # Message frequency per day of the week
        for w in chat.df.date:
            stats[str(w)[:10]]+=1
    
    print('Writing...')
    for day in [*stats]:
        csvf.writerow([
            day, 
            stats[day], 
            ]
            )

print('Finished')