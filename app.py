from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/<page>')
def page(page):
    return render_template(f'{page}.html')


if __name__ == '__main__':
    app.run()
