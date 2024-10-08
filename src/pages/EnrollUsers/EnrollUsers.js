import React, { useState, useEffect, useContext } from "react";
import "./EnrollUsers.scss";
import Layout from "../../Layout";
import { createPortal } from "react-dom";
import { PermissionContexts } from "../../PermissionContexts";
import AddFormModal from "src/components/AddFormModal/AddFormModal";
import { FeedbackModal } from "src/components/FeedbackModal/FeedbackModal";
import { getFeedbackForm } from "src/services/Dashboard/services"; // Update this path accordingly

const EnrollUsers = () => {
  // context
  const { privileges } = useContext(PermissionContexts);

  // local storage
  const priv = JSON.parse(localStorage.getItem("privilegesInfo"));

  // state management
  const [showModal, setShowModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const company_id = "1410"; // Set the appropriate company_id here
        const data = await getFeedbackForm({ company_id }); // Call the getFeedbackForm function
        setFeedbacks(data?.data); // Assuming the API returns feedbacks directly
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  // useEffect(() => {
  //   if (
  //     privileges &&
  //     Array.isArray(privileges.privileges) &&
  //     privileges.privileges.length > 0
  //   ) {
  //     setFeedbackModal(privileges.privileges[0] === "Allow_to_fill");
  //   } else {
  //     setFeedbackModal(false); // Or handle accordingly if no privileges
  //   }
  // }, [privileges]);
  useEffect(() => {
    if (priv?.feedback_form) {
      setFeedbackModal(!priv?.privileges.length === 0);
    }
  }, [privileges]);

  // console.log(privileges, "privileges");
  console.log(feedbackModal, "feedbackModal");
  console.log(priv, "priv");
  console.log(priv?.privileges.length, "privileges?.privileges[0]");

  return (
    <Layout>
      <div className="User">
        <div className="main-content course-page">
          <div className="container">
            <div className="details-block">
              {feedbackModal && !privileges?.is_owner && (
                <FeedbackModal
                  setOpen={setFeedbackModal}
                  open={feedbackModal}
                />
              )}
              {/* Feedbacks Table */}
              {privileges?.is_owner ? (
                <>
                  <div className="adduser-button-box">
                    <input
                      type="button"
                      value="Add New Form"
                      onClick={() => {
                        setShowModal(true);
                      }}
                    />
                  </div>
                  <div className="feedbacks-table">
                    <h2>Feedbacks Given</h2>
                    {feedbacks.length > 0 ? (
                      <table>
                        <thead>
                          <tr>
                            <th>User Email</th>
                            <th>Suggestion</th>
                            <th>Ratings</th>
                            <th>Submitted At</th>
                          </tr>
                        </thead>
                        <tbody>
                          {feedbacks.map((feedback) => (
                            <tr key={feedback.id}>
                              <td>{feedback.email}</td>
                              <td>{feedback.suggestion}</td>
                              <td>{JSON.parse(feedback.rating).join(", ")}</td>
                              <td>
                                {new Date(
                                  feedback.submitted_at
                                ).toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>No feedbacks available.</p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <p>Feedback Form</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {showModal &&
        createPortal(
          <AddFormModal showModal={showModal} setShowModal={setShowModal} />,
          document.getElementById("portal")
        )}
    </Layout>
  );
};

export default EnrollUsers;
