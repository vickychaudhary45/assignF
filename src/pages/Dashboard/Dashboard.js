import React, { useState, useEffect, useContext } from "react";
import "./Dashboard.scss";
import Layout from "../../Layout";
import CircularProgress from "@mui/material/CircularProgress";

// component import
import LeftBox from "../../components/LeftBox/LeftBox";
// import LicensesCount from "../../components/LicensesCount/LicensesCount";

// Miscellaneous imports
import { useAppState } from "src/stateManagement";
import { PermissionContexts } from "../../PermissionContexts";
import { HomePageProps } from "../../components/Props/HomePageProps";
import {
  getDashboardCount,
  getRecentActivities,
} from "../../services/Dashboard/services";

const Dashboard = () => {
  const { privileges } = useContext(PermissionContexts);
  const USER_DATA = JSON.parse(localStorage.getItem("user_data"));

  // state management
  const { state: App } = useAppState();
  const [loading, setLoading] = useState(false);
  const [recentActivites, setRecentActivitesData] = useState({
    list: [],
  });
  const [userData, setuserData] = useState({
    teamsCount: 0,
    lpCount: 0,
    totalUser: 0,
    totalEnrollments: 0,
    enrolledSubscriptions: 0,
    enrolledCourses: 0,
  });

  // Function to check if user has the privilege
  function hasPrivilege(privilege) {
    if (USER_DATA?.data?.is_owner) {
      return true;
    }
    return privileges?.privileges?.includes(privilege);
  }

  // API for dashboard data
  useEffect(() => {
    setLoading(true);
    getDashboardCount().then((res) => {
      setuserData({
        teamsCount: res.teamsCount,
        lpCount: res.lpCount,
        totalUser: res.totalUser,
        totalEnrollments: res.totalEnrollments,
        enrolledSubscriptions: res.enrolledSubscriptions,
        enrolledCourses: res.enrolledCourses,
      });
    });

    getRecentActivities().then((res) => {
      setRecentActivitesData({ list: res.data });
    });

    setLoading(false);
  }, []);

  return (
    <Layout mainClassName="home">
      {loading ? (
        <div
          className=" container"
          style={{ display: "flex", alignItems: "center", height: "80vh" }}
        >
          <CircularProgress size={50} />
        </div>
      ) : (
        <div className="main-content dashboard-page">
          <div className="container">
            <div className="heading-block">
              <div className="title">
                Welcome, {USER_DATA?.data?.name?.first}
              </div>
            </div>
            {/* two-column */}
            <div className="two-column">
              {/* left-column */}
              <div className="left-column">
                <div className="users-group">
                  {/* left-box */}
                  <LeftBox
                    {...userData}
                    usersPrivilege={hasPrivilege("Users")}
                    enrollmentPrivilege={hasPrivilege("Enrollment")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
