import Dialog from "@material-ui/core/Dialog";
import { CircularProgress } from "@mui/material";
import { DialogTitle } from "../MUIComponents/MUIComponents";
import "./ModalDelete.scss";

const ModalDelete = (props) => {
  return (
    <Dialog
      className="modal-delete"
      onClose={props.handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      <div className="modal">
        <div className="modal-title">
          <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
            {props.title}
          </DialogTitle>
        </div>
        <div className="modal-text">{props.para}</div>
        <div className="btn-group">
          {!props.btnloading ? (
            <input className="btn-delete" type="button" value={props.btn_delete} onClick={() => props.fn(props.id)} />
          ) : (<CircularProgress size={15} />)}
          <input className="btn-cancel" type="button" value={props.btn_cancel} onClick={props.handleClose} />
        </div>
      </div>
    </Dialog>
  );
};

export default ModalDelete;
