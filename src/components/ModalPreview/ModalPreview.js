import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { DialogTitle } from "../MUIComponents/MUIComponents";
import "./ModalPreview.scss";

const ModalPreview = (props) => {
  let url = props.certImg.includes("whizlabs-certificate") ? process.env.REACT_APP_WEB_MEDIA_URL : process.env.REACT_APP_B2B_PROFILE_URL
  return (
    <Dialog
      className="modal-preview"
      onClose={props.handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      <div className="modal">
        <div className="modal-title">
          <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
            {props.course_name}
          </DialogTitle>
        </div>
        <div className="certificate-preview">
          <img className="certificate-img" src={url + props.certImg} alt="Certificate" />
        </div>
      </div>
    </Dialog>
  );
};

export default ModalPreview;
