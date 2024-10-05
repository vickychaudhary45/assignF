import React from "react";
import Layout from "../../Layout";
import OnlineTestProps from "../../components/Props/OnlineTestProps";
import SandboxReportTable from "../../components/SandboxReport/SandboxReportTable";
import "./SandboxReport.scss";

const SandboxReport = () => {
  return (
    <Layout mainClassName="User">
      <div className="main-content course-page">
        <div className="container">
          <div className="details-block">
            <SandboxReportTable {...OnlineTestProps.course_page} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SandboxReport;
