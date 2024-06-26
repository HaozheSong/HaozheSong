import multiprocessing
import os

wsgi_app = 'app:app'
bind = '0.0.0.0:5000'
workers = multiprocessing.cpu_count() * 2 + 1

accesslog_path = './log/gunicorn_access.log'
errorlog_path = './log/gunicorn_error.log'
if not os.path.exists('./log'):
    os.mkdir('./log')
for log in [accesslog_path, errorlog_path]:
    if not os.path.exists(log):
        f = open(log, 'w')
        f.close()

accesslog = accesslog_path
errorlog = errorlog_path
capture_output = True
