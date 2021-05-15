import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  songPlaying,
  SETsongPlaying,
  audioRef,
  songInfo,
  SETsongInfo,
}) => {
  function playSongHandler() {
    if (songPlaying) {
      audioRef.current.pause();
      SETsongPlaying(!songPlaying);
    } else {
      audioRef.current.play();
      SETsongPlaying(!songPlaying);
    }
  }

  function timeCorrection(time) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }

  function sliderDrag(e) {
    audioRef.current.currentTime = e.target.value;
    SETsongInfo({ ...songInfo, time: e.target.value });
  }

  return (
    <div className="player">
      <div className="time-control">
        <p>{timeCorrection(songInfo.time)}</p>
        <input
          type="range"
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.time}
          onChange={sliderDrag}
        />
        <p>{timeCorrection(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={songPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
