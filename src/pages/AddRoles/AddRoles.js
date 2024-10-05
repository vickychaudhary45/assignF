import Layout from "../../Layout";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import AddRoleForm from "../../components/AddRoleForm/AddRoleForm";
import { BreadCrumbsProps } from "../../components/Props/BreadCrumbsProps";
import { RolesPageprops } from "../../components/Props/RolesPrivilegesPageProps";
import "./AddRoles.scss";

const AddRoles = () => {
  return (
    <Layout>
      <div className="main-content add-role-page">
        <div className="container-small">
          <BreadCrumbs {...BreadCrumbsProps.role_page} />
          <div className="details-block">
            <AddRoleForm {...RolesPageprops.add_role_page} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddRoles;
