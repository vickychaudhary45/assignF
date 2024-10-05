import Layout from "../../Layout";
import SettingPageForm from "../../components/SettingPageForm/SettingPageForm";
import "./SettingPage.scss";

const SettingPage = () => {
  return (
    <Layout>
      <div className="main-content setting-page">
        <div className="container-small">
          <div className="setting-heading-block">
            <div className="title">Account Settings</div>
          </div>
          <div className="details-block">
            <SettingPageForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingPage;
