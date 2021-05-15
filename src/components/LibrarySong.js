import React from "react";
import {playAudio} from '../util';

const LibrarySong = ({
  song,
  SETcurrentSong,
  songs,
  audioRef,
  songPlaying,
  SETsongs,
}) => {
  async function songSelectHandler() {
    await SETcurrentSong(song);

    const newSong = songs.map((everySong) => {
      if (everySong.id === song.id) {
        return {
          ...everySong,
          active: true,
        };
      } else {
        return {
          ...everySong,
          active: false,
        };
      }
    });
    SETsongs(newSong);
playAudio(songPlaying, audioRef);

  }

  return (
    <div
      className={`library-song-description ${song.active ? "selected" : ""} `}
      onClick={songSelectHandler}
    >
      <img alt={song.name} src={song.cover}></img>
      <div className="song-info">
        <h3 className=" text-lg  font-semibold text-gray-600 ml-2 mt-1">
          {song.name}
        </h3>
        <h4 className=" text-sm font-normal text-gray-600 ml-2 mt-1">
          {song.artist}
        </h4>
      </div>
    </div>
  );
};

export default LibrarySong;
