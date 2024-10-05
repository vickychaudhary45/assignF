import React, { useEffect, useState } from "react";
import { getCoursesToInclude, getSubscriptionsToInclude, getLearningPaths } from "src/services/learning-paths/services";
import { images } from "src/config/images";
import _ from "lodash";
import MessageAlert from "../MessageAlert/MessageAlert";
import { parseJwt } from "src/config/utils";
import { subscription_status } from "src/services/role-privileges/services";
import { PulseLoader } from "../Loader/Loader";
import TransferList from "../TransferList/TransferList";
import TransferLisSubscription from "../TransferLisSubscription/TransferList";
import TransferListLearningPath from "../TransferListLearningPath/TransferList";
import { useAppState } from "src/stateManagement";
import { CircularProgressWithLabel } from "../MUIComponents/MUIComponents";
import "./AssignCourseSubcriptions.scss";

const AssignCourseSubcriptions = (props) => {
  const { state: App } = useAppState();
  const { selectedCourses, setSelectedCourses, sequalizedCourses, setSequalizedCourses, selectedBundles, setSelectedBundles, upload, selectedLearningPaths, setSelectedLearningPaths, btnloading, progress } = props;
  const [courses, setCourses] = useState('');
  const [subscriptions, setSubscriptions] = useState('');
  const [learningPaths, setLearningPaths] = useState(null);
  const [subscriptionShow, setSubscriptionShow] = useState(false);
  const [coursesShow, setCoursesShow] = useState(false);
  const [learningPathShow, setLearningPathShow] = useState(false);
  const [searchedCourse, setSearchedCourse] = useState('true')
  const [searchedSubscription, setSearchedSubscription] = useState('true')
  const [searchedLearningPath, setSearchedLearningPath] = useState('');
  const [sequalizeShow, setSequalizedShow] = useState('');
  const [alert, setAlert] = useState(false);
  const [alertResponse, setAlertResponse] = useState('');
  const [subdisabled, setSubdisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCheckbox, setSelectedCheckbox] = useState("");

  useEffect(() => {
    const user_data = JSON.parse(localStorage.getItem('user_data'));
    const userInfo = parseJwt(user_data?.data.token);
    let user_id = userInfo.userId;
    setLoading(true);
    subscription_status(user_id).then((res) => {
      if (res.subscription_disabled === 1) {
        setSubdisabled(true);
      }
      setLoading(false);
    }, (err) => {
      // console.log(err);
    });
  }, []);

  useEffect(() => {
    if (coursesShow === false) {
      setSelectedCourses('');
    }
    if (subscriptionShow === false) {
      setSelectedBundles('');
    }
    if (learningPathShow === false) {
      setSelectedLearningPaths('');
    }
  }, [coursesShow, subscriptionShow, learningPathShow])

  const requestSearch = (type, searchedVal) => {
    if (type === 'subscriptions')
      setSearchedSubscription(searchedVal);
    else if (type === 'courses')
      setSearchedCourse(searchedVal)
    else if (type === 'learning_path')
      setSearchedLearningPath(searchedVal);
  };

  const handleCheckbox = (section) => {
    setSequalizedCourses('');
    if (selectedCheckbox == section) {
      setSelectedCheckbox("");
      setCoursesShow(false);
      setSubscriptionShow(false);
      setLearningPathShow(false);
    }
    else {
      if (section === 'Courses') {
        setCoursesShow(true)
        setSelectedCheckbox(section);
      }
      if (section === 'Subscriptions') {
        if (subdisabled === true) {
          const alertObj = {
            status: "warning",
            message: "Subscription is disabled for your account.",
          }
          setAlert(true);
          setAlertResponse(alertObj);
        } else {
          setSubscriptionShow(true)
          setSelectedCheckbox(section);
        }
      }
      if (section === 'Learning Paths') {
        setLearningPathShow(true)
        setSelectedCheckbox(section);
      }
    }
  }

  useEffect(async () => {
    await getLearningPaths('', '', searchedLearningPath).then((res) => {
      if (res?.status === "success" && res?.data.length > 0) {
        let finalList = [];
        if (selectedLearningPaths?.length > 0) {
          res.data.filter(function (item) {
            let i = selectedLearningPaths.findIndex(course => (course.id == item.id));
            if (i <= -1) {
              finalList.push(item);
            }
            return null;
          });
        } else {
          finalList = res.data;
        }
        setLearningPaths(finalList);
      }
    })
  }, [searchedLearningPath]);

  useEffect(async () => {
    if (searchedCourse) {
      await getCoursesToInclude(searchedCourse).then((res) => {
        if (res.status === 'success' && res?.data.length > 0) {
          let finalList = [];
          if (selectedCourses?.length > 0) {
            res.data.filter(function (item) {
              let i = selectedCourses.findIndex(course => (course.id == item.id));
              if (i <= -1) {
                finalList.push(item);
              }
              return null;
            });
          } else {
            finalList = res.data;
          }
          setCourses(finalList);
        }
      })
    } else {
      setCourses('');
    }
  }, [searchedCourse])

  useEffect(async () => {
    if (searchedSubscription) {
      await getSubscriptionsToInclude(searchedSubscription).then((res) => {
        let finalList = [];
        if (res.status === true && res?.data.length > 0) {
          res.data.filter(function (item) {
            item.iconlear = images.bundle_img;
            if (selectedBundles?.length > 0) {
              let i = selectedBundles.findIndex(subscription => (subscription.id == item.id));
              if (i <= -1) {
                finalList.push(item);
              }
              return null;
            } else {
              finalList.push(item);
            }
          });
          setSubscriptions(finalList);
        }
      })
    } else {
      setSubscriptions('');
    }
  }, [searchedSubscription])

  useEffect(() => {
    if (sequalizedCourses?.length > 0) {
      setSequalizedShow(true);
    } else {
      setSequalizedShow(false);
    }
  }, [sequalizedCourses])

  return (
    <div className="course-details-block">
      {!loading ?
        <>
          <div className="assign-type">
            <div className="title">
              {props.title_type}
            </div>
            <div className="checkbox-group">
              {props.checkbox_add_bulk_user.map((name, index) => {
                return (
                  <>
                    {!!
                      App?.privileges?.is_trail && name.txt !== 'Courses' && (
                        <label className="checkbox-style" key={index}>
                          {name.txt}
                          <input type="checkbox" checked={selectedCheckbox === name.txt} onChange={() => handleCheckbox(name.txt)} />
                          <span className="checkmark"></span>
                        </label>
                      )
                    }
                    {!!
                      !App?.privileges?.is_trail &&
                      <label className="checkbox-style" key={index}>
                        {name.txt}
                        <input type="checkbox" checked={selectedCheckbox === name.txt} onChange={() => handleCheckbox(name.txt)} />
                        <span className="checkmark"></span>
                      </label>
                    }
                    {!!
                      App?.privileges?.is_trail && name.txt !== 'Learning Paths' && (
                        <label className="checkbox-style" key={index}>
                          {name.txt}
                          <input type="checkbox" checked={selectedCheckbox === name.txt} onChange={() => handleCheckbox(name.txt)} />
                          <span className="checkmark"></span>
                        </label>
                      )
                    }
                  </>
                );
              })}
            </div>
          </div>
          {/* courses-block */}
          {selectedCheckbox === "Courses" && coursesShow &&
            <TransferList
              selectedCourses={selectedCourses}
              setSelectedCourses={setSelectedCourses}
              courses={courses}
              setCourses={setCourses}
              requestSearch={requestSearch}
            />
          }
          {/* subscription-block */}
          {!subdisabled ?
            <>
              {selectedCheckbox === "Subscriptions" && subscriptionShow &&
                <TransferLisSubscription
                  selectedCourses={selectedBundles}
                  setSelectedCourses={setSelectedBundles}
                  courses={subscriptions}
                  setCourses={setSubscriptions}
                  requestSearch={requestSearch}
                />
              }
            </> : ("")}
          {/* learning-block */}
          {selectedCheckbox === "Learning Paths" && learningPathShow && (
            <TransferListLearningPath
              selectedLP={selectedLearningPaths}
              setSelectedLP={setSelectedLearningPaths}
              learningPath={learningPaths}
              setLearningPath={setLearningPaths}
              requestSearch={requestSearch}
            />
          )}
          <div className="btn-group">
            {btnloading ?
              <div className="btn-primary" >
                <CircularProgressWithLabel size={40} className="button-progress" value={progress} />
                <p style={{ color: "#2647ab", margin: 0 }}>Please wait for 2 minutes to complete the enrollments.</p>
              </div>
              : <div className={`btn btnMain btn-learning`} onClick={upload}>Upload Users</div>
            }
          </div>
          {/* Alert modal */}
          <div>
            <MessageAlert
              severity={alertResponse?.status}
              message={alertResponse?.message}
              onClick={() => {
                setAlert(false);
              }}
              open={alert}
            />
          </div>
        </> : (
          <div className="loader">
            <PulseLoader className="inner-loader-div" color={'#f16521'} height={60} width={60} />
          </div>
        )}
    </div>
  );
};

export default AssignCourseSubcriptions;
