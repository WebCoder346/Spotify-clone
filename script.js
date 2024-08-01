console.log("Welcome to Spotify :)");
const songParent = document.querySelector(".rightCon .songParent");
const playlistCon = document.querySelector(".playlistCon");
const songCon = document.querySelector(".songsContainer .songCon");
const row1 = document.querySelector(".songParent .row");
const row2 = document.querySelector(".songsContainer .row2");
const songImg = document.querySelector(".imgBox img");
const songName = document.querySelector(".imgBox h5");
const singerPara = document.querySelector(".imgBox p");
const controlCon = document.querySelector(".controlCon");
const playPauseBtn = document.querySelectorAll(".playPauseBtn");
const nextBtn = document.querySelectorAll(".forward")
const backBtn = document.querySelectorAll(".backward");
const mainSongCon = document.querySelector(".mainSongCon");
const mainSongConBackBtn = document.querySelector(".mainSongCon i");
const mainSongImg = document.querySelector(".mainSongCon .imgBox img");
const maxBtn = document.querySelector("#maxBtn");
const rangeBar = document.querySelector("#rangeBar");
const currentTimePara = document.querySelector(".currentTimePara");
const durationPara = document.querySelector(".durationTimePara");
let newIndex;
let audioElement;
let songPlay = false;
let minimize = false;
// open song window
const albumBoxes = Array.from(document.querySelectorAll(".playlistCon .albumBox"));
albumBoxes.forEach((albumBox) => {
  albumBox.addEventListener("click", () => {
    songParent.style.display = "none";
    row1.style.display = "none";
    row2.style.display = "flex";
    songCon.style.display = "flex";
  })
})

let songBoxes = [];
let index = [];
// Show all the songs
for (let i = 0; i < arijit1.length; i++) {
  songBox = document.createElement("div");
  songBox.className = "songBox";
  let image = document.createElement("img");
  image.src = arijit1[i].imgSrc;
  image.alt = "img1";
  let infoDiv = document.createElement("div");
  infoDiv.setAttribute("id", `${i}`);
  infoDiv.className = "info";
  var heading = document.createElement("h4");
  heading.textContent = `${arijit1[i].name}`;
  let paragraph = document.createElement("p");
  paragraph.textContent = `${arijit1[i].author}`;
  infoDiv.appendChild(heading);
  infoDiv.appendChild(paragraph);
  songBox.appendChild(image);
  songBox.appendChild(infoDiv);
  songCon.appendChild(songBox);
  songBoxes.push(songBox)
}
document.querySelector(".songsContainer .row2 i").addEventListener("click", () => {
  row2.style.display = "none";
  songCon.style.display = "none";
  songParent.style.display = "flex";
  playlistCon.style.display = "flex"
  row1.style.display = "flex";
})
songBoxes.forEach((box, ind) => {
  box.addEventListener("click", (ele) => {
    audioElement = arijit1[ind].audioSrc;
    makePlayPause(ind);
    backNextFnc(ind);
  })
})

function makePlayPause(ind) {
  let audio = document.getElementById("audio");
  updateRangebar(audio, ind);
  audio.src = audioElement;
  songPlay = true;
  audio.play();
  songImg.src = arijit1[ind].imgSrc;
  mainSongImg.src = arijit1[ind].imgSrc;
  singerPara.textContent = `${arijit1[ind].author}`;
  songName.textContent = `${arijit1[ind].name}`;
  playPauseBtn.forEach((btn) => {
    btn.classList.remove("fa-play-circle");
    btn.classList.add("fa-pause-circle");
  })
  playBtnFnc(audio);
}

function playBtnFnc(audio) {
  playPauseBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const btn1 = document.querySelector(".btn1");
      const btn2 = document.querySelector(".btn2");
      if (songPlay) {
        btn1.classList.remove("fa-pause-circle");
        btn1.classList.add("fa-play-circle");
        btn2.classList.remove("fa-pause-circle");
        btn2.classList.add("fa-play-circle");
        audio.pause();
        setTimeout(() => {
          songPlay = false;
        }, 100)
      }
      else {
        btn1.classList.remove("fa-play-circle");
        btn1.classList.add("fa-pause-circle");
        btn2.classList.remove("fa-play-circle");
        btn2.classList.add("fa-pause-circle");
        audio.play();
        setTimeout(() => {
          songPlay = true;
        }, 100)
      }
    })
  })
}

function backNextFnc(ind) {
  backBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (ind > 0) {
        backIndex = ind - 1;
        refresh(ind -= 1);
        makePlayPause(ind);
      }
    })
  })
  nextBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      if ((ind + 1) < songBoxes.length) {
        nextIndex = ind + 1;
        refresh(ind += 1)
        makePlayPause(ind);
      }
    })
  })
}

function refresh(newIndex) {
  songImg.src = arijit1[newIndex].imgSrc;
  mainSongImg.src = arijit1[newIndex].imgSrc;
  singerPara.textContent = `${arijit1[newIndex].author}`;
  songName.textContent = `${arijit1[newIndex].name}`;
  audioElement = arijit1[newIndex].audioSrc;
  songPlay = true;
}
maxBtn.addEventListener("click", () => {
  if (minimize) {
    maxBtn.classList.remove("fa-minimize");
    maxBtn.classList.add("fa-maximize");
    songParent.style.display = "flex";
    playlistCon.style.display = "flex";
    row1.style.display = "flex";
    row2.style.display = "flex";
    songCon.style.display = "flex"
    mainSongCon.style.display = "none";
    minimize = false;
  }
  else {
    minimize = true;
    maxBtn.classList.remove("fa-maximize");
    maxBtn.classList.add("fa-minimize");
    songParent.style.display = "none";
    playlistCon.style.display = "none";
    row1.style.display = "none";
    row2.style.display = "none";
    songCon.style.display = "none"
    mainSongCon.style.display = "flex";
  }
});
mainSongConBackBtn.addEventListener("click", () => {
  mainSongCon.style.display = "none";
  row2.style.display = "flex";
  songCon.style.display = "flex";
  maxBtn.classList.remove("fa-minimize");
  maxBtn.classList.add("fa-maximize");
});

// Function for rangeBar

function updateRangebar(audio, ind) {
  audio.addEventListener("timeupdate", () => {
    if (audio.currentTime == audio.duration) {
      if ((ind + 1) < songBoxes.length) {
        songPlay = true;
        nextIndex = ind + 1;
        refresh(ind += 1)
        makePlayPause(ind);
      }
    }
    let minTime = parseInt(Math.floor(audio.currentTime / 60));
    let secTime = parseInt(Math.floor(audio.currentTime % 60));

    minTime < 10 ? minTime = `0${minTime}` : minTime = minTime;
    secTime < 10 ? secTime = `0${secTime}` : secTime = secTime;

    let dmt = parseInt(Math.floor(audio.duration / 60));
    let dst = parseInt(Math.floor(audio.duration % 60));
    dmt < 10 ? dmt = `0${dmt}` : dmt = dmt;
    dst < 10 ? dst = `0${dst}` : dst = dst;
    if (minTime || secTime || dmt || dst) {
      currentTimePara.innerText = `${minTime}:${secTime}`;
      durationPara.innerText = `${dmt}:${dst}`;
    }
    progress = parseInt((audio.currentTime / audio.duration) * 100);
    rangeBar.value = progress;
    changeRangebar(audio);
  })
}
const changeRangebar = (audio) => {
  document.querySelector("#rangeBar").addEventListener("change", () => {
    audio.currentTime = rangeBar.value * audio.duration / 100;
  })
}