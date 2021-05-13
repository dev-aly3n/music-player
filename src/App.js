import React, {useState} from 'react';
import Player from './components/Player';
import Song from './components/Song';
import data from './MusicData';

function App() {

  const [songs, SETsongs] = useState(data());
  const [currentSong, SETcurrentSong] = useState(songs[0]);

  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player/>
      
     </div>
  );
}

export default App;
