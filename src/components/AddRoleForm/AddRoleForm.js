import { useState, useContext } from "react";
import { BtnProps } from "../Props/BtnProps";
import BtnMain from "../BtnMain/BtnMain";
import { useForm } from "react-hook-form";
import AssignRoleBlock from "../AssignRoleBlock/AssignRoleBlock";
import { createRole } from "src/services/role-privileges/services"
import MessageAlert from "../MessageAlert/MessageAlert";
import { PermissionContexts } from "../../PermissionContexts";

const AddRoleForm = (props) => {
  const { privileges } = useContext(PermissionContexts);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [alert, setAlert] = useState(false);
  const [alertResponse, setAlertResponse] = useState('');
  const [assignRole, setAssignRole] = useState([]);
  const user_data = JSON.parse(localStorage.getItem('user_data'));

  const onSubmit = async (formData, e) => {
    const filterPrivileges = (formData, privileges) => {
      let filteredPrivileges = [...formData.privileges];
      if (!privileges.enable_lab_validation) {
        filteredPrivileges = filteredPrivileges.filter((item) => item !== 207);
      }
      if (!privileges.enable_vm) {
        filteredPrivileges = filteredPrivileges.filter((item) => item !== 200);
      }
      if (!privileges.enable_workspaces) {
        filteredPrivileges = filteredPrivileges.filter((item) => item !== 201);
      }
      if (!privileges.enable_custom_sandbox) {
        filteredPrivileges = filteredPrivileges.filter((item) => item !== 202);
      }
      return filteredPrivileges;
    };
    // Assume 'privileges' is defined somewhere in your component
    formData.privileges = filterPrivileges(formData, privileges);
    
    let regExp = /^[a-zA-Z0-9_ -]+$/;
    if (!regExp.test(formData.name)) {
      setAlertResponse({ status: 'error', msg: 'Role can contain only characters.' })
      setAlert(true);
      return;
    } else if (!formData.privileges.length > 0) {
      setAlertResponse({ status: 'error', msg: 'Select at least one role.' })
      setAlert(true);
      return;
    }
    setAssignRole(formData.privileges)
    const response = await createRole(formData);
    if (response.status === 'success') {
      setAlertResponse(response);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
        window.location.href = `/roles-privileges`;
      }, 3000);
      e.target.reset();
    }
    else {
      setAlertResponse(response);
      setAlert(true);
    }
  };
  return (
    <div className="role-content">
      <form action="#" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-box-group">
          <div className="input-box">
            <input type="hidden" id="company-id" value={user_data?.data?.company_id} {...register("company_id")} />
            <label htmlFor="name">Roles Title <span>*</span></label>
            <input type="text" id="name" placeholder="E.g. Manager" {...register("name", { required: { value: true, message: "Title is required." }, maxLength: { value: 80, message: "Max length can be 80 only." } })} />
            <div className='errormsg'>{errors?.name?.message}</div>
          </div>
        </div>
        <AssignRoleBlock register={register} setValue={setValue} permissions={assignRole} {...props.assign_role} />
        <div className="btn-group">
          <button className={`btn btnMain ${BtnProps.btn_role.class}`}>{BtnProps.btn_role.text}</button>
          <BtnMain {...BtnProps.btn_cancel_role} path='/roles-privileges' />
        </div>
      </form>
      <MessageAlert
        severity={alertResponse?.status}
        message={alertResponse?.msg}
        onClick={() => {
          setAlert(false);
        }}
        open={alert}
      />
    </div>
  );
}

export default AddRoleForm;
