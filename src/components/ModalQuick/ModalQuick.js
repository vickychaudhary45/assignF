import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { Link } from "react-router-dom";
import CourseQuickViewLearning from "../CourseUserBlock/CourseQuickViewLearning";
import LearningUserBlock from "../LearningUserBlock/LearningUserBlock";
import { DialogTitle } from "../MUIComponents/MUIComponents";
import "./ModalQuick.scss";

const ModalQuick = (props) => {
  return (
    <Dialog
      className="modal-quick"
      onClose={props.handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      <div className="modal">
        <div className="modal-head">
          <figure>
            <img className="img-full" src={props.img} alt="" />
          </figure>
          <div className="caption">
            <span>{props.title}</span>
            <div className="title">{props.subtitle}</div>
          </div>
          <DialogTitle id="customized-dialog-title" onClose={props.handleClose}></DialogTitle>
        </div>
        <div className="modal-container">
          {/* courses-block */}
          <CourseQuickViewLearning {...props.courses_block} />
          {/* learning-block */}
          <LearningUserBlock {...props.learning_block} />
        </div>
        <div className="btn-group">
          <div onClick={props.handleClose} className="btn btn-cancel">
            {props.btn_cancel}
          </div>
          <Link to={`${props.path_learning}${props.learningPath.id}`} className="btn btn-learning">
            {props.btn_learning}
          </Link>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalQuick;
