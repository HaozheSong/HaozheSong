FROM python:latest

WORKDIR /haozhesong-v2

RUN apt-get update && apt-get install -y wget
RUN wget https://github.com/HaozheSong/HaozheSong/releases/download/2.0.2/archive_2-0-2.tar.gz \
    && tar -zxvf archive_2-0-2.tar.gz
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000
ENTRYPOINT ["gunicorn", "-c", "gunicorn.conf.py"]