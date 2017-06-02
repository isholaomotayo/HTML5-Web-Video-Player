/**
 * Created by omota on 6/2/2017.
 */

window.addEventListener('load', function () {

    video = document.getElementById('video');
    playButton = document.getElementById('play-button');
    pbar = document.getElementById('pbar');
    pbarContainer = document.getElementById('pbar-container');
    timeField = document.getElementById('time-field');
    soundButton = document.getElementById('sound-button');
    sbarContainer = document.getElementById('sbar-container');
    sbar = document.getElementById('sbar');
    fullscreenButton = document.getElementById('fullscreen-button');
    screenButton = document.getElementById('screen-button');
    video.load();
    video.addEventListener('canplay', function () {
        playButton.addEventListener('click', playOrPause, false);
        pbarContainer.addEventListener('click', skip, false);
        screenButton.addEventListener('click', playOrPause, false);
        soundButton.addEventListener('click', muteOrUnmute, false);
        sbarContainer.addEventListener('click', changeVolume, false);
        fullscreenButton.addEventListener('click', fullscreen, false);
        updatePlayer();
    }, false);


    function  playOrPause(){
        if(video.paused){video.play();
            playButton.src= 'images/pause.png';
            update = setInterval(updatePlayer, 30);
            screenButton.parentNode.style.display='none'}
        else{video.pause();
            playButton.src= 'images/play.png';
            window.clearInterval(update);
            screenButton.parentNode.style.display='block'}
    }
    function updatePlayer() {
        var percentage = (video.currentTime/video.duration)*100;
        pbar.style.width = percentage + '%';
        timeField.innerHTML = getFormattedTime();
        if(video.ended){
            window.clearInterval(update);
            playButton.src='images/replay.png';
            screenButton.parentNode.style.display='block';
            screenButton.src='images/replay.png'

        }else if (video.paused){
            playButton.src = 'images/play.png';
            screenButton.src = 'images/play.png';
        }
    }
    function skip(ev){
        var mouseX = ev.pageX - pbarContainer.offsetLeft;
        var barWidth =window.getComputedStyle(pbarContainer).getPropertyValue('width');
        barWidth = parseFloat(barWidth.substr(0, barWidth.length - 2));
        video.currentTime = (mouseX/barWidth)*video.duration;
        updatePlayer();
    }
    function getFormattedTime() {
        var seconds= Math.round(video.currentTime);
        var minutes = Math.floor(seconds/60);
        if (minutes > 0) seconds -= minutes*60;
        if (seconds.toString().length === 1) seconds = '0'+ seconds;
        var totalSeconds = Math.round(video.duration);
        var totalMinutes = Math.floor(totalSeconds/60);
        if (totalMinutes > 0) totalSeconds -= totalMinutes*60;
        if (totalSeconds.toString().length === 1) totalSeconds = '0'+ totalSeconds;
        return minutes +' : ' + seconds + ' / ' + totalMinutes + ':' + totalSeconds

    }
    function muteOrUnmute(){
        video.muted ?  (video.muted = false , soundButton.src='images/sound.png', sbar.style.display = 'block' ):
            (video.muted= true, soundButton.src='images/mute.png', sbar.style.display = 'none')
    }
    function changeVolume(ev) {
        var mouseX = ev.pageX - sbarContainer.offsetLeft;
        var barWidth =window.getComputedStyle(sbarContainer).getPropertyValue('width');
        barWidth = parseFloat(barWidth.substr(0, barWidth.length - 2));
        video.volume = (mouseX/barWidth);
        sbar.style.width = (mouseX/barWidth)* 100 + '%';
        video.muted = false ; soundButton.src='images/sound.png'; sbar.style.display = 'block' ;
    }
    function fullscreen(){
        if (video.requestFullscreen){
                video.requestFullscreen();
        }else if (video.webkitRequestFullscreen){
                video.webkitRequestFullscreen();
        }else if (video.mozRequestFullscreen){
                video.mozRequestFullscreen();
        }else if (video.msRequestFullscreen){
                video.msRequestFullscreen();
        }
    }

}, false);


