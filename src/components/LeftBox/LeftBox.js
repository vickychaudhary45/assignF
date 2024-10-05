import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import "./LeftBox.scss";

const LeftBox = (props) => {
  return (
    <div className="left-box">
      <Link to={props.usersPrivilege ? "/users" : "#"}>
        <div className="user">
          <span>{props.totalUser}</span>
          <Typography>Total Users</Typography>
        </div>
      </Link>
      <Link
        to={props.enrollmentPrivilege ? "/reports/enrollment-report" : "#"}
      >
        <div className="user">
          <span>{props.enrolledSubscriptions}</span>
          <Typography>Enrolled Subscriptions</Typography>
        </div>
      </Link>
      <Link
        to={props.enrollmentPrivilege ? "/reports/enrollment-report" : "#"}
      >
        <div className="user">
          <span>{props.enrolledCourses}</span>
          <Typography>Enrolled Courses</Typography>
        </div>
      </Link>
    </div>
  );
};

export default LeftBox;
