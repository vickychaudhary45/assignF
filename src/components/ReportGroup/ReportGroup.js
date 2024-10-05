import React from "react";
import { Link } from "react-router-dom";
import "./ReportGroup.scss";

const ReportGroup = (props) => {
  const privilegeMap = {
    "Practice Test Report": props.ptPrivilege,
    "Video Course Report": props.vcPrivilege,
    "Hands-on labs Report": props.labsPrivilege,
    "Sandbox Report": props.sandboxPrivilege,
  };

  return (
    <div className="report-group">
      {props.report.map((text, index) => {
        const hasPermission = privilegeMap[text.txt];
        return (
          <Link
            className="report"
            key={index}
            to={hasPermission ? text.link : "#"}
          >
            <div className="circle">
              <div className={text.icon}></div>
            </div>
            <p>{text.txt}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default ReportGroup;
