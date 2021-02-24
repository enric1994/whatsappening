
print('Importing NLP module...')
from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE

import utils
import os
import csv
from tqdm import tqdm
from datetime import timedelta
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import re



INPUTS_PATH = os.path.join('..','data','rawV2')
OUTPUT_FILE = os.path.join('..','data','output','features_local_national.png')
MIN_SENTENCE = 40
START_DATE = '2020-09-01'
END_DATE = '2021-02-15'
DOT_SIZE = 7

print('Loading model...')
model = SentenceTransformer('paraphrase-xlm-r-multilingual-v1')


chats = utils.list_chats(INPUTS_PATH)

sentences = []
chat_names = []
    
for chat_name in chats:
    chat_path = os.path.join(INPUTS_PATH, chat_name)
    chat = utils.get_chat(chat_path)

    # Decrease the time 4 hours to compensate time shift France/Brazil:
    chat.df['date'] -= timedelta(hours=4)

    # Remove messages from user
    r = chat.df[(chat.df.username=='Giuliander Carpes')].index
    chat.df.drop(r)

    # Limit study period (2020-08-01) until (2021-00-00)
    days_before = chat.df[(chat.df.date<= START_DATE)].index
    aux_chat = chat.df.drop(days_before)
    days_after = aux_chat[(aux_chat.date>= END_DATE)].index
    chat_df = aux_chat.drop(days_after)
    
    # Parse sentences
    for m in chat_df.message:
        # Only analyze long sentences and remove links
        for l in m.split('\n'):
            sentences_dot = l.split('.')
            sentences_raw = [re.sub(r'(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:\'".,<>?«»“”‘’]))', '', x) for x in sentences_dot if len(x) > MIN_SENTENCE]
            sentences.extend(sentences_raw)

            chat_names.extend([chat_name[:-4]] * len(sentences_raw))

# Local/National grouping

local_chats = [
'Gazeta do Povo Local',
'GaúchaZH',
'Matinal',
'O Mirante Joinville',
'O Município',
'O Município Joinville',
'Tribuna do Paraná',
'Jornal do Comércio'
]





for i, c in enumerate(chat_names):
    if c in local_chats:
        chat_names[i] = 'Local/Regional chats'
    else:
        chat_names[i] = 'National'

# Extract features
print('Encoding {} sentences...'.format(len(sentences)))
sentence_embeddings = model.encode(sentences, show_progress_bar=True)

# tsne = TSNE(n_components=2, verbose=1, perplexity=100, n_iter=1000)
# X = tsne.fit_transform(sentence_embeddings)

# import pdb;pdb.set_trace()
# pca = PCA(n_components=2)
# pca.fit(sentence_embeddings)
# X = pca.transform(sentence_embeddings)
# import pdb;pdb.set_trace()
tsne = TSNE(n_components=2, verbose=1, perplexity=100, n_iter=1000)
X = tsne.fit_transform(sentence_embeddings)



data = pd.DataFrame(X, columns=['d1', 'd2'])
data['chat'] = chat_names

fig = plt.figure()
# sns.color_palette("Set2")
# sns.color_palette()
# sns.color_palette("Paired")


g = sns.scatterplot(data=data, x="d1", y="d2", hue="chat", palette="husl", s=DOT_SIZE, alpha=0.5)

g.set_ylabel('')    
g.set_xlabel('')

handles, labels  =  g.get_legend_handles_labels()

g.legend(handles, np.unique(chat_names), loc='upper center', bbox_to_anchor=(0.5, 1.15), ncol=5, prop={'size': 5})


fig.savefig(OUTPUT_FILE, dpi=1000)

print('done')