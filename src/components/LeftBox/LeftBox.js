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
    </div>
  );
};

export default LeftBox;
