import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong, songPlaying, SETsongPlaying }) => {
  const [songInfo, SETsongInfo] = useState({
    time: 0,
    duration: 0,
  });

  const audioRef = useRef(null);

  function playSongHandler() {
    if (songPlaying) {
      audioRef.current.pause();
      SETsongPlaying(!songPlaying);
    } else {
      audioRef.current.play();
      SETsongPlaying(!songPlaying);
    }
  }

  function songTimeHandler(e) {
    let currentTime = e.target.currentTime;
    let songDuration = e.target.duration;
    SETsongInfo({
      ...songInfo,
      time: currentTime,
      duration: songDuration,
    });
  }

  function timeCorrection(time) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }

  function sliderDrag(e){
    audioRef.current.currentTime = e.target.value;
    SETsongInfo({...songInfo, time: e.target.value});
  }

  return (
    <div className="player">
      <div className="time-control">
        <p>{timeCorrection(songInfo.time)}</p>
        <input type="range" min={0} max={songInfo.duration} value={songInfo.time} onChange={sliderDrag} />
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
      <audio
        onTimeUpdate={songTimeHandler}
        onLoadedMetadata={songTimeHandler}
        src={currentSong.audio}
        ref={audioRef}
      ></audio>
    </div>
  );
};

export default Player;
