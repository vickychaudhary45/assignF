import Layout from "../../Layout";
import LiveSandboxDashboardTable from "src/components/LiveSandboxDashboardTable/LiveSandboxDashboardTable";
import "./LiveSandboxDashboard.scss";

const LiveSandboxDashboard = () => {
  return (
    <Layout mainClassName="User">
      <div className="main-content course-page">
        <div className="container">
          <div className="details-block">
            <LiveSandboxDashboardTable />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LiveSandboxDashboard;
