import React, { useState } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import data from "./MusicData";

function App() {
  const [songs, SETsongs] = useState(data());
  const [currentSong, SETcurrentSong] = useState(songs[0]);
  const [songPlaying, SETsongPlaying] = useState(false);

  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        SETcurrentSong={SETcurrentSong}
        songPlaying={songPlaying}
        SETsongPlaying={SETsongPlaying}
      />
    </div>
  );
}

export default App;
