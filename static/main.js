'use strict';

let currentTrack;

document.addEventListener("DOMContentLoaded", function (event) {
    console.log('ready');
    for (let track of files) {
    document.getElementById(track).addEventListener('playing', () => {
        console.log('currentTrack-'+currentTrack);
        console.log(track + ' started in chrome');
        if (currentTrack){
            document.getElementById(currentTrack).pause();
        }
        currentTrack = track;
    });
}
});

function play(trackname) {
    console.log(trackname);
}
