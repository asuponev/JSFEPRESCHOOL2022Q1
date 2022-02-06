const audioPlayer = document.querySelector('.app');
const audio = audioPlayer.querySelector('.audio');
const buttonPlay = audioPlayer.querySelector('.button-play');
const cover = audioPlayer.querySelector('.song-info__cover');
const volume = audioPlayer.querySelector('.volume');
const volumeIconLow = audioPlayer.querySelector('.volume-icon low')
const currTimeElement = audioPlayer.querySelector('.current');
const durationElement = audioPlayer.querySelector('.duration');

let playStatus = false;

// Play and pause audio
function playPauseAudio() {
    if (playStatus === false) {
        buttonPlay.className = 'button button-pause';
        audio.play();
        cover.classList.add('playing');
        playStatus = true;
    } else {
        buttonPlay.className = 'button button-play';
        audio.pause();
        cover.classList.remove('playing');
        playStatus = false;
    }
}

buttonPlay.addEventListener('click', playPauseAudio);

// Volume
volume.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// Current time and duration
function currentTime() {
    let currentMinutes = Math.floor(audio.currentTime / 60);
    let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(audio.duration / 60);
    let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);

    currTimeElement.innerHTML = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
    durationElement.innerHTML = `${durationMinutes}:${durationSeconds}`;
};

audio.addEventListener('timeupdate', currentTime);