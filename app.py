from flask import Flask, render_template, abort, request, redirect, url_for

PRIVATE_TEMPLATE = ['home', 'skill', 'CV']
SHARE_TEMPLATE = ['research', 'project', 'UCInspire', 'NEEDS']
SHARE_RESEARCH_TEMPLATE = ['UCInspire', 'NEEDS']


def template(page, referrer, lang):
    # define prefix
    if page in PRIVATE_TEMPLATE:
        prefix = referrer
    elif page in SHARE_TEMPLATE:
        prefix = 'share'
    else:
        prefix = None
    # handle paths of secondary research templates
    if page in SHARE_RESEARCH_TEMPLATE:
        page = 'research_' + page
    # return
    if prefix is None or lang not in ['zh', 'en']:
        return abort(404)
    else:
        return render_template(f'{prefix}/{page}_{lang}.html', referrer=referrer, lang=lang)


app = Flask(__name__)


# graduate school application
@app.route('/graduate/')
def graduate_index():
    return template('home', 'graduate', 'en')


@app.route('/graduate/<page>')
def graduate_page(page):
    return template(page, 'graduate', 'en')


@app.route('/graduate/research/<page>')
def graduate_research_page(page):
    return template(page, 'graduate', 'en')


# job application
@app.route('/job/')
def job_index():
    return template('home', 'job', request.args.get('lang', 'en'))


@app.route('/job/<page>')
def job_page(page):
    return template(page, 'job', request.args.get('lang', 'en'))


@app.route('/job/research/<page>')
def job_research_page(page):
    return template(page, 'job', request.args.get('lang', 'en'))


@app.route('/')
def index():
    return redirect(url_for('job_index'))


if __name__ == '__main__':
    app.run()
