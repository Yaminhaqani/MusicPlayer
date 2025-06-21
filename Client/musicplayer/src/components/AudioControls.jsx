
import { FaBackwardStep, FaForwardStep } from "react-icons/fa6";
import { IoPause } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import React, { useContext } from 'react'
import { AudioContext } from "../context/AudioContext";
import { MyContext } from "../context/Context";

const AudioControls = () => {


    const {isControlsVisible, handlePrevious, handlePlayPause, handleNext, audioProgress, handleProgressChange, formatDuration, audioRef, songs, currentSong, isPlaying} = useContext(AudioContext);
    const {loggedIn} = useContext(MyContext)

  return (
    <div>
        {isControlsVisible && loggedIn && (
    <div className="audio-controls fixed bottom-0 w-full bg-gray-800 p-4 flex items-center justify-between text-white">
      <div className="buttons w-[10%] flex justify-between">
      <button onClick={handlePrevious} className="text-white">
        <FaBackwardStep className="h-5 w-5" />
      </button>
      <button className='' onClick={() => handlePlayPause(songs.find(song => song._id === currentSong))}>
        {isPlaying ? <IoPause className="h-6 w-6"/> : <FaPlay/>}
      </button>
      <button onClick={handleNext} className="text-white">
        <FaForwardStep className="h-5 w-5" />
      </button>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={audioProgress}
        onChange={handleProgressChange}
        className=" cursor-pointer focus:outline-none absolute bottom-[53px] left-0 right-0 h-[2px] appearance-none "
        style={{
          background: `linear-gradient(to right, #de0b0b ${audioProgress}%, #ccc ${audioProgress}%)`, // Green for played, gray for unplayed
        }}
      />
      <span>{formatDuration(audioRef.current.currentTime)} / {formatDuration(audioRef.current.duration)}</span>
    </div>
  )}
    </div>
  )
}

export default AudioControls



