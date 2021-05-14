import React from "react";

const LibrarySong = ({song}) => {
  return (
    <div className="library-song">
      <img alt={song.name} src={song.cover}></img>
      <h2>{song.name}</h2>
      <h3>{song.artist}</h3>
    </div>
  );
};

export default LibrarySong;
