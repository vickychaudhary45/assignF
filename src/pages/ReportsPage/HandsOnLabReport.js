import React from "react";
import Layout from "../../Layout";
import OnlineTestProps from "../../components/Props/OnlineTestProps";
import HandsOnLabReportTable from "../../components/HandsOnLabReport/HandsOnLabReportTable";
import "./HandsOnLabReport.scss";

const HandsOnLabReport = () => {
  return (
    <Layout mainClassName="User">
      <div className="main-content course-page">
        <div className="container">
          <div className="details-block">
            <HandsOnLabReportTable {...OnlineTestProps.course_page} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HandsOnLabReport;
