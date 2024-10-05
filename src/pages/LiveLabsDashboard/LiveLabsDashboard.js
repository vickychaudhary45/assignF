import Layout from "../../Layout";
import LiveLabsDashboardTable from "src/components/LiveLabsDashboardTable/LiveLabsDashboardTable";
import "./LiveLabsDashboard.scss";

const LiveLabsDashboard = () => {
  return (
    <Layout mainClassName="User">
      <div className="main-content course-page">
        <div className="container">
          <div className="details-block">
            <LiveLabsDashboardTable />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LiveLabsDashboard;
