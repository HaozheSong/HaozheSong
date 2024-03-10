from flask import Flask, render_template, abort
from jinja2 import TemplateNotFound

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/<page>')
def page(page):
    try:
        return render_template(f'{page}.html')
    except TemplateNotFound:
        abort(404)


if __name__ == '__main__':
    app.run()
