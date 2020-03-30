'use strict';

let currentTrack;
let shuffleMode = false;

document.addEventListener("DOMContentLoaded", function (event) {
    console.log('ready');
    for (let track of tracks) {
        console.log('currentTrack-' + track[0]);
        document.getElementById(track[0]).addEventListener('playing', () => {
            console.log('currentTrack-' + currentTrack);
            console.log(track[0] + ' started in chrome');
            if (currentTrack !== track[0] && currentTrack) {
                document.getElementById(currentTrack).pause();
            }
            currentTrack = track[0];
        });

        document.getElementById(track[0]).addEventListener('ended', () => playRandomTrack());
    }

    document.getElementById('random').addEventListener('click', () => playRandomTrack());
});

function playRandomTrack() {
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    if (currentTrack) {
        document.getElementById(currentTrack).pause();
    }

    currentTrack = tracks[getRandomInt(tracksN)][0];
    console.log(currentTrack + ' to play next');
    document.getElementById(currentTrack).play();
}

let http = new XMLHttpRequest();
let params = '';
http.open('POST', 'opinion/ipsum/binny', true);

//Send the proper header information along with the request
http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

http.onreadystatechange = function () {//Call a function when the state changes.
    if (http.readyState === 4 && http.status === 200) {
        alert(http.responseText);
    }
};

function send(track) {
    console.log(track);
    http.send(params);
}

