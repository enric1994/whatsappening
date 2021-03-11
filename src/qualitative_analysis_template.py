# coding: utf8
from __future__ import unicode_literals

import utils
import os
import csv
from tqdm import tqdm
import datetime
from datetime import timedelta


INPUTS_PATH = os.path.join('..','data','rawV2')
OUTPUT_FILE = os.path.join('..','data','output','qualitative_study.csv')


with open(OUTPUT_FILE, 'w') as f:
	csvf = csv.writer(f, escapechar=' ')
	csvf.writerow([
		'Channel name',
		'Date',
		'Hour',
		'Content',
		'Topics',
		'Engagement',
		'Bussiness model'
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

		# Decrease the time 4 hours to compensate time shift France/Brazil:
		chat.df['date'] -= timedelta(hours=4)

		# Remove messages from user
		r = chat.df[(chat.df.username=='Giuliander Carpes')].index
		chat.df.drop(r)

		# Limit study period (2020-08-01) until (2021-00-00)
		days_before = chat.df[(chat.df.date<= '2021-1-11')].index
		aux_chat = chat.df.drop(days_before)
		days_after = aux_chat[(aux_chat.date>= '2021-1-24')].index
		chat_df = aux_chat.drop(days_after)


		for i,d in enumerate(chat_df.date):
			csvf.writerow([
				chat_name[:-4],
				str(d)[:10], 
				str(d)[11:],
				chat_df.iloc[i].message,
				'',
				'',
				''
				]
				)
		# Total messages
		


print('Finished')