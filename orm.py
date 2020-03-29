import pathlib
from os import listdir
import sqlite3
from flask import g

DATABASE = str(pathlib.Path(__file__).parent.absolute()) + '/opinion'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

def sync_trackfiles_to_db():
    db = sqlite3.connect(DATABASE)
    cursor = db.cursor()
    genres = {'sal':'salsa casino','bac':'bachata','kim':'urban kiz','men':'merengue'}
    staticpath = str(pathlib.Path(__file__).parent.absolute()) + '/static/mp3'
    files = [f for f in listdir(staticpath)]
    for file in files:
        start = (file[:3])
        genre = None
        if file[4]=='a' and start in genres.keys():
            genre = genres[start]
        sql = f"insert into opinion (genre, trackname) values ('{genre}','{file[:-4]}');"
        try:
            cursor.execute(sql)
            db.commit()
        except BaseException:
            pass
            #seems record was inserted before
    db.close()

def get_tracks():
    db = sqlite3.connect(DATABASE)
    cursor = db.cursor()
    rez = [list(row) for row in cursor.execute("SELECT trackname,genre,velocity FROM opinion")]
    db.close()
    return rez

if __name__=='__main__':
    db = sqlite3.connect(DATABASE)

    sync_trackfiles_to_db()

    db.close()


