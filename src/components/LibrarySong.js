import React from "react";

const LibrarySong = ({ song }) => {
  return (
    <div className="library-song-description">
      <img alt={song.name} src={song.cover}></img>
      <div className="song-info">
        <h3 className=" text-lg  font-semibold text-gray-600 ml-2 mt-1">{song.name}</h3>
        <h4 className=" text-sm font-normal text-gray-600 ml-2 mt-1">{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
