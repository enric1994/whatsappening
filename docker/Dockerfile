# Select a base image:

FROM qts8n/cuda-python:runtime

RUN apt update -y && \
apt install -y git

RUN pip install -U \
sentence-transformers \
emoji \
protobuf \
git+https://github.com/lucasrodes/whatstk.git@main