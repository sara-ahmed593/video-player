const playlist = [
  "./src/img/videos/file_example_MP4_1280_10MG.mp4",
  "./src/img/videos/flower.mp4",
  "./src/img/videos/waterdrop.mp4"
];


const video = document.querySelector(".video");
const forward = document.querySelector(".forward");
const backward = document.querySelector(".backward");
const play = document.querySelector(".play");
const pause = document.querySelector(".pause");
const shape = document.querySelector(".shape");
const durationVideo = document.querySelector(".durationVideo");
const timevideo = document.querySelector(".currentTime");
const videoOverlay = document.querySelector(".overlay");
const mute = document.querySelector(".mute");
const unmute = document.querySelector(".unmute");
const soundOverlay = document.querySelector(".soundoverlay");
const combined = document.querySelector(".combined");
const progressBar = document.querySelector(".video-progess");
const soundBar = document.querySelector(".sound-progess");

let currentIndex = 0;

video.src = playlist[currentIndex];

// display total duration
video.addEventListener('loadedmetadata',()=>{
  
    durationVideo.innerHTML = video.duration.toFixed(2);
    
})

// Update current time and progress bar
video.addEventListener('timeupdate', () => {  
     timevideo.innerHTML = video.currentTime.toFixed(2);
      const progress = (video.currentTime / video.duration) * 100; 
  videoOverlay.style.width = `${progress}%`;  
  if(video.currentTime == video.duration){
pause.style.display = 'block';
     play.style.display = 'none';
  }
});

// Go to the next video in the playlist
forward.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  video.src = playlist[currentIndex];
  video.play();
  if(video.play()){
    play.style.display = 'block';
     pause.style.display = 'none';
}
 
});

// Go to the previous video in the playlist
backward.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  video.src = playlist[currentIndex];
   video.play();
   if(video.play()){
    play.style.display = 'block';
     pause.style.display = 'none';
}
  
});

// Play video when pause icon is clicked
pause.addEventListener('click',()=>{
    play.style.display = 'block';
     pause.style.display = 'none';
     video.play();
     

})
// pause video when Play icon is clicked
play.addEventListener('click',()=>{
    pause.style.display = 'block';
     play.style.display = 'none';
     video.pause();

})
// Stop video and reset
shape.addEventListener('click', ()=>{
    video.load()
     pause.style.display = 'block';
     play.style.display = 'none';
videoOverlay.style.width = '0%';
})

// Mute button clicked

mute.addEventListener('click', () => {
    
  mute.style.display = 'none';
  unmute.style.display = 'block';

    soundOverlay.style.width = `${video.volume * 100}%`; 

});

// Unmute button clicked

unmute.addEventListener('click', () => {
  
  mute.style.display = 'block';
  unmute.style.display = 'none';
   soundOverlay.style.width ='0%'
});
// full screen mode
combined.addEventListener('click', ()=>{
      if (video.requestFullscreen) {
      video.requestFullscreen();
    } 
}

)

// click video progress bsr
progressBar.addEventListener("click", (e) => {
    const rect = progressBar.getBoundingClientRect();

    let percent =
        (e.clientX - rect.left) / rect.width;

    video.currentTime = percent * video.duration;
});

// display volume icon

if(video.volume == 0) {
    mute.style.display = 'block';
  unmute.style.display = 'none';
   soundOverlay.style.width ='0%'
}   
else {
        
  mute.style.display = 'none';
  unmute.style.display = 'block';

    soundOverlay.style.width = `${video.volume * 100}%`; 

} 
// click sound progress bsr

soundBar.addEventListener("click", (e) => {
    const rect = soundBar.getBoundingClientRect();

    let percent = (e.clientX - rect.left) / rect.width;

    percent = Math.max(0, Math.min(1, percent));
video.volume = percent
    soundOverlay.style.width = `${percent * 100}%`;

   if (percent <= 0.01) {
    mute.style.display = 'block';
    unmute.style.display = 'none';
} else {
    mute.style.display = 'none';
    unmute.style.display = 'block';
}

 });
