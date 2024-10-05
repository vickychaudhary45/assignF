import Layout from "../../Layout";
import RolesPageprops from "../../components/Props/RolesPrivilegesPageProps";
import RolesPrivilegesTable from "../../components/RolesPrivilegesTable/RolesPrivilegesTable";
import "../RolesPrivileges/RolesPrivileges.scss";

const RolesPrivileges = () => {
  return (
    <Layout>
      <div className="main-content roles-page">
        <div className="container">
          <div className="details-block">
            <RolesPrivilegesTable {...RolesPageprops.role_page} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RolesPrivileges;
