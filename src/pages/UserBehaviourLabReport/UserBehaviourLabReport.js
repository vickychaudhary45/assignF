import Layout from "../../Layout";
import UserLabBehaviourTable from "src/components/UserBehaviourLabTable/UserBehaviourLabTable";
import "./UserBehaviourLabReport.scss";

const UserLabBehaviourReport = () => {
  return (
    <Layout mainClassName="User">
      <div className="main-content course-page">
        <div className="container">
          <div className="details-block">
            <UserLabBehaviourTable />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserLabBehaviourReport;
