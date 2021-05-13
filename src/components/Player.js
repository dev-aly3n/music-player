import React,{useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({currentSong,songPlaying, SETsongPlaying}) => {

  const audioRef = useRef(null);

  function playSongHandler() {
    if(songPlaying){
      audioRef.current.pause();
      SETsongPlaying(!songPlaying);
    } else {
      audioRef.current.play();
      SETsongPlaying(!songPlaying);
    }
  }

  return (
    <div className="player">
      <div className="time-control">
        <p>start time</p>
        <input type="range" />
        <p>end time</p>
      </div>
      <div className="play-control">
      <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
      <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={faPlay} />
      <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />
      </div>
      <audio src={currentSong.audio} ref={audioRef}></audio>
    </div>
  );
};

export default Player;
