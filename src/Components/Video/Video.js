import React from "react";
import "./styles.css";

function Video({details}) {
    // console.log(details);
  return details? (
    <div className="outer-video">
      <div className="image-container">
        <img
          src={details.thumbURL}
          alt="thumbnail"
        />
      </div>
      <div className="info-container">
        <div className="title-container">
          {details.videoTitle}
        </div>
        <div className="timeline">{details.timeline}</div>
        <div className="channel">{details.channelName}</div>
        <div className="description">
          {details.description}
        </div>
      </div>
    </div>
  ): ( <div></div> );
}

export default Video;
