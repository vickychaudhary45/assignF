import { Dialog } from "@material-ui/core";
import { Button } from "@material-ui/core";
import AssignType from "../AssignType/AssignType";
import { images } from "src/config/images";
import { DialogTitle } from "../MUIComponents/MUIComponents";
import "./ModalDefault.scss";

const ModalDefault = (props) => {
  return (
    <Dialog
      className="modal-default"
      onClose={props?.handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      <div className="modal">
        <div className="modal-head">
          <figure>
            {" "}
            <img className="img-full" src={images.subs_color} alt="" />{" "}
          </figure>
          <div className="caption">
            <span>{props?.selectedCourse}</span>
            <div className="title">{props?.subtitle}</div>
          </div>
          <DialogTitle
            id="customized-dialog-title"
            onClose={props.handleClose}
          ></DialogTitle>
        </div>
        <div className="modal-container">
          <AssignType
            {...props?.assign_block}
            handleCheckbox={props?.handleCheckbox}
          />
        </div>
        <div className="btn-group">
          <Button
            className="btn btn-complete"
            disabled={
              props?.selectedTeams?.length > 0 ||
              props?.selectedUsers?.length > 0
                ? false
                : true
            }
            onClick={() => props?.completeAssignment()}
          >
            {props?.btn_complete}
          </Button>
          <Button
            className="btn btn-cancel"
            onClick={() => props?.handleClose()}
          >
            {props?.btn_cancel}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalDefault;
