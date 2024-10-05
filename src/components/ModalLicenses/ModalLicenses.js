import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { images } from "../../config/images";
import { DialogTitle } from "../MUIComponents/MUIComponents";
import "./ModalLicenses.scss";

const ModalLicenses = (props) => {
  return (
    <Dialog
      className="modal-licenses"
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
        <div className="modal-text">
          {props.title == "Purchased Licenses" && (
            <>
              <div className="license-group">
                <div className="caption">
                  <img src={images.practice} alt="learning path" />
                  <div>
                    <strong>{props.subscription_license}</strong><br />
                    <span>Subscriptions</span>
                  </div>
                </div>
                <div className="caption">
                  <img src={images.practice} alt="learning path" />
                  <div>
                    <strong>{props.pt_license}</strong><br />
                    <span>Pratice Test</span>
                  </div>
                </div>
                <div className="caption">
                  <img src={images.practice} alt="learning path" />
                  <div>
                    <strong>{props.oc_license}</strong><br />
                    <span>Online Course</span>
                  </div>
                </div>
                <div className="caption">
                  <img src={images.practice} alt="learning path" />
                  <div>
                    <strong>{props.lab_license}</strong><br />
                    <span>Hands-on Labs</span>
                  </div>
                </div>
                <div className="caption">
                  <img src={images.practice} alt="learning path" />
                  <div>
                    <strong>{props.sandbox_license}</strong><br />
                    <span>Sandbox</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {props.title == "Unassigned Licenses" && (
            <>
              <div className="license-group">
                <div className="caption">
                  <img src={images.practice} alt="learning path" />
                  <div>
                    <strong>{props.subscription_license - props.utilised_subscription_license}</strong><br />
                    <span>Subscriptions</span>
                  </div>
                </div>
                <div className="caption">
                  <img src={images.practice} alt="learning path" />
                  <div>
                    <strong>{props.pt_license - props.utilised_pt_license}</strong><br />
                    <span>Pratice Test</span>
                  </div>
                </div>
                <div className="caption">
                  <img src={images.practice} alt="learning path" />
                  <div>
                    <strong>{props.oc_license - props.utilised_oc_license}</strong><br />
                    <span>Online Course</span>
                  </div>
                </div>
                <div className="caption">
                  <img src={images.practice} alt="learning path" />
                  <div>
                    <strong>{props.lab_license - props.utilised_lab_license}</strong><br />
                    <span>Hands-on Labs</span>
                  </div>
                </div>
                <div className="caption">
                  <img src={images.practice} alt="learning path" />
                  <div>
                    <strong>{props.sandbox_license - props.utilised_sandbox_license}</strong><br />
                    <span>Sandbox</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {props.title == "Assigned Licenses" && (
            <>
              <div className="license-group">
                <div className="caption">
                  <img src={images.practice} alt="learning path" />
                  <div>
                    <strong>{props.utilised_subscription_license}</strong><br />
                    <span>Subscriptions</span>
                  </div>
                </div>
                <div className="caption">
                  <img src={images.practice} alt="learning path" />
                  <div>
                    <strong>{props.utilised_pt_license}</strong><br />
                    <span>Pratice Test</span>
                  </div>
                </div>
                <div className="caption">
                  <img src={images.practice} alt="learning path" />
                  <div>
                    <strong>{props.utilised_oc_license}</strong><br />
                    <span>Online Course</span>
                  </div>
                </div>
                <div className="caption">
                  <img src={images.practice} alt="learning path" />
                  <div>
                    <strong>{props.utilised_lab_license}</strong><br />
                    <span>Hands-on Labs</span>
                  </div>
                </div>
                <div className="caption">
                  <img src={images.practice} alt="learning path" />
                  <div>
                    <strong>{props.utilised_sandbox_license}</strong><br />
                    <span>Sandbox</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default ModalLicenses;
