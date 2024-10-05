import React from "react";
import Layout from "../../Layout";
import TeamsTable from "../../components/TeamsTable/TeamsTable";
import { TeamsPageProps } from "../../components/Props/TeamsPageProps";
import "./Teams.scss";

const Teams = () => {
  return (
    <Layout mainClassName="teams">
      <div className="main-content team-page">
        <div className="container">
          <div className="details-block">
            <TeamsTable {...TeamsPageProps.teams_page} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Teams;
