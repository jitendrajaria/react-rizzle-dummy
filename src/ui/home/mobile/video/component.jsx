import React, { useRef, useState, useEffect } from 'react';
import './style.css'

const VideoItemContainer = (props) => {

  const videoRef = useRef();
  const [videoState, setVideoState] = useState({ isPaused: true, isShowingPlayIcon: true });

  useEffect(() => {
    if (videoRef.current) {
      if (props.index !== props.currentIndex) {
        videoRef.current.pause();
        const video = videoState;
        video.isPaused = true;
        video.isShowingPlayIcon = true;
      }
    }
  }, [props])

  function handleVideo(index) {
    props.setCurrentVideoPlayingIndex(index);
    if (videoRef.current) {
      if (videoRef.current.paused) {
        setVideoState(state => {
          state.isPaused = false;
          return { ...state };
        })
        videoRef.current.play();
        let timeout = setTimeout(() => {
          setVideoState(state => {
            state.isShowingPlayIcon = false;
            return { ...state }
          })
          clearInterval(timeout)
        }, 200)
      } else {
        videoRef.current.pause();
        setVideoState(state => {
          state.isPaused = true;
          state.isShowingPlayIcon = true;
          return { ...state };
        })
      }
    }
  }

  function handleEnded() {
    props.handleEnded();
  }

  return (
    <div className="video-item-container" onClick={() => handleVideo(props.index)}>
      <video muted={false} ref={videoRef} poster={props.poster} onEnded={handleEnded}>
        <source src={props.src}
          type="video/mp4" />
              Sorry, your browser doesn't support embedded videos.
      </video>
      <div className={`control-icon-container  ${videoState.isPaused ? "semi-opaque" : "bg-none"}`}>
        <div className="control-icon">
          {videoState.isPaused ?
            <i className="fa fa-play"></i> :
            videoState.isShowingPlayIcon ?
              <i className="fa fa-pause"></i> : ""}
        </div>
      </div>

    </div>

  );
}

export default VideoItemContainer;
