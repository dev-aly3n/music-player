import React, { useState, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import data from "./MusicData";
import Library from "./components/Library";

function App() {
  const audioRef = useRef(null);
  const [songs, SETsongs] = useState(data());
  const [currentSong, SETcurrentSong] = useState(songs[0]);
  const [songPlaying, SETsongPlaying] = useState(false);
  const [songInfo, SETsongInfo] = useState({
    time: 0,
    duration: 0,
  });

  function songTimeHandler(e) {
    let currentTime = e.target.currentTime;
    let songDuration = e.target.duration;
    SETsongInfo({
      ...songInfo,
      time: currentTime,
      duration: songDuration,
    });
  }

  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player
        songInfo={songInfo}
        SETsongInfo={SETsongInfo}
        audioRef={audioRef}
        currentSong={currentSong}
        SETcurrentSong={SETcurrentSong}
        songPlaying={songPlaying}
        SETsongPlaying={SETsongPlaying}
      />
      <Library
        songs={songs}
        SETcurrentSong={SETcurrentSong}
        audioRef={audioRef}
        songPlaying={songPlaying}
      />
      <audio
        onTimeUpdate={songTimeHandler}
        onLoadedMetadata={songTimeHandler}
        src={currentSong.audio}
        ref={audioRef}
      ></audio>
    </div>
  );
}

export default App;
