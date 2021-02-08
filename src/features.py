from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.decomposition import PCA
import utils
import os
import csv
from tqdm import tqdm
from datetime import timedelta
import matplotlib.pyplot as plt



INPUTS_PATH = os.path.join('..','data','small_chats')
OUTPUT_FILE = os.path.join('..','data','output','features.png')

print('Loading model...')
model = SentenceTransformer('paraphrase-xlm-r-multilingual-v1')


chats = utils.list_chats(INPUTS_PATH)

sentences_raw = []
    
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
    days_before = chat.df[(chat.df.date<= '2020-08-01')].index
    aux_chat = chat.df.drop(days_before)
    days_after = aux_chat[(aux_chat.date>= '2021-01-01')].index
    chat_df = aux_chat.drop(days_after)
    

    # Parse sentences
    for m in chat_df.message:
        # Only analyze sentences longer than 15 characters
        [sentences_raw.extend(x.split('.')) for x in m.split('\n') if len(x) > 15]

sentences = [x for x in sentences_raw if len(x) > 15]

# Extract features
print('Encoding {} sentences...'.format(len(sentences)))
sentence_embeddings = model.encode(sentences, show_progress_bar=True)

pca = PCA(n_components=2)
pca.fit(sentence_embeddings)
X = pca.transform(sentence_embeddings)

fig = plt.figure()

plt.scatter(X[:, 0], X[:, 1])

fig.savefig(OUTPUT_FILE, dpi=fig.dpi)
