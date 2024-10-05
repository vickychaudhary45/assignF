import React from "react";
import Layout from "../../Layout";
import { TeamsPageProps } from "../../components/Props/TeamsPageProps";
import { BreadCrumbsProps } from "../../components/Props/BreadCrumbsProps";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import CreateTeamForm from "../../components/CreateTeamForm/CreateTeamForm";
import "./CreateTeam.scss";

const CreateTeam = () => {
  return (
    <Layout>
      <div className="main-content create-team-page">
        <div className="container-small">
          <BreadCrumbs {...BreadCrumbsProps.teams_page} />
          <CreateTeamForm {...TeamsPageProps.create_team_page} />
        </div>
      </div>
    </Layout>
  );
};

export default CreateTeam;
