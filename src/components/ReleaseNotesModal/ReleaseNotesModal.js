import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { releaseNotesHeading, releaseNotesModalData } from "../Props/ReleaseNotesProps";
import "./ReleaseNotesModal.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
};

const ReleaseNotesModal = () => {
  const handleClick = (e) => {
    e.stopPropagation();
    localStorage.setItem("releaseNotesModal", JSON.stringify({ modal: false }));
    setOpen(false);
  };
  const handleViewRelease = () => {
    localStorage.setItem("releaseNotesModal", JSON.stringify({ modal: false }));
    window.location.href = "/release-notes";
  };
  const [open, setOpen] = React.useState(true);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClick}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ zIndex: '1200' }}
      >
        <Box sx={style}>
          <div className="release-notes-container">
            <div className="container-left">
              <div className="left-polygon">
                <div className="polygon-content">
                  <div className="polygon-header">
                    <span>Release</span>
                    <span>Notes</span>
                  </div>
                  <div className="polygon-body">
                    <p>What's new on Platform</p>
                    <ul style={{ paddingLeft: "9px" }}>
                      {releaseNotesHeading.map((item) => (
                        <a key={item.name} href={`#${item.name}:`}>
                          <li>{item.name}</li>
                        </a>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-right">
              {/* Close Button */}
              <div className="btn-div">
                <button className="release-notes-btn" onClick={handleClick}>
                  Close
                </button>
              </div>
              <div className="right-polygon">
                <div className="polygon-top-left">
                  <div className="polygon-heading">
                    <h2>Platform Updates v4.0</h2>
                    <span>Major</span>
                  </div>
                  <div className="polygon-date">
                    <p>December 7, 2023</p>
                  </div>
                  <a
                    onClick={handleViewRelease}
                    style={{ margin: "0px" }}
                    className="view-release-notes-button"
                  >
                    View Release Notes
                  </a>
                </div>
                <div className="polygon-top-right">
                  <p>
                    We are excited to announce the release of Version 4.0,
                    bringing a host of enhancements to improve your experience
                    on our Learning Management System (LMS). Please take a
                    moment to review the following changes:
                  </p>
                  {releaseNotesModalData.map((item, index) => (
                    <div key={index} id={item.Heading}>
                      <h2>{item.Heading}</h2>
                      {item.list.map((listItem, listIndex) => (
                        <React.Fragment key={listIndex}>
                          {listItem.listHeading && (
                            <span>{listItem.listHeading}</span>
                          )}
                          <ul>
                            {listItem.listBody.map((bodyItem, bodyIndex) => (
                              <React.Fragment key={bodyIndex}>
                                <li>{bodyItem.name}</li>
                                {bodyItem.subList &&
                                  bodyItem.subList.map((subItem, subIndex) => (
                                    <ul key={subIndex} style={{ margin: "0px 0px 0px 20px" }}>
                                      <li>{subItem.name}</li>
                                    </ul>
                                  ))}
                              </React.Fragment>
                            ))}
                          </ul>
                        </React.Fragment>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
export default ReleaseNotesModal;
