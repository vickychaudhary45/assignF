import React, { useEffect } from "react";
import Layout from "../../Layout";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import { BreadCrumbsProps } from "../../components/Props/BreadCrumbsProps";
import { UsersPageProps } from "../../components/Props/UsersPageProps";
import QuickUserViewForm from "../../components/QuickUserViewForm/QuickUserViewForm";
import { getUserTimeline, quickViewUser } from "src/services/users-services/services";
import { useParams } from "react-router-dom";
import { PulseLoader } from "src/components/Loader/Loader";
import "./UserQuickView.scss";

const UserQuickView = () => {
  const [userInfo, setUserInfo] = React.useState(null);
  const [timelineInfo, setTimelineInfo] = React.useState(null)
  const { id } = useParams()

  useEffect(() => {
    let formData = {
      user_id: id
    }
    async function fetchData(id) {
      const response = await quickViewUser(formData);
      const timelineResponse = await getUserTimeline(formData);

      if (response.status === 200) {
        response.data.data.userData = response.data.data.userData;
        BreadCrumbsProps.quickusers_page.sub_title = `${response.data.data.userData.name}`;
        BreadCrumbsProps.quickusers_page.create_txt = `${response.data.data.userData.name}`;
      }

      setUserInfo(response.data.data, timelineResponse.data);
      setTimelineInfo(timelineResponse?.data?.data)
    }
    if (!userInfo && id) {
      fetchData(id);
    }
  }, [id, userInfo])

  return (
    <Layout>
      {userInfo ? (
        <div className="main-content user-quick-view">
          <div className="container-md">
            <BreadCrumbs {...BreadCrumbsProps.quickusers_page} />
            <div className="details-block" style={{ maxHeight: 'calc(100vh - 80px - 105px)' }}>
              {userInfo && <QuickUserViewForm userInfo={userInfo} timelineInfo={timelineInfo} setUserInfo={setUserInfo} {...UsersPageProps.quick_user_page} />}
            </div>
          </div>
        </div>
      ) : (<div className="loader-div">
        <PulseLoader />
      </div>)}
    </Layout>
  );
};

export default UserQuickView;
