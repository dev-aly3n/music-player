import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import {changeBGColor} from '../util'


const Player = ({
  currentSong,
  songPlaying,
  SETsongPlaying,
  audioRef,
  songInfo,
  SETsongInfo,
  songs,
  SETcurrentSong,
  SETsongs,
}) => {
  ////functions
  //apply the active class to the library song if the user clicked on the skip-back or skip-forward btn
  function activeLibHandler(nexperv) {
    const newSong = songs.map((everySong) => {
      if (everySong.id === nexperv.id) {
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
  }



  // just play and pause the song by clicking on the
  function playSongHandler() {
    changeBGColor(currentSong.color[0], currentSong.color[1]);
    
    if (songPlaying) {
      audioRef.current.pause();
      SETsongPlaying(!songPlaying);
      document.body.style.animation ="";
    } else {
      audioRef.current.play();
      SETsongPlaying(!songPlaying);
    }
  }

  //get the time by second and make it look like 0:00
  function timeCorrection(time) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }

  //just watch the slider change and apply it to the setsonginfo on the time
  function sliderDrag(e) {
    audioRef.current.currentTime = e.target.value;
    SETsongInfo({ ...songInfo, time: e.target.value });
  }

  // skip the song if the user clicked on the skip-btns
  //at first we find the index of the current song and then if user clikced on forward we increase the index by 1
  // and if skip-back then we decrease the index and then set the current song to the new index
  async function skipHandler(direction) {
    let currentIndex = songs.findIndex(
      (thisSong) => thisSong.id === currentSong.id
    );
    if (direction === "skip-forward") {
      //set current song
      await SETcurrentSong(songs[(currentIndex + 1) % songs.length]);
      changeBGColor(currentSong.color[0], currentSong.color[1]);
      //set the active property to the selected song to apply a class
      activeLibHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      //to avoid to getting a negative number, we check it here
      //it's BCS we want to if the song reached to the first and user clicked to the skip back the it jump to the end of the list
      if (currentIndex < 1) {
        currentIndex = songs.length;
      }
      await SETcurrentSong(songs[(currentIndex - 1) % songs.length]);
      changeBGColor(currentSong.color[0], currentSong.color[1]);
      activeLibHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (songPlaying) {
      audioRef.current.play();
    }
  }

  // style variable to apply to the range input
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  ////jsx
  return (
    <div className="player">
      {/* start time - input[range] - end time */}
      <div className="time-control">
        <p>{timeCorrection(songInfo.time)}</p>
        {/* we apply a gradient background to the range slider based on the color values on the data object
        ... at first we removed the deafult styles and then we put another div on the slider and apply these to that div */}
        <div
          className="track"
          style={{
            background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`,
          }}
        >
          <input
            type="range"
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.time}
            onChange={sliderDrag}
          />
          {/* apply the translateX animation to the range slider */}
          <div
            style={trackAnim}
            className="animate-track transition-all duration-1000"
          ></div>
        </div>
        {/* check if the duration avilable now and if it doesnt just show 0:00 (not NaN) */}
        <p>{songInfo.duration ? timeCorrection(songInfo.duration) : "0:00"}</p>
      </div>
      {/* player btns and thier event handlers */}
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={songPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
