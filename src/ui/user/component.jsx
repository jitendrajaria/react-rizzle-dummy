import React from 'react';
import PropTypes from 'prop-types'
import './style.css'

export default function UserComponent(props) {
  return (
    <div className="h-100 bg-white">
      <div className="card" >
        <div className="user-icon-container">
          <img width={15} height={15} className="card-img-top user-icon-container"  src={process.env.PUBLIC_URL + '/images/user.jpg'} alt="" />
        </div>
        <div className="card-body">

          <div className="card-text">
            <div>
              <span className="font-weight-bold">Name: </span>
              <span>{props.user.name}</span>
            </div>
            <div>
              <span className="font-weight-bold">Chanel: </span>
              <span>{props.channelName}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

UserComponent.propTypes = {
  user: PropTypes.object.isRequired,
  channelName: PropTypes.string
}

