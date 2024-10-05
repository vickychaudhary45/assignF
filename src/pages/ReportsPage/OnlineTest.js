import React from "react";
import Layout from "../../Layout";
import OnlineTestProps from "../../components/Props/OnlineTestProps";
import OnlineTestTable from "../../components/OnlineTestTable/OnlineTestTable";
import "./OnlineTest.scss";

const OnlineTest = () => {
  return (
    <Layout mainClassName="User">
      <div className="main-content course-page">
        <div className="container">
          <div className="details-block">
            <OnlineTestTable {...OnlineTestProps.course_page} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OnlineTest;
