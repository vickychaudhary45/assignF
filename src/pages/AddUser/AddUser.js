import React from "react";
import Layout from "../../Layout";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import AddUserForm from "../../components/AddUserForm/AddUserForm";
import { BreadCrumbsProps } from "../../components/Props/BreadCrumbsProps";
import { UsersPageProps } from "../../components/Props/UsersPageProps";
import "./Adduser.scss";

const AddUser = () => {
  return (
    <Layout>
      <div className="main-content add-user-page">
        <div className="container-small">
          <BreadCrumbs {...BreadCrumbsProps.addusers_page} />
          <div className="details-block">
            <AddUserForm {...UsersPageProps.add_user_page} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddUser;
