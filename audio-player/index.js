const audioPlayer = document.querySelector('.app');
const audio = audioPlayer.querySelector('.audio');
const buttonPlay = audioPlayer.querySelector('.button-play');
const cover = audioPlayer.querySelector('.song-info__cover');


let playStatus = false;

// Play and pause audio
function playPauseAudio() {
    if (playStatus === false) {
        buttonPlay.className = "button button-pause";
        audio.play();
        cover.classList.add("playing");
        playStatus = true;
    } else {
        buttonPlay.className = "button button-play";
        audio.pause();
        cover.classList.remove("playing");
        playStatus = false;
    }
}

buttonPlay.addEventListener('click', playPauseAudio);