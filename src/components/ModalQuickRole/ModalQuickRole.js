import { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AssignRoleBlock from "../AssignRoleBlock/AssignRoleBlock";
import { getRoleById } from "src/services/role-privileges/services";
import { DialogTitle } from "../MUIComponents/MUIComponents";
import "./ModalQuickRole.scss";

const ModalQuickRole = (props) => {
  const { register, setValue } = useForm();
  const [roleInfo, setRoleInfo] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (props?.id) {
      setId(props.id)
    }
  }, [props.id])

  useEffect(() => {
    const fetchData = async (id) => {
      const response = await getRoleById(id);
      if (response.status === "success") {
        setRoleInfo(response?.data);
      }
    }
    if (id) {
      fetchData(id);
    }
  }, [id])

  const closeView = () => {
    setRoleInfo(null);
    setId(null);
    props.handleClose();
  };

  return (
    <Dialog
      className="modal-quick-role"
      onClose={props.handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      <div className="modal">
        <div className="modal-head">
          <div className="caption">
            <div className="title">Assigned Privileges to Role</div>
          </div>
          <DialogTitle id="customized-dialog-title" onClose={closeView}>
          </DialogTitle>
        </div>
        <div className="modal-container">
          <form>
            <div className="input-box-group">
              <div className="input-box">
                <label>Roles Title</label>
                <input disabled type="text" value={roleInfo ? roleInfo.name : ''} placeholder="E.g. Manager" />
              </div>
            </div>
            <AssignRoleBlock quickView={true} setValue={setValue} register={register} permissions={roleInfo?.permission?.length ? JSON.parse(roleInfo?.permission).map(Number) : []} disabled={true} {...props.assign_role} />
          </form>
        </div>
        <div className="btn-group">
          <button onClick={closeView} className="btn btn-cancel">
            {props.btn_cancel}
          </button>
          {roleInfo && roleInfo.is_global !== 1 ?
            <Link to={`/edit-roles-privileges/${id}`} className="btn btn-edit">
              {props.btn_edit}
            </Link>
            : ''}
        </div>
      </div>
    </Dialog>
  );
};

export default ModalQuickRole;
