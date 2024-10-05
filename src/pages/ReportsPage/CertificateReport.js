import React from "react";
import Layout from "../../Layout";
import CertificateReportProps from "../../components/Props/EnrollmentReportProps";
import CertificateReportTable from "../../components/CertificateReport/CertificateReportTable";
import "./CertificateReport.scss";

const CertificateReport = () => {
  return (
    <Layout mainClassName="User">
      <div className="main-content course-page">
        <div className="container">
          <div className="details-block">
            <CertificateReportTable {...CertificateReportProps.course_page} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CertificateReport;
