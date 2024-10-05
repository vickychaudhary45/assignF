import Layout from "../../Layout";
import UserBehaviourSandboxTable from "src/components/UserBehaviourSandboxTable/UserBehaviourSandboxTable";
import "./UserBehaviourSandboxReport.scss";

const UserBehaviourSandboxReport = () => {
  return (
    <Layout mainClassName="User">
      <div className="main-content course-page">
        <div className="container">
          <div className="details-block">
            <UserBehaviourSandboxTable />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserBehaviourSandboxReport;
