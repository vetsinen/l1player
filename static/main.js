'use strict';

let currentTrack;

document.addEventListener("DOMContentLoaded", function (event) {
    for (let track of tracks) {
        let trackSelector = document.getElementById(track[0]).getElementsByTagName('audio')[0];
        console.log('processing ' + trackSelector);
        trackSelector.addEventListener('playing', () => {
            console.log('currentTrack-' + currentTrack);
            console.log(track[0] + ' started in chrome');
            if (currentTrack !== track[0] && currentTrack) {
                document.getElementById(currentTrack).getElementsByTagName('audio')[0].pause();
            }
            currentTrack = track[0];
        });
        trackSelector.addEventListener('ended', () => playRandomTrack());
    }

    document.getElementById('random').addEventListener('click', () => playRandomTrack());
});

function playRandomTrack() {
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    if (currentTrack) {
        document.getElementById(currentTrack).getElementsByTagName('audio')[0].pause();
    }

    currentTrack = tracks[getRandomInt(tracksN)][0];
    console.log(currentTrack + ' to play next');
    document.getElementById(currentTrack).getElementsByTagName('audio')[0].play();
}


function send(track) {
    let http = new XMLHttpRequest();
    let params = '';
    let url = 'opinion/'+track+'/'
        + document.getElementById(track).getElementsByClassName('genre')[0].value
        + '/' + document.getElementById(track).getElementsByClassName('velocity')[0].value;

    http.open('POST', url, true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function () {//Call a function when the state changes.
        if (http.readyState === 4 && http.status === 200) {
            console.log(http.responseText);
        }
    };
    console.log(track);
    http.send(params);
}

