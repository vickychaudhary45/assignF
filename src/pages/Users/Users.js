import React from "react";
import Layout from "../../Layout";
import UsersTable from "../../components/UsersTable/UsersTable";
import UsersPageProps from "../../components/Props/UsersPageProps";
import "./Users.scss";

const Users = () => {
  return (
    <Layout mainClassName="User">
      <div className="main-content user-page">
        <div className="container">
          <div className="details-block">
            <UsersTable {...UsersPageProps.user_page} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
