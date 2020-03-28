from flask import Flask
from flask import render_template
from os import listdir
import pathlib
print(pathlib.Path(__file__).parent.absolute())
app = Flask(__name__)

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


if __name__ == '__main__':
    app.run()
