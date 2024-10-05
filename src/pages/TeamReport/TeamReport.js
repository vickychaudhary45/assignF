import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import { BreadCrumbsProps } from "../../components/Props/BreadCrumbsProps";
import { useParams } from "react-router-dom";
import { PulseLoader } from "src/components/Loader/Loader";
import { getTeamReportbyid } from "src/services/reports/services";
import { sd } from "../../components/CustomCode/CustomCode";
import "./TeamReport.scss";

const TeamReport = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [teamReport, setTeamReport] = useState(null);

  useEffect(() => {
    const fetchTeamReport = async () => {
      const data = {
        team_id: id,
      }
      const response = await getTeamReportbyid(data);
      if (response?.status === true) {
        BreadCrumbsProps.team_report.sub_title = ``;
        BreadCrumbsProps.team_report.create_txt = `Teams  / ${response?.teamInfo.team_name}`;
        setTeamReport(response);
        setLoading(false);
      }
    }
    if (id) {
      fetchTeamReport();
    }
  }, [id])

  return (
    <Layout mainClassName="User">
      {!loading ?
        <div className="main-content course-page">
          <div className="container">
            <BreadCrumbs {...BreadCrumbsProps.team_report} />
            <div className="details-block">
              <div className="activity-list">
                <div className="heading">Team Details</div>
                <ul>
                  <li>
                    <div className="textblock texthead">Team Name </div>
                    <div className="textblock texthead">User Counts </div>
                  </li>
                  <li>
                    <div className="textblock">{teamReport.teamInfo.team_name}</div>
                    <div className="textblock">{teamReport.userInfo.length}</div>
                  </li>
                </ul>
              </div>
              {(teamReport?.assignedCourses.length) ? (
                <div className="activity-list">
                  <div className="heading">Assigned Courses to Team</div>
                  <ul>
                    <li>
                      <div className="textblock texthead">Course Name</div>
                      <div className="textblock texthead">Course Type</div>
                    </li>
                    {teamReport?.assignedCourses?.map((list, index) => {
                      let productType;
                      if (list.type === "PT") {
                        productType = "Practice Test";
                      } else if (list.type === "OC") {
                        productType = "Online Course";
                      } else if (list.type === "LAB") {
                        productType = "Lab";
                      } else {
                        productType = "Sandbox";
                      }
                      return (
                        <li key={index}>
                          <div className="textblock-course">{list.name}</div>
                          <div className="textblock">{productType}</div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : ''}
              {(teamReport?.subscriptionsAssigned.length) ? (
                <div className="activity-list">
                  <div className="heading">Assigned Subscriptions to Team</div>
                  <ul>
                    <li>
                      <div className="textblock texthead">Subscription Name</div>
                    </li>
                    {teamReport?.subscriptionsAssigned?.map((list, index) => {
                      return (
                        <li key={index}>
                          <div className="textblock">{list.name}</div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : ''}
              {(teamReport?.assignedLearningPath.length) ? (
                <div className="activity-list">
                  <div className="heading">Assigned Learning Path to Team</div>
                  <ul>
                    <li>
                      <div className="textblock texthead">Learning Path Name</div>
                    </li>
                    {teamReport?.assignedLearningPath?.map((list, index) => {
                      return (
                        <li key={index}>
                          <div className="textblock">{list.name}</div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : ''}
              {(teamReport?.userInfo.length) ? (
                <div className="activity-list">
                  <div className="heading">Assigned Users to Team</div>
                  <ul>
                    <li>
                      <div className="textblock texthead">Name</div>
                      <div className="textblock texthead">Email</div>
                      <div className="textblock-last-login texthead">Last Login</div>
                      <div className="textblock texthead last-child">Created At</div>
                    </li>
                    {teamReport?.userInfo?.map((list, index) => {
                      return (
                        <li key={index}>
                          <div className="textblock">{list.firstname} {list.lastname}</div>
                          <div className="textblock">{list.email}</div>
                          <div className="textblock-last-login">{list.last_login != null ? sd(list.last_login) : '-'}</div>
                          <div className="textblock last-child">{sd(list.created_at)}</div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : ''}
            </div>
          </div>
        </div>
        :
        <div className="loader">
          <PulseLoader />
        </div>
      }
    </Layout>
  );
};

export default TeamReport;