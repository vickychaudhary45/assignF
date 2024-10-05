import React from "react";
import { Link } from "react-router-dom";
import { images } from "../../config/images";
import "./InfoGroup.scss";

const InfoGroup = (props) => {
  return (
    <div className="info-group">
      <Link className="info" to={props.learningPathPrivilege ? "/enroll-users" : "#"}>
        <div className="caption">
          <img src={images.learning_img} alt="learning path" />
          <div>
            <strong>{props?.userData?.lpCount}</strong>
            <span>Learning Paths</span>
          </div>
        </div>
      </Link>
      <Link className="info" to={props.teamsPrivilege ? "/teams" : "#"}>
        <div className="caption">
          <img src={images.team_img} alt="team" />
          <div>
            <strong>{props?.userData?.teamsCount}</strong>
            <span>Teams</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default InfoGroup;
