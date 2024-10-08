import React, { useEffect, useState } from "react";

import moment from "moment";
import "./FeedbackModal.scss";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Snackbar from "@mui/material/Snackbar";
import LinearProgress from "@mui/material/LinearProgress";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { CustomizedRating } from "./Rating";
import { updateFeedbackForm } from "src/services/Dashboard/services";
import { getAForm } from "src/services/users-services/services";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "0px",
  maxHeight: "94vh",
  borderRadius: "7px",
  overflow: "hidden",
};

// const questions = [
//   " How satisfied are you with teams effort during work ? ",
//   " How would you rate the collaboration efforts ?",
//   " How satisfied are you with Learning Management System for program administration ?",
// ];

export const FeedbackModal = ({ open, setOpen }) => {
  const [loading, setLoading] = React.useState(false);
  const [suggestion, setSuggestion] = React.useState("");
  const [openToast, setOpenToast] = React.useState(false);
  const [toastStatus, setToastStatus] = React.useState(false);
  const [suggestionError, setSuggestionError] = React.useState(false);

  const [formData, setFormData] = useState(null); // State to store the fetched form data
  const [error, setError] = useState(null); // State to handle any errors

  const rating_error_msg = "Please select a rating";
  const suggestion_error_msg = "Please add you valuable suggestion";

  const clearFeedbackFromPriviledges = () => {
    const priv = JSON.parse(localStorage.getItem("privilegesInfo"));
    const newPriv = { ...priv, feedback_form: false };
    localStorage.setItem("privilegesInfo", JSON.stringify(newPriv));
  };

  const submitFeedback = () => {
    setRatingErrors((prev) =>
      questions.reduce((obj, ques, index) => {
        obj["q" + index] = false;
        return obj;
      }, {})
    );
    setSuggestionError(false);

    let no_errors = true;
    for (let key in ratingErrors) {
      if (ratings[key] === -1) {
        no_errors = false;
        setRatingErrors((prev) => ({ ...prev, [key]: true }));
      }
    }

    if (suggestion.length < 60) {
      setSuggestionError(true);
      no_errors = false;
    }

    if (no_errors) {
      // make api call and send data back
      setLoading(true);
      const feedbackObj = {
        submitted_at: new Date().toISOString(),
        suggestion: suggestion,
        ratings: Object.values(ratings),
      };
      updateFeedbackForm(feedbackObj).then((res) => {
        setLoading(false);
        if (res.status === "success") {
          setToastStatus(true);
          setOpenToast(true);
        } else {
          setToastStatus(false);
          setOpenToast(true);
        }
        localStorage.removeItem("feedback_form");
        clearFeedbackFromPriviledges();

        setTimeout(() => {
          handleToastClose();
          handleClose();
        }, 3000);
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleToastClose() {
    setOpenToast(false);
  }

  function remindMeLater() {
    const now = moment();
    const after = moment(now).add(8, "hours");
    localStorage.setItem(
      "feedback_form",
      JSON.stringify({ next_reminder: after.format() })
    );
    handleClose();
  }

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await getAForm();
        setFormData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, []);

  const questions = [
    // "How satisfied are you with teams effort during work?",
    // "How would you rate the collaboration efforts?",
    // "How satisfied are you with Learning Management System for program administration?",
    `${formData?.firstname}`,
    `${formData?.lastname}`,
    `${formData?.email}`,
  ];

  const [ratings, setRatings] = React.useState(
    questions.reduce((obj, ques, index) => {
      obj["q" + index] = -1;
      return obj;
    }, {})
  );
  const [ratingErrors, setRatingErrors] = React.useState(
    questions.reduce((obj, ques, index) => {
      obj["q" + index] = false;
      return obj;
    }, {})
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ zIndex: "1000" }}
        className="feedback-modal"
      >
        <Box sx={style}>
          <div className="feedback-container">
            {loading ? <LinearProgress color="success" /> : ""}
            <div className="feedback-header">
              <div className="title">
                Please provide feedback for{" "}
                {formData?.user_email.split("@")[0].charAt(0).toUpperCase() +
                  formData?.user_email.split("@")[0].slice(1)}
              </div>
              <div
                class="icon icon-cross cancel-icon"
                onClick={handleClose}
              ></div>
            </div>

            <div className="feedback-body">
              <div className="questions-ratings-block">
                {questions.map((ques, index) => (
                  <div className="question-block" key={index}>
                    <p className="question">
                      {" "}
                      {ques} *
                      {ratingErrors["q" + index] && (
                        <p className="error-msg"> {rating_error_msg} </p>
                      )}
                    </p>
                    <div className="rating-block">
                      <CustomizedRating
                        value={ratings["q" + index]}
                        onChange={(event, newValue) => {
                          setRatings((prev) => ({
                            ...prev,
                            ["q" + index]: newValue,
                          }));
                        }}
                        key={index}
                        name={"unique" + index}
                      />
                    </div>
                    <div className="textmarker-block">
                      <p> 1 - Needs Improvement </p>
                      <p> 3 - Neutral </p>
                      <p> 5 - Great work </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="suggestions-block">
                <p className="suggest-title">
                  Your Suggestions *
                  {suggestionError && (
                    <p className="error-msg"> {suggestion_error_msg} </p>
                  )}
                </p>
                <div className="suggest-box">
                  <textarea
                    placeholder="Type here ..."
                    minlength="60"
                    required
                    value={suggestion}
                    onChange={(e) => setSuggestion((prev) => e.target.value)}
                  />
                  {suggestion?.length <= 10 ? (
                    <p className="min-character">
                      {" "}
                      Minimum 10 characters ({suggestion?.length} / 10)
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="close-btns">
                <input
                  type="button"
                  value="Remind me later"
                  onClick={remindMeLater}
                />
                <input
                  type="button"
                  value="Submit Feedback"
                  onClick={submitFeedback}
                />
              </div>
            </div>
          </div>
          <Snackbar
            open={openToast}
            autoHideDuration={5000}
            onClose={handleToastClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            TransitionComponent={"SlideTransition"}
          >
            <div className={toastStatus ? "toast-success" : "toast-error"}>
              <span>
                {toastStatus ? <ThumbUpAltIcon /> : <ErrorOutlineIcon />}{" "}
              </span>
              <span>
                {toastStatus
                  ? "Feedback Form Submitted Successfully"
                  : "Error in Form Submission"}{" "}
              </span>
            </div>
          </Snackbar>
        </Box>
      </Modal>
    </div>
  );
};
