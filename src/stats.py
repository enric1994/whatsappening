import utils
import os
import csv
from datetime import timedelta
from tqdm import tqdm
from polyglot.text import Text
from polyglot.detect import Detector
from polyglot.detect.base import logger as polyglot_logger
import statistics

polyglot_logger.setLevel("ERROR")


INPUTS_PATH = os.path.join('..','data','rawV2')
OUTPUT_FILE = os.path.join('..','data','output','stats.csv')
MIN_SENTENCE = 100

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
		'Total interrogations?',
		'Total capital letters',
		'Total links',
		'Total videos',
		'Total images',
		'Total audios',
		'Top 1 emoji',
		'Top 1 emoji usage',
		'Top 2 emoji',
		'Top 2 emoji usage',
		'Top 3 emoji',
		'Top 3 emoji usage',
		'Top 4 emoji',
		'Top 4 emoji usage',
		'Top 5 emoji',
		'Top 5 emoji usage',
		'Top 6 emoji',
		'Top 6 emoji usage',
		'Top 7 emoji',
		'Top 7 emoji usage',
		'Top 8 emoji',
		'Top 8 emoji usage',
		'Top 9 emoji',
		'Top 9 emoji usage',
		'Top 10 emoji',
		'Top 10 emoji usage',
		'Polarity standard deviation',
		'Polarity mean',
		'Positive sentiment standard deviation',
		'Positive sentiment mean',
		'Negative sentiment standard deviation',
		'Negative sentiment mean'
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

		print('Chat start date: ', chat.start_date)
		print('Chat end date: ', chat.end_date)

		# Remove messages from user
		r = chat.df[(chat.df.username=='Giuliander Carpes')].index
		chat.df.drop(r)

		# Limit study period
		days_before = chat.df[(chat.df.date<= '2020-11-11')].index
		aux_chat = chat.df.drop(days_before)
		days_after = aux_chat[(aux_chat.date>= '2021-02-15')].index
		chat_df = aux_chat.drop(days_after)

		# Total messages
		total_messages = len(chat_df)
		print('Total Messages: ', total_messages)

		# Average messages
		message_lengths=[len(x) for x in chat_df.message]
		average_length = sum(message_lengths)/len(message_lengths)
		print('Average length: ', average_length)

		# Emoji count and top emojis
		emoji_count = 0
		emojis = dict.fromkeys(
			[' ' * i for i in range(0,10)],
		 0)
		for m in chat.df.message:
			emojis_message = utils.count_emojis(m)
			emoji_count += len(emojis_message)
			for e in emojis_message:
				if e not in emojis:
					emojis[e] = 0
				emojis[e] +=1
		print('Emoji count: ', emoji_count)
		top10_emojis = sorted(emojis, key=emojis.get, reverse=True)[:10]
		top10_emojis_with_value = [[x, emojis[x]] for x in top10_emojis]
		print('Top emojis: ', top10_emojis_with_value)

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

		# Count capital letters
		total_capital = 0
		for m in chat_df.message:
			total_capital += len([x for x in m if x.isupper()])
		print('Total capital letters: ',total_capital)

		# Count links
		total_links = 0
		for m in chat_df.message:
			words = m.split()
			total_links += len([x for x in words if 'http' in x])
		print('Total links: ',total_links)

		# Count video
		total_videos = 0
		for m in chat_df.message:
			total_videos += len(m.split('vídeo omitido')) -1
		print('Total videos: ',total_videos)

		# Count images
		total_images = 0
		for m in chat_df.message:
			total_images += len(m.split('imagem ocultada')) -1
		print('Total images: ',total_images)

		# Count audios
		total_audios = 0
		for m in chat_df.message:
			words = m.split()
			total_audios += len(m.split('áudio ocultado')) -1
		print('Total audios: ',total_audios)

		# Sentiment analysis
		polarity_list = []
		positive_list = []
		negative_list = []
		for m in chat_df.message:
			# Only analyze long sentences
			for l in m.split('\n'):
				for s in l.split('.'):
					if len(s) > MIN_SENTENCE:
						detector = Detector(s)
						if detector.language.code == 'pt':

							sentences = Text(s).sentences
							
							for sen in sentences:
								try:
									polarity_list.append(sen.polarity)
								except:
									pass
								
								for e in sen.entities:
									try:
										pos = e.positive_sentiment
										neg = e.negative_sentiment
									

										if pos > 0:
											positive_list.append(pos)
										if neg > 0:
											negative_list.append(neg)

									except:
										pass

		if len(polarity_list) > 1:
			polarity_std = statistics.stdev(polarity_list)
			print('Polarity standard deviation: {}'.format(polarity_std))

			polarity_mean = sum(polarity_list)/len(polarity_list)
			print('Polarity mean: {}'.format(polarity_mean))
		else:
			polarity_std = 0
			polarity_mean = 0
			print('Not enough polarity data')

		
		if len(positive_list) > 1 and len(negative_list) > 1:
			positive_std = statistics.stdev(positive_list)
			print('Positive sentiment standard deviation: {}'.format(positive_std))

			positive_mean = sum(positive_list)/len(positive_list)
			print('Positive sentiment mean: {}'.format(positive_mean))

			negative_std = statistics.stdev(negative_list)
			print('Negative sentiment standard deviation: {}'.format(negative_std))

			negative_mean = sum(negative_list)/len(negative_list)
			print('Negative sentiment mean: {}'.format(negative_mean))
		else:
			positive_std = 0
			negative_std = 0
			positive_mean = 0
			negative_mean = 0
			print('Not enough positive/negative sentiment data')


		# TODO Common words analysis
		# TODO Emoji: country flags used

				
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
			[total_interrogations] +
			[total_capital] +
			[total_links] +
			[total_videos] +
			[total_images] +
			[total_audios] +
			[top10_emojis_with_value[0][0]] +
			[top10_emojis_with_value[0][1]] +
			[top10_emojis_with_value[1][0]] +
			[top10_emojis_with_value[1][1]] +
			[top10_emojis_with_value[2][0]] +
			[top10_emojis_with_value[2][1]] +
			[top10_emojis_with_value[3][0]] +
			[top10_emojis_with_value[3][1]] +
			[top10_emojis_with_value[4][0]] +
			[top10_emojis_with_value[4][1]] +
			[top10_emojis_with_value[5][0]] +
			[top10_emojis_with_value[5][1]] +
			[top10_emojis_with_value[6][0]] +
			[top10_emojis_with_value[6][1]] +
			[top10_emojis_with_value[7][0]] +
			[top10_emojis_with_value[7][1]] +
			[top10_emojis_with_value[8][0]] +
			[top10_emojis_with_value[8][1]] +
			[top10_emojis_with_value[9][0]] +
			[top10_emojis_with_value[9][1]] +
			[polarity_std] +
			[polarity_mean] +				
			[positive_std] +
			[positive_mean] +
			[negative_std] +
			[negative_mean] 
			)

print('Finished')