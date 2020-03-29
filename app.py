from flask import Flask
from flask import render_template
from os import listdir
import pathlib
import sqlite3
from flask import g

app = Flask(__name__)

DATABASE = str(pathlib.Path(__file__).parent.absolute())+'/opinion'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def process_names(files):
    rez=[]
    for f in files:
        a = f
        a = a[:-4]
        # if (a[4:7]) == 'a-v':
        #     a = a[9:]
        #a = a.ljust(50,' ')
        rez.append(a)
    return rez

@app.route('/')
def index():
    staticpath = str(pathlib.Path(__file__).parent.absolute())+'/static/mp3'
    print(staticpath)
    files = [f for f in listdir(staticpath)]
    return render_template('index.html', files = process_names(files))

@app.route('/opinion', methods=['POST'])
def opinion():
    pass


if __name__ == '__main__':
    app.run()
