import React from "react";

const LibrarySong = ({
  song,
  SETcurrentSong,
  songs,
  audioRef,
  songPlaying,
  SETsongs,
}) => {
  ////functions
  //set current song to the selected song(clicked song)
  async function songSelectHandler() {
    await SETcurrentSong(song);

    //map over the songs and for every single song, if it was the selected song give it the property active: true
    //if it isnt the selected song, so give it avtive: flase
    //it will add some class to the active one and will help us to play the right selected song
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
    await SETsongs(newSong);
    //if the play btn already activated so play the selected song or no, just render the selcted song
    if (songPlaying) {
      audioRef.current.play();
    }
  }

  ////jsx
  return (
    <div
      className={`library-song-description ${song.active ? "selected" : ""} `}
      onClick={songSelectHandler}
    >
      {/* in the code above we check if it is active so apply selected style
    or no just apply nothing */}
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
