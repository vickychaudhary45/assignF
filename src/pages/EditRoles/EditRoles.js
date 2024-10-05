import { useState, useEffect } from "react";
import Layout from "../../Layout";
import { useParams } from "react-router-dom";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import EditRoleForm from "../../components/EditRoleForm/EditRoleForm";
import { BreadCrumbsProps } from "../../components/Props/BreadCrumbsProps";
import { RolesPageprops } from "../../components/Props/RolesPrivilegesPageProps";
import { getRoleById } from "src/services/role-privileges/services"
import "./EditRoles.scss";

const EditRoles = () => {
  const [roleInfo, setRoleInfo] = useState(null);
  const { id } = useParams()
  useEffect(() => {
    async function fetchData(id) {
      const response = await getRoleById(id);
      if (response.status === "success") {
        BreadCrumbsProps.edit_role_page.sub_title = `Edit - ${response?.data?.name}`;
        BreadCrumbsProps.edit_role_page.create_txt = `Edit - ${response?.data?.name}`;
        setRoleInfo(response?.data);
      }
    }
    if (!roleInfo && id) {
      fetchData(id);
    }
  }, [id, roleInfo])
  return (
    <>
      <Layout>
        <div className="main-content edit-role-page">
          <div className="container-small">
            <BreadCrumbs {...BreadCrumbsProps.edit_role_page} />
            <div className="details-block">
              {roleInfo && <EditRoleForm roleInfo={roleInfo} setRoleInfo={setRoleInfo} {...RolesPageprops.edit_role_page} />}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default EditRoles;
