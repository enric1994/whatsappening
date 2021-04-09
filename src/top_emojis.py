import utils
import os
import csv
from datetime import timedelta
from tqdm import tqdm
from emoji import UNICODE_EMOJI


INPUTS_PATH = os.path.join('..','data','rawV3')
OUTPUT_FILE = os.path.join('..','data','output','emojis.csv')
MIN_SENTENCE = 100

emojis = {}
for i in list(UNICODE_EMOJI['en'].keys()):
	emojis[i]=0

# with open(OUTPUT_FILE, 'w') as f:
# 	csvf = csv.writer(f, quoting=csv.QUOTE_NONE, escapechar=' ')
# 	csvf.writerow([
# 		list(UNICODE_EMOJI['en'].keys())
# 	]
# 		)
	# Count total messages + start date + end date
chats = utils.list_chats(INPUTS_PATH)
for chat_name in chats:
	print('#'*50)
	print('#'*50)
	print(chat_name)
	print('-'*50)
	chat_path = os.path.join(INPUTS_PATH, chat_name)
	chat = utils.get_chat(chat_path)

	# Decrease the time 4 hours to compensate time shift France/Brazil:
	chat.df['date'] -= timedelta(hours=4)

	print('Chat start date: ', chat.start_date)
	print('Chat end date: ', chat.end_date)

	# Remove messages from user
	r = chat.df[(chat.df.username=='Giuliander Carpes')].index
	chat.df.drop(r)

	# Limit study period
	days_before = chat.df[(chat.df.date<= '2020-11-09')].index
	aux_chat = chat.df.drop(days_before)
	days_after = aux_chat[(aux_chat.date>= '2021-03-10')].index
	chat_df = aux_chat.drop(days_after)

	

	for m in chat.df.message:

		emojis_message = utils.count_emojis(m)
		for e in emojis_message:
			try:
				emojis[e] +=1
			except:
				pass

				
		# csvf.writerow(list(emojis.values()))
emojis_sorted =dict(sorted(emojis.items(), key=lambda item: item[1]))
print(list(reversed(list(emojis_sorted.keys())))[:10])
# import pdb;pdb.set_trace()
print('Finished')

# '⚠': 166, '☀': 189, '📚': 224, '🇧🇷': 231, '➕': 247, '🐦': 281, '💉': 379, '👀': 435, '🎩': 440, '🦠': 474}