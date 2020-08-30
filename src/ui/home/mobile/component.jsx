import React, { useRef, useEffect, useState } from 'react';
import './style.css'
import VideoItemContainer from './video/component';
import UserComponent from '../user/component';
const VIDEO_HEIGHT = 716

const MobileComponent = (props) => {
  const slideRef = useRef();
  const userRef = useRef();
  const [state, setState] = useState({ top: 0, y: 0, x: 0, left: 0, isDown: false, isLast: false, dragDirection: 0 });
  const [currIdx, setCurrIdx] = useState(0);
  const [isShowingUser, setIsShowingUser] = useState(false);

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.addEventListener('mousedown', handleMouseDown);
      slideRef.current.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mousedown', (e) => {
        e.preventDefault();
      })
    }
  }, [slideRef.current]);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.addEventListener('mousedown', handleMouseDown);
      userRef.current.addEventListener('mouseleave', handleMouseLeave);
    }
  }, [userRef.current])

  function removeEvents(ref) {
    ref.current.removeEventListener('mousedown', handleMouseDown);
    ref.current.removeEventListener('mouseleave', handleMouseLeave);
    ref.current.removeEventListener('mouseup', handleMouseUp);
    ref.current.removeEventListener('mousemove', handleMouseMove);
  }

  function handleMouseLeaveUpEvent(evt) {
    if (slideRef.current) {
      const updatedState = state
      updatedState['isDown'] = false;

      const diffY = evt.pageY - state.y;
      const diffX = evt.pageX - state.x;
      const scrollHeight = slideRef.current.clientHeight;

      const val = diffY < 0 ? -1 : 1;
      // console.log("diffX", { diffX, diffY })

      if (diffX < 0 && Math.abs(diffX) > 30 && Math.abs(diffY) < 20) {
        removeEvents(slideRef);
        setIsShowingUser(true)
      }
      else if (scrollHeight - Math.abs(diffY) * 2 <= 200) {
        updatedState['dragDirection'] = val;
        slideRef.current.scrollTo({ top: state.top - val * VIDEO_HEIGHT, behavior: 'smooth' });
      } else {
        slideRef.current.scrollTo({ top: state.top, behavior: 'smooth' });
        updatedState.dragDirection = 0;
      }
      setState({ ...updatedState });
    } else if (userRef.current) {
      const updatedState = state
      updatedState['isDown'] = false;
      const diffX = evt.pageX - state.x;
      if (diffX > 0 && Math.abs(diffX) > 30) {
        removeEvents(userRef);

        setIsShowingUser(false);
        slideRef.current.scrollTo({ top: state.top, behavior: 'auto' });
      }
      setState({ ...updatedState });
    }

  }

  function handleMouseUp(evt) {
    handleMouseLeaveUpEvent(evt);
  }

  function handleMouseDown(evt) {
    if (slideRef.current) {
      if (slideRef.current.scrollTop % VIDEO_HEIGHT === 0) {
        const updatedState = state;
        updatedState['isDown'] = true;
        updatedState['top'] = slideRef.current.scrollTop;
        updatedState['y'] = evt.clientY;
        updatedState['x'] = evt.clientX;
        updatedState['left'] = slideRef.current.scrollLeft;
        updatedState.dragDirection = 0;
        setState({ ...updatedState });
        slideRef.current.addEventListener('mouseup', handleMouseUp);
        slideRef.current.addEventListener('mousemove', handleMouseMove);
      }
    } else if (userRef.current) {
      const updatedState = state;
      updatedState['isDown'] = true;
      updatedState['x'] = evt.clientX;
      updatedState['left'] = userRef.current.scrollLeft;
      setState({ ...updatedState });
      userRef.current.addEventListener('mouseup', handleMouseUp);
      userRef.current.addEventListener('mousemove', handleMouseMove);
    }
  }

  function handleMouseLeave(evt) {
    if (state.isDown) {
      handleMouseLeaveUpEvent(evt);
    }
  }

  function handleMouseMove(evt) {
    if (!state.isDown) return
    if (slideRef.current) {
      const diffY = evt.clientY - state.y;
      slideRef.current.scrollTop = state.top - diffY;
    }

  }

  function setCurrentVideoPlayingIndex(i) {
    let currentIndex = i;
    if (state.dragDirection < 0) {
      currentIndex++;
    } else if (state.dragDirection > 0) {
      currentIndex--;
    }
    setCurrIdx(currentIndex);
  }

  function handleEnded() {
    slideRef.current.scrollTo({ top: state.top + VIDEO_HEIGHT, behavior: 'smooth' });
  }

  const channel = props.videos[currIdx] ? props.videos[currIdx].channel : null;
  return (
    <div>
      <div className="mobile-image-container">
        <img src={process.env.PUBLIC_URL + "/images/mobile_rizzle.png"} alt="mobile"></img>
      </div>
      {!isShowingUser ?
        <div className="video-container" ref={slideRef}>
          {props.videos.map((item, i) => (
            <div key={item.id} className="slides ">
              <div className="slide-item">
                <VideoItemContainer
                  poster={item.video.coverImageUrl}
                  src={item.video.smallUrl}
                  index={i}
                  currentIndex={currIdx}
                  setCurrentVideoPlayingIndex={setCurrentVideoPlayingIndex}
                  handleEnded={handleEnded}
                ></VideoItemContainer>
              </div>
            </div>
          ))}
        </div> :
        <div className="user-container" ref={userRef}>
          <UserComponent channelName={channel ? channel.title : "Rizzle Title"} user={channel ? channel.user : { "name": "Rizzle name" }}></UserComponent>
        </div>}
    </div >
  );
}

export default MobileComponent;
