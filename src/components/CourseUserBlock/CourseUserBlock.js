import React from "react";
import { images } from "src/config/images";
import { useAppState } from "src/stateManagement";
import "./CourseUserBlock.scss";

const CourseUserBlock = (props) => {
  const { state: App } = useAppState();
  return (
    <>
      {!!
        !App?.privileges?.is_trail &&
        <div className="course-user-block">
          <div className="list-group">
            <div className="head-block">
              <div className="title">Assigned Courses</div>
              <label>{`${props?.courseData.length}`} Courses</label>
            </div>
            {(props?.courseData.length > 0) && props?.courseData.map((item, index) => {
              return (
                <div className="list-item" key={index}>
                  <div className="course-img">
                    <figure>
                      <img className="img-full" alt=""
                        src={item?.src ? process.env.REACT_APP_WEB_MEDIA_URL + item?.src?.replace("media/", "") : images.lambda}
                      />
                    </figure>
                    <div className="course-title">{item?.name || item?.title_txt}{' '}-{' '}<b>{item.enrollment_type}</b></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      }
    </>
  );
};

export default CourseUserBlock;
