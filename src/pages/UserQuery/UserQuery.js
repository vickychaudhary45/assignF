import Layout from "../../Layout";
import UserQueryForm from "../../components/UserQueryForm/UserQueryForm";
import "./UserQuery.scss";

const UserQueryPage = () => {
  return (
    <Layout>
      <div className="main-content query-page">
        <div className="container-small">
          <div className="query-heading-block">
            <div className="title">Query Form</div>
          </div>
          <div className="details-block">
            <UserQueryForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserQueryPage;
