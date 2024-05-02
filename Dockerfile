FROM python:latest

WORKDIR /haozhesong-v3

COPY . .
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000
ENTRYPOINT ["gunicorn", "-c", "gunicorn.conf.py"]