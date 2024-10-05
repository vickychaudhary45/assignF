import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { createLearningPath, getCoursesToInclude, getFinalSequalizeCourses, getSubscriptionsToInclude } from 'src/services/learning-paths/services';
import { images } from 'src/config/images';
import _ from 'lodash';
import MessageAlert from '../MessageAlert/MessageAlert';
import { parseJwt } from 'src/config/utils';
import { subscription_status } from 'src/services/role-privileges/services';
import { PulseLoader } from '../Loader/Loader';
import TransferList from '../TransferList/TransferList';
import TransferLisSubscription from '../TransferLisSubscription/TransferList';
import { useAppState } from 'src/stateManagement';

const CreateLearningForm = (props) => {
  const [selectedCourses, setSelectedCourses] = useState('');
  const [courses, setCourses] = useState('');
  const [selectedBundles, setSelectedBundles] = useState('');
  const [subscriptions, setSubscriptions] = useState('');
  const [subscriptionShow, setSubscriptionShow] = useState(false);
  const [coursesShow, setCoursesShow] = useState(false);
  const [searchedCourse, setSearchedCourse] = useState('true');
  const [searchedSubscription, setSearchedSubscription] = useState('true');
  const [learningTitle, setLearningTitle] = useState('');
  const [sequalizedCourses, setSequalizedCourses] = useState('');
  const [sequalizeShow, setSequalizedShow] = useState('');
  const [alert, setAlert] = useState(false);
  const [alertResponse, setAlertResponse] = useState('');
  const [isLimited, setIsLimited] = useState('');
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState('');
  const [subdisabled, setSubdisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const { state: App } = useAppState();

  var searchTimeout = () => { };

  useEffect(() => {
    const user_data = JSON.parse(localStorage.getItem('user_data'));
    const userInfo = parseJwt(user_data?.data.token);
    let user_id = userInfo.userId;
    setLoading(true);
    subscription_status(user_id).then(
      (res) => {
        if (res.subscription_disabled === 1) {
          setSubdisabled(true);
        }
        setLoading(false);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  useEffect(() => {
    setSequalizedShow(false);
  }, [selectedBundles, selectedCourses]);

  useEffect(() => {
    if (coursesShow === false) {
      setSelectedCourses('');
    }
    if (subscriptionShow === false) {
      setSelectedBundles('');
    }
  }, [coursesShow, subscriptionShow]);

  const requestSearch = (type, searchedVal) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      if (type === 'subscriptions') setSearchedSubscription(searchedVal);
      else if (type === 'courses') setSearchedCourse(searchedVal);
    }, 1000);
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(sequalizedCourses);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSequalizedCourses(items);
  }

  const handleCheckbox = (section) => {
    setSequalizedCourses('');
    if (section === 'Courses') {
      setCoursesShow(!coursesShow);
    }
    if (section === 'Subscriptions') {
      if (subdisabled === true) {
        const alertObj = {
          status: 'warning',
          message: 'Subscription is disabled for your account.',
        };
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
        setAlertResponse(alertObj);
      } else {
        setSubscriptionShow(!subscriptionShow);
      }
    }
  };

  useEffect(async () => {
    await getCoursesToInclude(searchedCourse).then((res) => {
      if (res.status === 'success' && res?.data.length > 0) {
        let finalList = [];
        if (selectedCourses?.length > 0) {
          res.data.filter(function (item) {
            let i = selectedCourses.findIndex((course) => course.id == item.id);
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
    });
  }, [searchedCourse]);

  useEffect(async () => {
    await getSubscriptionsToInclude(searchedSubscription).then((res) => {
      if (res.status === true && res?.data.length > 0) {
        let finalList = [];
        res.data.filter(function (item) {
          item.iconlear = images.bundle_img;
          if (selectedBundles?.length > 0) {
            let i = selectedBundles.findIndex((subscription) => subscription.lms_subscription_id == item.lms_subscription_id);
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
    });
  }, [searchedSubscription]);

  const getFinalCourses = async () => {
    let result = selectedCourses;
    if (selectedBundles && selectedBundles.length > 0) {
      const subscriptionIds = [];
      let allSelectedBundles = selectedBundles.map((bundle) => {
        subscriptionIds.push(bundle.lms_subscription_id);
      });
      await getFinalSequalizeCourses({ plan_ids: subscriptionIds }).then(
        (res) => {
          if (res.status === 'success' && res?.data.length > 0) {
            result = _.unionWith(res.data, result, _.isEqual);
          }
        }
      );
    }
    if (!result || !result.length) {
      const alertObj = {
        status: 'warning',
        message: 'Add Courses/Subscription first.',
      };
      setAlertResponse(alertObj);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
    setSequalizedCourses(result);
  };

  useEffect(() => {
    if (sequalizedCourses?.length > 0) {
      setSequalizedShow(true);
    } else {
      setSequalizedShow(false);
    }
  }, [sequalizedCourses]);

  const handleSubmit = async () => {
    setDisable(true);
    if (!learningTitle) {
      const alertObj = {
        status: 'warning',
        message: 'Learning Path Title is missing.',
      };
      setAlertResponse(alertObj);
      setAlert(true);
      setDisable(false);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      return;
    }
    let regExp = /[a-zA-Z]/g;
    if (!regExp.test(learningTitle)) {
      const alertObj = {
        status: 'warning',
        message: 'Learning Path Title should have letter also.',
      };
      setAlertResponse(alertObj);
      setAlert(true);
      setDisable(false);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      return;
    }
    let formData = {
      name: learningTitle,
      is_limited: isLimited ? 1 : 0,
      startdate: startDate,
      enddate: endDate,
      // selectedcourses: _.map(selectedCourses, ['id', 'type']),
      selectedcourses: selectedCourses ? selectedCourses.map((course) => {
        return { course_id: course.id, type: course.type };
      })
        : '',
      selectedsubscription: selectedBundles ? selectedBundles.map(
        (subscription) => subscription.lms_subscription_id)
        : '',
      finalsequence: sequalizedCourses
        ? sequalizedCourses.map((course) => {
          return { course_id: course.id, type: course.type };
        })
        : '',
    };
    await createLearningPath(formData).then((res) => {
      setAlertResponse(res);
      setAlert(true);
      setDisable(false);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      if (res.status === 'success') {
        setAlertResponse({
          status: 'success',
          message: 'Learning Path created successfully.',
        });
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
          window.location.href = `/enroll-users`;
          setDisable(false);
        }, 3000);
      }
    });
  };

  return (
    <div className='container'>
      <div className='heading-block'>
        <h3>Create Learning Path</h3>
      </div>
      <div className="details-block">
        {!loading ? (
          <>
            {/* team-name */}
            <div className="team-name">
              <div className="title">
                {props.title}
                <span>{props.star}</span>
              </div>
              <input
                type="text"
                value={learningTitle}
                onChange={(e) => setLearningTitle(e.target.value)}
                placeholder={props.team_name_placeholder}
              />
            </div>
            <div className="assign-type is-limited">
              <div className="checkbox-group">
                <label className="checkbox-style">
                  Date Range
                  <input type="checkbox" onChange={() => setIsLimited(!isLimited)} />
                  <span className="checkmark"></span>
                </label>
                {isLimited && (
                  <>
                    <div className="start-date">
                      <input
                        type="date"
                        value={startDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div className="end-date">
                      <input
                        type="date"
                        value={endDate}
                        min={new Date(startDate).toISOString().split('T')[0]}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* type-block */}
            <div className="assign-type">
              <div className="title">
                {props.title_type}
                <span>{props.star}</span>
              </div>
              <div className="checkbox-group">
                {props.checkbox.map((name, index) => {
                  return (
                    <>
                      {!!App?.privileges?.is_trail && name.txt !== 'Courses' && (
                        <label className="checkbox-style" key={index}>
                          {name.txt}
                          <input type="checkbox" onChange={() => handleCheckbox(name.txt)} />
                          <span className="checkmark"></span>
                        </label>
                      )}

                      {!!!App?.privileges?.is_trail && (
                        <label className="checkbox-style" key={index}>
                          {name.txt}
                          <input type="checkbox" onChange={() => handleCheckbox(name.txt)} />
                          <span className="checkmark"></span>
                        </label>
                      )}
                    </>
                  );
                })}
              </div>
            </div>

            {/* courses-block */}
            {coursesShow && (
              <>
                <TransferList
                  selectedCourses={selectedCourses}
                  setSelectedCourses={setSelectedCourses}
                  courses={courses}
                  setCourses={setCourses}
                  requestSearch={requestSearch}
                />
              </>
            )}

            {/* learning-block */}
            {!subdisabled ? (
              <>
                {subscriptionShow && (
                  <>
                    <TransferLisSubscription
                      selectedCourses={selectedBundles}
                      setSelectedCourses={setSelectedBundles}
                      courses={subscriptions}
                      setCourses={setSubscriptions}
                      requestSearch={requestSearch}
                    />
                  </>
                )}
              </>
            ) : (''
            )}

            <DragDropContext onDragEnd={handleOnDragEnd}>
              {/* courses-block */}
              {sequalizeShow && (
                <div className="block course-block">
                  <div className="title">
                    {props.sequalize_block.title}
                    <span>{props.sequalize_block.star}</span>
                  </div>
                  <div className="list-group">
                    <div className="head-block">
                      <label>{sequalizedCourses?.length} Courses</label>
                    </div>
                    <Droppable droppableId="sequalize-course-list">
                      {(provided) => (
                        <div className="course-list sequalize-course-list list"
                          {...provided.droppableProps} ref={provided.innerRef}
                        >
                          {sequalizedCourses?.length > 0 &&
                            sequalizedCourses?.map((item, index) => {
                              return (
                                <Draggable draggableId={'list-item-' + index} index={index} key={index}>
                                  {(provided) => (
                                    <div className={`list-item-${index} list-item`} ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <div className="course-img">
                                        <figure>
                                          <img className="img-full" alt=""
                                            src={item?.src ? process.env.REACT_APP_WEB_MEDIA_URL + item?.src?.replace('media/', '')
                                              : images.lambda}
                                          />
                                        </figure>
                                        <div className="course-title">
                                          {item.title_txt} - <b>{item.type}</b>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              );
                            })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                </div>
              )}
            </DragDropContext>
            {/* btn-group */}
            <div className="btn-group">
              {(sequalizeShow && !disable) && (
                <div className={`btn btnMain btn-learning`} onClick={handleSubmit}>
                  Create Learning Path
                </div>
              )}
              {(sequalizeShow && disable) && (
                <div className={`btn btnMain btn-learning`}>
                  Creating...!
                </div>
              )}
              {!sequalizeShow && (
                <div className={`btn btnMain btn-learning`} onClick={getFinalCourses}>
                  Create Sequence
                </div>
              )}
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
          </>
        ) : (
          <div className="loader">
            <PulseLoader className="inner-loader-div" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateLearningForm;
