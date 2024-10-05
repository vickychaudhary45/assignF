import React, { useEffect } from "react";
import Layout from "../../Layout";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import EditUserForm from "../../components/EditUserForm/EditUserForm";
import { BreadCrumbsProps } from "../../components/Props/BreadCrumbsProps";
import { UsersPageProps } from "../../components/Props/UsersPageProps";
import { PulseLoader } from "src/components/Loader/Loader";
import { useParams } from "react-router-dom";
import { getUserRecord } from "src/services/users-services/services";
import "./EditUser.scss";

const EditUser = () => {
  const [userInfo, setUserInfo] = React.useState(null);
  const { id } = useParams()

  useEffect(() => {
    let formData = {
      user_id: id
    }
    async function fetchData(id) {
      const response = await getUserRecord(formData);
      BreadCrumbsProps.editusers_page.create_txt = `${response.data.firstname} ${response.data.lastname}`;
      setUserInfo(response.data);
    }
    if (!userInfo && id) {
      fetchData(id);
    }
  }, [id, userInfo])

  return (
    <Layout>
      {userInfo ? (
        <div className="main-content edit-user-page">
          <div className="container-small">
            <BreadCrumbs {...BreadCrumbsProps.editusers_page} />
            <div className="details-block">
              {userInfo && <EditUserForm userInfo={userInfo} setUserInfo={setUserInfo} {...UsersPageProps.add_user_page} />}
            </div>
          </div>
        </div>
      ) : (
        <div className="loader-div">
          <PulseLoader />
        </div>)}
    </Layout>
  );
};

export default EditUser;
