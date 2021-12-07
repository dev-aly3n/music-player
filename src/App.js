import React, { useState, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import data from "./MusicData";
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
  ////useRef
  //we use it to point to the audio element in html
  const audioRef = useRef(null);

  ////useState
  //an array of objects that contains song info
  const [songs, SETsongs] = useState(data());
  //to see which song is now playing or selected
  const [currentSong, SETcurrentSong] = useState(songs[0]);
  //watch if the song is playing now or paused
  const [songPlaying, SETsongPlaying] = useState(false);
  //get the song info from the object
  const [songInfo, SETsongInfo] = useState({
    time: 0,
    duration: 0,
    animationPercentage: 0,
  });
  //watch if the library is expanding now or not
  const [libraryStatus, SETlibraryStatus] = useState(false);

  ////functions
  //multiple job, set songInfo by data that received from the data.js and set them to the object
  function songTimeHandler(e) {
    let currentTime = e.target.currentTime;
    let songDuration = e.target.duration;
    const roundedCurrent = Math.round(currentTime);
    const roundedDuration = Math.round(songDuration);
    const animation = ((roundedCurrent / roundedDuration) * 100).toFixed(2);
    SETsongInfo({
      ...songInfo,
      time: currentTime,
      duration: songDuration,
      animationPercentage: animation,
    });
  }
  // watch if the song is playing now and reached to the end, then skip the song to the next one
  async function songEndHandler() {
    let currentIndex = songs.findIndex(
      (thisSong) => thisSong.id === currentSong.id
    );
    await SETcurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (songPlaying) {
      audioRef.current.play();
    }
  }

  //// jsx
  return (
    <div className={`app ${libraryStatus ? "library-active" : ""}`}>
      {/* navigation library btn and logo */}
      <Nav libraryStatus={libraryStatus} SETlibraryStatus={SETlibraryStatus} />
      {/* song component that hold every single song information */}
      <Song currentSong={currentSong} />
      {/* player component hold btns and range input for playing the song */}
      <Player
        songInfo={songInfo}
        SETsongInfo={SETsongInfo}
        audioRef={audioRef}
        currentSong={currentSong}
        SETcurrentSong={SETcurrentSong}
        songPlaying={songPlaying}
        SETsongPlaying={SETsongPlaying}
        songs={songs}
        SETsongs={SETsongs}
      />
      {/* library hold the songs to select */}
      <Library
        libraryStatus={libraryStatus}
        songs={songs}
        SETcurrentSong={SETcurrentSong}
        audioRef={audioRef}
        songPlaying={songPlaying}
        SETsongs={SETsongs}
      />
      {/* audio element that hold the url of the song */}
      <audio
        onTimeUpdate={songTimeHandler}
        onLoadedMetadata={songTimeHandler}
        src={currentSong.audio}
        ref={audioRef}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
