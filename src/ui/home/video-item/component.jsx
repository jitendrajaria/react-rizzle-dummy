import React, { useRef, useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import UserComponent from '../../user/component';

const HomeVideoItemComponent = (props) => {

  const item = props.item;
  const index = props.index;
  let videoRef = useRef();
  let [currentItem, setCurrentItem] = useState(0)

  useEffect(() => {
    setCurrentItem(state => {
      state = 0;
      return state;
    })

    if (props.currentItem !== index) {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    } else {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }
  }, [props])

  function handleChange(index) {
    setCurrentItem(index)
    if (index !== 0) {
      videoRef.current.pause();
    }
  }

  return (
    <div className="d-flex flex-row justify-content-center">
      <Carousel
        axis="horizontal"
        showThumbs={false}
        swipeable={true}
        showArrows={false}
        useKeyboardArrows={true}
        showStatus={false}
        stopOnHover={true}
        autoPlay={false}
        showIndicators={false}
        infiniteLoop={false}
        emulateTouch={true}
        onChange={handleChange}
        selectedItem={currentItem}
      >
        <div>
          <video ref={videoRef} autoPlay={true} muted={true} poster={item.video.coverImageUrl} controls={true} src={item.video.originalUrl} />
        </div>
        <div className="h-100">
          <UserComponent channelName={item.channel ? item.channel.title : "Custom channel"} user={item.channel ? item.channel.user : { name: "Jitendra" }}></UserComponent>
        </div>
      </Carousel>
    </div>
  );
}

export default HomeVideoItemComponent;
