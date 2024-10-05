import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BtnProps } from "../Props/BtnProps";
import BtnMain from "../BtnMain/BtnMain";
import AssignRoleBlock from "../AssignRoleBlock/AssignRoleBlock";
import { updateRole } from "src/services/role-privileges/services";
import MessageAlert from "../MessageAlert/MessageAlert";

const EditRoleForm = (props) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [alert, setAlert] = useState(false);
  const [assignRole, setAssignRole] = useState([]);
  const [alertResponse, setAlertResponse] = useState('');
  const user_data = JSON.parse(localStorage.getItem('user_data'));

  useEffect(() => {
    setAssignRole(JSON.parse(props.roleInfo?.permission).map(Number))
  }, [props]);

  const onSubmit = async (formData, e) => {
    const roleId = props.roleInfo?.id;
    if (formData?.privileges?.length > 0) {
      setAssignRole(formData.privileges)
      const response = await updateRole(formData, roleId);
      setAlertResponse(response);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
        window.location.href = `/roles-privileges`;
      }, 2000);
    } else {
      setAssignRole([])
      setAlertResponse({ status: 'error', message: 'Please select at least one privilege.' });
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  };

  return (
    <div className="role-content">
      <form action="#" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-box-group">
          <div className="input-box">
            <input type="hidden" id="company-id" value={user_data?.data?.company_id} {...register("company_id")} />
            <label htmlFor="name">Roles Title <span>*</span></label>
            <input type="text" id="name" defaultValue={props.roleInfo?.name} placeholder="E.g. Manager" {...register("name", { required: { value: true, message: "Title is required." }, maxLength: { value: 80, message: "Max length can be 80 only." } })} />
            <div className='errormsg'>{errors?.name?.message}</div>
          </div>
        </div>
        <AssignRoleBlock errors={errors} setValue={setValue} permissions={assignRole} register={register} {...props.assign_role} />
        <div className="btn-group">
          <button className={`btn btnMain ${BtnProps.btn_edit_role.class}`}>{BtnProps.btn_edit_role.text}</button>
          <BtnMain {...BtnProps.btn_cancel_role} path='/roles-privileges' />
        </div>
      </form>
      <MessageAlert
        severity={alertResponse?.status}
        message={alertResponse?.message}
        onClick={() => {
          setAlert(false);
        }}
        open={alert}
      />
    </div>
  );
}

export default EditRoleForm;
