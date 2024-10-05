import React, { useEffect, useState } from "react";
import BtnMain from "../BtnMain/BtnMain";
import { BtnProps } from "../Props/BtnProps";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { createLearningPath, getCoursesToInclude, getFinalSequalizeCourses, getSubscriptionsToInclude } from "src/services/learning-paths/services";
import { images } from "src/config/images";
import _ from "lodash";
import MessageAlert from "../MessageAlert/MessageAlert";
import moment from "moment";
import { parseJwt } from "src/config/utils";
import { subscription_status } from "src/services/role-privileges/services";
import { PulseLoader } from "../Loader/Loader";
import TransferList from "../TransferList/TransferList";
import TransferLisSubscriptionEdit from "../TransferLisSubscription/TransferListEdit";
import { useAppState } from "src/stateManagement";

const EditLearningForm = (props) => {
  const [selectedCourses, setSelectedCourses] = useState(props?.learningPath.courses);
  const [courses, setCourses] = useState('');
  const [selectedBundles, setSelectedBundles] = useState('');
  const [subscriptions, setSubscriptions] = useState('');
  const [subscriptionShow, setSubscriptionShow] = useState(false);
  const [coursesShow, setCoursesShow] = useState(false);
  const [searchedCourse, setSearchedCourse] = useState('true')
  const [searchedSubscription, setSearchedSubscription] = useState('true')
  const [learningTitle, setLearningTitle] = useState('');
  const [testTitle, setTestTitle] = useState('');
  const [sequalizedCourses, setSequalizedCourses] = useState('');
  const [sequalizeShow, setSequalizedShow] = useState('');
  const [alert, setAlert] = useState(false);
  const [alertResponse, setAlertResponse] = useState('');
  const [isLimited, setIsLimited] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState('');
  const [subdisabled, setSubdisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const { state: App } = useAppState();

  var searchTimeout = () => { };
  useEffect(() => {
    setSequalizedCourses([])
    setSequalizedShow(false);
  }, [selectedBundles, selectedCourses])
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
  }, [coursesShow, subscriptionShow])

  useEffect(() => {
    if (props?.learningPath) {
      setLearningTitle(props?.learningPath.name);
      setTestTitle(props?.learningPath.name);
      setSelectedCourses(props?.learningPath.courses);
      setCoursesShow(props?.learningPath.courses && !App?.privileges?.is_trail ? true : false);
      setSelectedBundles(props?.learningPath.subscriptions);
      setSubscriptionShow(props?.learningPath.subscriptions ? true : false);
      setSequalizedCourses(props?.learningPath.final_sequence_list);
      setSequalizedShow(props?.learningPath.final_sequence_list ? true : false);
      setIsLimited(props?.learningPath?.is_limited ? true : false);
      props?.learningPath?.is_limited && setStartDate(moment(props?.learningPath?.start_date).format('yyyy-MM-DD'))
      props?.learningPath?.is_limited && setEndDate(moment(props?.learningPath?.end_date).format('yyyy-MM-DD'))
    }
  }, [props.learningPath])

  const requestSearch = (type, searchedVal) => {
    searchTimeout = setTimeout(() => {
      if (type === 'subscriptions')
        setSearchedSubscription(searchedVal);
      else if (type === 'courses')
        setSearchedCourse(searchedVal)
    }, 1000)
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
    if (section === 'Courses' && !App?.privileges?.is_trail) {
      setCoursesShow(!coursesShow)
    }
    if (section === 'Subscriptions') {
      if (subdisabled === true) {
        const alertObj = {
          status: "warning",
          message: "Subscription is disabled for your account.",
        }
        setAlert(true);
        setAlertResponse(alertObj);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      } else {
        setSubscriptionShow(!subscriptionShow)
      }
    }
  }

  useEffect(async () => {
    if (searchedCourse) {
      await getCoursesToInclude(searchedCourse).then((res) => {
        if (res.status === 'success' && res?.data.length > 0) {
          let finalList = [];
          if (selectedCourses?.length > 0) {
            res.data.filter(function (item) {
              let i = selectedCourses.findIndex(course => (course.id == item.id && course.type == item.type));
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
        if (res.status === true && res?.data.length > 0) {
          let finalList = [];
          res.data.filter(function (item) {
            item.iconlear = images.bundle_img;
            if (selectedBundles?.length > 0) {
              let i = selectedBundles.findIndex(subscription => (subscription.id == item.lms_subscription_id));
              if (i <= -1) {
                finalList.push({ id: item.lms_subscription_id, title_txt: item.name, iconlear: item.iconlear });
              }
              return null;
            } else {
              finalList.push({ id: item.lms_subscription_id, title_txt: item.name, iconlear: item.iconlear });
            }
          });
          setSubscriptions([...finalList]);
        }
      })
    } else {
      setSubscriptions('');
    }
  }, [searchedSubscription])

  const getFinalCourses = async () => {
    let result = selectedCourses;
    if (selectedBundles && selectedBundles.length > 0) {
      const subscriptionIds = [];
      let allSelectedBundles = selectedBundles.map((bundle) => {
        subscriptionIds.push(bundle.id);
      })
      await getFinalSequalizeCourses({ plan_ids: subscriptionIds }).then(res => {
        if (res.status === 'success' && (res?.data.length > 0)) {
          result = _.unionWith(res.data, result, _.isEqual);
        }
      })
    }
    if (!result || !result.length) {
      const alertObj = {
        status: "warning",
        message: "Add Courses/Subscription first.",
      }
      setAlertResponse(alertObj)
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
    setSequalizedCourses(result);
  }
  useEffect(() => {
    if (sequalizedCourses?.length > 0) {
      setSequalizedShow(true);
    } else {
      setSequalizedShow(false);
    }
  }, [sequalizedCourses])

  const handleSubmit = async () => {
    setDisable(true);
    if (!learningTitle) {
      const alertObj = {
        status: "warning",
        message: "Learning Path Title is missing.",
      }
      setAlertResponse(alertObj)
      setAlert(true);
      setDisable(false);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      return;
    }
    if (endDate && startDate) {
      if (endDate < startDate) {
        const alertObj = {
          status: "warning",
          message: "Kindly enter valid start date and end date.",
        }
        setAlertResponse(alertObj)
        setAlert(true);
        setDisable(false);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
        return;
      }
    }
    let formData = {
      name: learningTitle,
      test_name: testTitle,
      is_limited: isLimited ? 1 : 0,
      startdate: isLimited ? startDate : new Date().toISOString().split('T')[0],
      enddate: isLimited ? endDate : '',
      selectedcourses: selectedCourses ? selectedCourses.map(course => { return { 'course_id': course.id, 'type': course.type } }) : '',
      selectedsubscription: _.map(selectedBundles, 'id'),
      finalsequence: sequalizedCourses ? sequalizedCourses.map(course => { return { 'course_id': course.id, 'type': course.type } }) : ''
    };
    await createLearningPath(formData, props.learningPath.id).then((res) => {
      setAlertResponse(res);
      setAlert(true);
      setDisable(false);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      if (res.status === 'success') {
        const alertObj = {
          status: "success",
          message: "Learning Path updated successfully.",
        }
        setAlertResponse(res)
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
          setDisable(false);
          window.location.href = `/learning`;
        }, 3000);
      }
    })
  }
  return (
    <div className="details-block">
      {!loading ?
        <>
          {/* team-name */}
          <div className="team-name">
            <div className="title">
              {props.title}
              <span>{props.star}</span>
            </div>
            <input type="text" value={learningTitle} onChange={(e) => setLearningTitle(e.target.value)} placeholder={props.team_name_placeholder} />
          </div>
          <div className="assign-type is-limited">
            <div className="checkbox-group">
              <label className="checkbox-style">
                Date Range
                <input type="checkbox" checked={isLimited} onChange={() => setIsLimited(!isLimited)} />
                <span className="checkmark"></span>
              </label>
              {isLimited &&
                <>
                  <div className="start-date">
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                  </div>
                  <div className="end-date">
                    <input type="date" value={endDate} min={
                      new Date(startDate).toISOString().split('T')[0]
                    } onChange={(e) => setEndDate(e.target.value)} />
                  </div>
                </>
              }
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
                    {!!App?.privileges?.is_trail && name.txt !== 'Courses' &&
                      <label className="checkbox-style" key={index}>
                        {name.txt}
                        <input type="checkbox" checked={name.txt === 'Courses' ? coursesShow : subscriptionShow} onChange={() => handleCheckbox(name.txt)} />
                        <span className="checkmark"></span>
                      </label>
                    }
                    {!!!App?.privileges?.is_trail &&
                      <label className="checkbox-style" key={index}>
                        {name.txt}
                        <input type="checkbox" checked={name.txt === 'Courses' ? coursesShow : subscriptionShow} onChange={() => handleCheckbox(name.txt)} />
                        <span className="checkmark"></span>
                      </label>
                    }
                  </>
                );
              })}
            </div>
          </div>
          {/* courses-block */}
          {coursesShow &&
            <>
              <TransferList
                selectedCourses={selectedCourses}
                setSelectedCourses={setSelectedCourses}
                courses={courses}
                setCourses={setCourses}
                requestSearch={requestSearch}
                searchTimeout={searchTimeout}
              />
            </>
          }
          {/* learning-block */}
          {!subdisabled ?
            <>
              {subscriptionShow &&
                <>
                  <TransferLisSubscriptionEdit
                    selectedCourses={selectedBundles}
                    setSelectedCourses={setSelectedBundles}
                    courses={subscriptions}
                    setCourses={setSubscriptions}
                    requestSearch={requestSearch}
                    searchTimeout={searchTimeout}
                  />
                </>
              }
            </> : ("")}
          <DragDropContext onDragEnd={handleOnDragEnd}>
            {/* courses-block */}
            {sequalizeShow &&
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
                      <div className="course-list sequalize-course-list list" {...provided.droppableProps} ref={provided.innerRef}>
                        {(sequalizedCourses?.length > 0) && sequalizedCourses?.map((item, index) => {
                          return (
                            <Draggable draggableId={'list-item-' + index} index={index} key={index}>
                              {(provided) => (
                                <div className={`list-item-${index} list-item`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                  <div className="course-img">
                                    <figure>
                                      <img className="img-full" alt=''
                                        src={item?.src ? process.env.REACT_APP_WEB_MEDIA_URL + item?.src?.replace("media/", "") : images.lambda}
                                      />
                                    </figure>
                                    <div className="course-title">{item.title_txt} - <b>{item.type}</b></div>
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
            }
          </DragDropContext>
          {/* btn-group */}
          <div className="btn-group">
            {(sequalizeShow && !disable) &&
              <div className={`btn btnMain btn-learning`} onClick={handleSubmit}>
                Update Learning Path
              </div>
            }
            {(sequalizeShow && disable) && (
              <div className={`btn btnMain btn-learning`}>
                Updating...!
              </div>
            )}
            {!sequalizeShow &&
              <div className={`btn btnMain btn-learning`} onClick={getFinalCourses}>
                Create Sequalize
              </div>
            }
            <BtnMain {...BtnProps.btn_cancel_learning} />
          </div>
          {/* Alert modal */}
          <MessageAlert
            severity={alertResponse?.status}
            message={alertResponse?.message}
            onClick={() => {
              setAlert(false);
            }}
            open={alert}
          />
        </> : (
          <div className="loader">
            <PulseLoader />
          </div>
        )}
    </div>
  );
};

export default EditLearningForm;
