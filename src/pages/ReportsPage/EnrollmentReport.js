import React from "react";
import Layout from "../../Layout";
import EnrollmentReportProps from "../../components/Props/EnrollmentReportProps";
import EnrollmentTable from "../../components/EnrollmentTable/EnrollmentTable";
import "./EnrollmentReport.scss";

const EnrollmentReport = () => {
  return (
    <Layout mainClassName="User">
      <div className="main-content course-page">
        <div className="container">
          <div className="details-block">
            <EnrollmentTable {...EnrollmentReportProps.course_page} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EnrollmentReport;
