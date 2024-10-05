import React, { useEffect } from "react";
import Layout from "../../Layout";
import { TeamsPageProps } from "../../components/Props/TeamsPageProps";
import { BreadCrumbsProps } from "../../components/Props/BreadCrumbsProps";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import EditTeamForm from "src/components/EditTeamForm/EditTeamForm";
import { useParams } from "react-router-dom";
import { getTeambyId } from "src/services/teams-services/services";
import "./EditTeam.scss";

const EditTeam = () => {
  const [teamInfo, setTeamInfo] = React.useState(null);
  const { id } = useParams()

  useEffect(() => {
    async function fetchData(id) {
      const response = await getTeambyId(id);
      if (response.status === true) {
        BreadCrumbsProps.edit_teams_page.sub_title = `Edit - ${response?.data.team?.team_name}`;
        BreadCrumbsProps.edit_teams_page.create_txt = `Edit - ${response?.data.team?.team_name}`;
        setTeamInfo(response?.data);
      }
    }
    if (!teamInfo && id) {
      fetchData(id);
    }
  }, [id, teamInfo])

  return (
    <Layout>
      <div className="main-content create-team-page">
        <div className="container-small">
          <BreadCrumbs {...BreadCrumbsProps.edit_teams_page} />
          <div className="details-block">
            {teamInfo && <EditTeamForm teamInfo={teamInfo} setTeamInfo={setTeamInfo} {...TeamsPageProps.create_team_page} />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditTeam;
