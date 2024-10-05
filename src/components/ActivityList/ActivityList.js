import React from "react";
import { images } from "../../config/images";
import { parseTime } from "../CustomCode/CustomCode";
import "./ActivityList.scss";

const ActivityList = (props) => {
  return (
    <div className="activity-list">
      <div className="heading">Recent Activities</div>
      <ul>
        {props?.list?.map((list, index) => {
          return (
            <li key={index}>
              <a className="user-detail">
                <figure>
                  <img className="img-full" src={images.user} alt="" />
                </figure>
                <div className="user-name">{list.name}</div>
              </a>
              <div className="textblock">{list.txt}</div>
              <div className="attemptblock">{list.attempt}</div>
              <div className={`${list.status}`}>{list.video_id ? 'Video' : list.quiz_id ? 'Quiz' : ''}{' '}{list.result}</div>
              <div className="date">{parseTime(list.date)}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ActivityList;
