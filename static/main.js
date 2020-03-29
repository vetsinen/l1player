'use strict';

let currentTrack;
let shuffleMode = false;

document.addEventListener("DOMContentLoaded", function (event) {
    console.log('ready');
    for (let track of files) {
        document.getElementById(track).addEventListener('playing', () => {
            console.log('currentTrack-' + currentTrack);
            console.log(track + ' started in chrome');
            if (currentTrack !== track && currentTrack) {
                document.getElementById(currentTrack).pause();
            }
            currentTrack = track;
        });

        document.getElementById(track).addEventListener('ended', () => playRandomTrack());
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

    shuffleMode = true;
    currentTrack = files[getRandomInt(tracksN)];
    console.log(currentTrack + ' to play next');
    document.getElementById(currentTrack).play();
}

let http = new XMLHttpRequest();
let params = 'orem=ipsum&name=binny';
http.open('POST', 'opinion', true);

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

