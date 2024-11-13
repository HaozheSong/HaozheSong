# Development
```bash
flask --app app.py --debug run
```
# Flask in Gunicorn
## Docker
```bash
docker build -t haozhesong-v3 .
docker run -d  -p 5000:5000 --name haozhesong-v3 haozhesong-v3
```

## Systemd
Upload static media files

Create virtual environment and install dependencies
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Rename `gunicorn_template.service` to `gunicorn.service`. Change `WorkingDirectory` and `ExecStart` path in `gunicorn.service` file. Copy to systemd directory and start it.
```bash
sudo cp gunicorn.service /etc/systemd/system/gunicorn.service
sudo systemctl start gunicorn
sudo systemctl enable gunicorn

sudo systemctl status gunicorn
```

# NGINX
Change `access_log` and `error_log` path in `gunicorn_nginx.conf` file. Copy to NGINX directory and reload nginx.
```bash
# install nginx
sudo apt update
sudo apt install nginx

sudo cp gunicorn_nginx.conf /etc/nginx/conf.d/gunicorn_nginx.conf
sudo nginx -s reload
```

# HTTPS
## Certbot
Install certbot
```bash
# install snap
sudo apt update
sudo apt install snapd
sudo snap install core; sudo snap refresh core
# install certbot through snap
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```
Change DNS and deploy HTTPS certificates
```bash
sudo certbot --nginx -d haozhesong.com
```
