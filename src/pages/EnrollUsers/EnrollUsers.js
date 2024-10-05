import React, { useState, useEffect, useContext } from "react";

import "./EnrollUsers.scss";
import Layout from "../../Layout";
import { createPortal } from "react-dom";
import { PermissionContexts } from "../../PermissionContexts";
import AddUsersModal from "src/components/AddUsersModal/AddUsersModal";
import { FeedbackModal } from "src/components/FeedbackModal/FeedbackModal";

const EnrollUsers = () => {
  // context
  const { privileges } = useContext(PermissionContexts);

  // local storage
  const priv = JSON.parse(localStorage.getItem("privilegesInfo"));

  // state management
  const [showModal, setShowModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(true);

  useEffect(() => {
    const priv = JSON.parse(localStorage.getItem("privilegesInfo"));
    if (priv?.feedback_form) {
      setFeedbackModal((prev) => true);
    }
  }, [privileges]);

  return (
    <Layout>
      <div mainClassName="User">
        <div className="main-content course-page">
          <div className="container">
            <div className="details-block">
              {feedbackModal ? (
                <FeedbackModal
                  setOpen={setFeedbackModal}
                  open={feedbackModal}
                />
              ) : (
                ""
              )}
              <div className="adduser-button-box">
                <input
                  type="button"
                  value="Add New User(s)"
                  onClick={() => {
                    setShowModal((prev) => true);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal &&
        createPortal(
          <AddUsersModal showModal={showModal} setShowModal={setShowModal} />,
          document.getElementById("portal")
        )}
    </Layout>
  );
};

export default EnrollUsers;
