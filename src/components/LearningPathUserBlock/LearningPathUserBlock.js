import React from "react";
import { images } from "src/config/images";
import "./LearningPathUserBlock.scss";

const LearningPathUserBlock = (props) => {
  return (
    <div className="learning-user-block">
      <div className="list-group">
        <div className="head-block">
          <div className="title">Learning Paths</div>
          <label>{`${props?.learningPathData.length}`} Learning Paths</label>
        </div>
        {(props?.learningPathData.length > 0) && props?.learningPathData.map((item, index) => {
          return (
            <div className="list-item" key={index}>
              <div className="course-img">
                <figure>
                  <img className="img-full" src={images.bundle_img} alt="" />
                </figure>
                <div className="course-title">{item?.name || item?.title_txt}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LearningPathUserBlock;