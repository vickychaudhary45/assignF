import React from "react";
import Layout from "../../Layout";
import PracticeTestProps from "../../components/Props/PracticeTestProps";
import PracticeTestTable from "../../components/PracticeTestTable/PracticeTestTable";
import "./PracticeTest.scss";

const PracticeTest = () => {
  return (
    <Layout mainClassName="User">
      <div className="main-content course-page">
        <div className="container">
          <div className="details-block">
            <PracticeTestTable {...PracticeTestProps.course_page} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PracticeTest;
