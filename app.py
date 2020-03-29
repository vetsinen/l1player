from flask import Flask
from flask import render_template
from os import listdir
import pathlib
from orm import get_tracks

app = Flask(__name__)


def process_names(files):
    rez = []
    for f in files:
        a = f
        a = a[:-4]
        # if (a[4:7]) == 'a-v':
        rez.append(a)
    return rez


@app.route('/')
def index():
    # staticpath = str(pathlib.Path(__file__).parent.absolute()) + '/static/mp3'
    # files = [f for f in listdir(staticpath)]
    return render_template('index.html', tracks=get_tracks())


@app.route('/opinion', methods=['POST'])
def opinion():
    return 'added'






if __name__ == '__main__':
    app.run()
