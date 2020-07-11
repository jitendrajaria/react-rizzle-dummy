import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Carousel } from 'react-responsive-carousel'
import './style.css'
import HomeVideoItemComponent from './video-item/component'

function HomeComponent(props) {
  let [currentItem, setCurrentItem] = useState(0)

  function handleChange(index) {
    // if (currentItem !== index)
      setCurrentItem(state=>{
        state=index;
        return state;
      });
  }

  return (
    <div className="container-fluid">
      {props.videosArray.length > 0 ?
        <Carousel axis="vertical"
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
          selectedItem={currentItem}
          onChange={handleChange}
        >
          {props.videosArray.map((item, i) => {
            return <div key={item.id} className="">
              <HomeVideoItemComponent
                item={item}
                index={i} 
                currentItem={currentItem}></HomeVideoItemComponent>
            </div>
          })}
        </Carousel> : ""}
    </div>
  )
}

HomeComponent.propTypes = {
  videosArray: PropTypes.array.isRequired
}

export default HomeComponent

