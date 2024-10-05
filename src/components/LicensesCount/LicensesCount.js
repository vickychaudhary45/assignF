import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { images } from "../../config/images";
import ModalLicenses from "../ModalLicenses/ModalLicenses";
import "./LicensesCount.scss";

const LicensesCount = (props) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const handleClickOpen = (title) => {
    setTitle(title);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="license-group">
        <Link className="info" to="#" onClick={() => handleClickOpen("Purchased Licenses")}>
          <div className="caption">
            <img src={images.practice} alt="learning path" />
            <div>
              <strong>{props.purchased_license}</strong>
              <span>Purchased Licenses</span>
            </div>
          </div>
        </Link>
        <Link className="info" to="#" onClick={() => handleClickOpen("Unassigned Licenses")}>
          <div className="caption">
            <img src={images.practice} alt="team" />
            <div>
              <strong>{props.unassigned_license}</strong>
              <span>Unassigned Licenses</span>
            </div>
          </div>
        </Link>
        <Link className="info" to="#" onClick={() => handleClickOpen("Assigned Licenses")}>
          <div className="caption">
            <img src={images.practice} alt="team" />
            <div>
              <strong>{props.assigned_license}</strong>
              <span>Assigned Licenses</span>
            </div>
          </div>
        </Link>
      </div>
      <ModalLicenses
        open={open}
        handleClose={handleClose}
        title={title}
        {...props}
      />
    </>
  );
};

export default LicensesCount;