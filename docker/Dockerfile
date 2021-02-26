# Select a base image:

FROM qts8n/cuda-python:runtime

RUN apt update -y && \
apt install -y \
git \
libicu-dev


RUN pip install -U \
sentence-transformers \
emoji \
protobuf \
git+https://github.com/lucasrodes/whatstk.git@main \
pyicu \
polyglot \
PyICU \
pycld2 \
Morfessor

RUN polyglot download embeddings2.pt \
polyglot download ner2.pt \
polyglot download sentiment2.pt