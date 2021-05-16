import React,{useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import {playAudio} from '../util';

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

  useEffect(()=>{
    const newSong = songs.map((everySong) => {
      if (everySong.id === currentSong.id) {
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
  }, [currentSong])

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

  function skipHandler(direction) {
    let currentIndex = songs.findIndex(
      (thisSong) => thisSong.id === currentSong.id
    );
    if (direction === "skip-forward") {
      SETcurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if (currentIndex < 1) {
        currentIndex = songs.length;
      }
      SETcurrentSong(songs[(currentIndex - 1) % songs.length]);
    }
    playAudio(songPlaying, audioRef)
  }

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`
  }

  return (
    <div className="player">
      <div className="time-control">
        <p>{timeCorrection(songInfo.time)}</p>
        <div className="track" style={{background:`linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`}} >
        <input
        
          type="range"
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.time}
          onChange={sliderDrag}
        />
        <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? timeCorrection(songInfo.duration) : "0:00"}</p>
      </div>
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
