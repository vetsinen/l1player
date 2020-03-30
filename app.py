from flask import Flask
from flask import render_template
from orm import get_tracks, save_opinion

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
    return render_template('index.html', tracks=get_tracks())


@app.route('/opinion/<track>/<genre>/<velocity>', methods=['POST'])
def opinion(track, genre, velocity):
    msg = f"track {track} is a {genre} with {velocity} velocity"
    print(msg)
    save_opinion(track, genre, velocity)
    return msg


if __name__ == '__main__':
    app.run()
