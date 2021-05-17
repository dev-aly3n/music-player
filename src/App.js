import React, { useState, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import data from "./MusicData";
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
  const audioRef = useRef(null);
  const [songs, SETsongs] = useState(data());
  const [currentSong, SETcurrentSong] = useState(songs[0]);
  const [songPlaying, SETsongPlaying] = useState(false);
  const [songInfo, SETsongInfo] = useState({
    time: 0,
    duration: 0,
    animationPercentage:0,
  });
  const [libraryStatus, SETlibraryStatus] = useState(false);

  function songTimeHandler(e) {
    let currentTime = e.target.currentTime;
    let songDuration = e.target.duration;
    const roundedCurrent = Math.round(currentTime);
    const roundedDuration = Math.round(songDuration);
    const animation = Math.round((roundedCurrent/roundedDuration)*100);

    SETsongInfo({
      ...songInfo,
      time: currentTime,
      duration: songDuration,
      animationPercentage: animation,
    });
  }

  async function songEndHandler(){
    let currentIndex = songs.findIndex(
      (thisSong) => thisSong.id === currentSong.id);
     await SETcurrentSong(songs[(currentIndex + 1) % songs.length]);
     if(songPlaying) {audioRef.current.play()}
  }

  return (
    <div className={`app ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} SETlibraryStatus={SETlibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        songInfo={songInfo}
        SETsongInfo={SETsongInfo}
        audioRef={audioRef}
        currentSong={currentSong}
        SETcurrentSong={SETcurrentSong}
        songPlaying={songPlaying}
        SETsongPlaying={SETsongPlaying}
        songs={songs}
        SETcurrentSong={SETcurrentSong}
        SETsongs={SETsongs}
      />
      <Library
        libraryStatus={libraryStatus}
        songs={songs}
        SETcurrentSong={SETcurrentSong}
        audioRef={audioRef}
        songPlaying={songPlaying}
        SETsongs={SETsongs}
      />
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
