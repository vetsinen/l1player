from os import listdir

def process_names(files):
    rez=[]
    for f in files:
        a = f
        a = a[:-4]
        if (a[4:7]) == 'a-v':
            a = a[9:]
        rez.append(a)
    return rez






