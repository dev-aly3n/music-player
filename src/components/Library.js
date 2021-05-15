import React from "react";
import LibrarySong from "./LibrarySong";

function Library({ songs, SETcurrentSong, audioRef, songPlaying, SETsongs, libraryStatus }) {
  return (
    <div className={`library ${libraryStatus ? 'active-library' : "" }`}>
      <h2 className=" text-2xl font-bold pl-6 py-3">Library</h2>
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
