import React from "react";
import LibrarySong from "./LibrarySong";

function Library({
  songs,
  SETcurrentSong,
  audioRef,
  songPlaying,
  SETsongs,
  libraryStatus,
}) {
  ////jsx
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2 className=" text-2xl font-bold pl-6 py-3">Library</h2>
      {/*map over the songs array and for every single song build an component of LibrarySong*/}
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            songs={songs}
            song={song}
            key={song.id}
            SETcurrentSong={SETcurrentSong}
            audioRef={audioRef}
            songPlaying={songPlaying}
            SETsongs={SETsongs}
          />
        ))}
      </div>
    </div>
  );
}

export default Library;
