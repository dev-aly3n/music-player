import React from "react";
import LibrarySong from "./LibrarySong";

function Library({ songs, SETcurrentSong, audioRef,songPlaying }) {
  return (
    <div className="library">
      <h2 className=" text-2xl font-bold pl-6 py-3">Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            songs={songs}
            song={song}
            SETcurrentSong={SETcurrentSong}
            audioRef={audioRef}
            songPlaying={songPlaying}
          />
        ))}
      </div>
    </div>
  );
}

export default Library;
