import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from "@material-ui/core";
import { PulseLoader } from "../Loader/Loader";
import { images } from "../../config/images";
import { getNewLaunchedCourses, assignCourses, getUserEnrollmentDetails } from "src/services/courses/services";
import { getSubscriptionBundles } from "src/services/my-trainings/services";
import { requestToEnroll, requestedCourses } from "src/services/browse-courses/services";
import { searchuser, getCourseTeams } from 'src/services/teams-services/services';
import MessageAlert from "../MessageAlert/MessageAlert";
import ModalDefault from "../ModalDefault/ModalDefault";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Tooltip from "@material-ui/core/Tooltip";

const course = (course_title, featured_image, product_type) => {
  const typeMappings = {
    "OC": "Video Course",
    "PT": "Practice Test",
    "LAB": "Labs",
    "SANDBOX": "Sandbox",
  };

  let productType = typeMappings[product_type] || product_type;
  return (
    <div className="course">
      <div className="course-img">
        <figure>
          <img src={`${process.env.REACT_APP_WEB_MEDIA_URL}${featured_image?.replace("media/", "")}`} title={course_title} />
        </figure>
        <div className="course-detail">
          {`${course_title} - ${productType}`}
        </div>
      </div>
    </div>
  );
};

const NewLaunch = (props) => {
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isSubscription, setSubscription] = useState(null);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [request, setRequest] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState("");
  const [users, setUsers] = useState([]);
  const [searchedUser, setSearchedUser] = useState("");
  const [teams, setTeams] = useState([]);
  const [searchedTeam, setSearchedTeam] = useState("");
  const [teamsShow, setTeamsShow] = useState(false);
  const [usersShow, setUsersShow] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const [showRequested, setShowRequested] = useState(false); //show requested button
  const [requestedCoursesData, setRequestedCoursesData] = useState(null);  // it will shore requested courses id and product type
  const [courseId, setCourseId] = useState(null);
  const [productType, setProductType] = useState(null);
  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const user_id = user_data?.data?.user_id;
  const company_id = user_data?.data?.company_id;
  let searchTimeout;

  const enrolledCoursesData = async () => {
    const res = await getUserEnrollmentDetails();
    const courseType = res.data.map((data) => {
      const { course_id, enrollment_details } = data;
      const enrollmentDetailsObject = JSON.parse(enrollment_details);
      const productDetail = Object.keys(enrollmentDetailsObject);
      return { course_id, productDetail };
    });
    setEnrolledCourses(courseType);
  };

  const requestedcourse = async () => {
    const params = {
      page: 0,
      rowsPerPage: 10,
      searched: null,
    };
    const res = await requestedCourses(params);
    let courseData = res?.data.map((row) => ({
      course_id: row.course.course_id,
      course_type: row.prod_type
    }))
    setRequestedCoursesData(courseData);
  };

  useEffect(() => {
    !user_data?.data?.is_owner && enrolledCoursesData();
  }, []);

  useEffect(() => {
    !user_data?.data?.is_owner && requestedcourse();
  }, [showRequested]);

  const getSubsBundle = async () => {
    const res = await getSubscriptionBundles();
    setSubscription(res?.data);
  };

  useEffect(() => {
    !user_data?.data?.is_owner && getSubsBundle();
  }, []);

  const newLaunchedCourses = async () => {
    setLoading(true)
    const res = await getNewLaunchedCourses(search, company_id);
    if (res?.status === "success") {
      setCourseData(res?.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    newLaunchedCourses();
  }, []);

  const cancelSearch = (type) => {
    if (type == "courses") {
      setSearch("");
    } else if (type == "users") {
      setSearchedUser("");
    } else if (type == "teams") {
      setSearchedTeam("");
    }
  };

  const actionsAccess = (course_id, course_slug) => {
    return (
      <input
        className="btn-access-two"
        onClick={() => accessNow(course_id, course_slug)}
        type="button"
        value="Access Now"
      />
    );
  };

  const accessNow = (course_id, course_slug) => {
    const { data: { token }, } = JSON.parse(localStorage.getItem("user_data"));
    window.open(`${process.env.REACT_APP_LEARN_URL}/course/${course_slug}/${course_id}/?token=${token}`, "_blank");
  }

  const enrollRequest = async (course_id, product_type) => {
    const params = { course_id, user_id, company_id, product_type };
    const response = await requestToEnroll(params);
    setRequest(response);
    if (response.status === "success") {
      setShowRequested(true);
      setMessage(response.message);
      setOpen(true);
      setTimeout(() => {
        setMessage("");
        setOpen(false);
        setShowRequested(false);
      }, 3000);
    }
  }

  const handleCheckbox = (section) => {
    if (section === "Users") {
      setSearchedUser("");
      setUsersShow(!usersShow);
    }
    if (section === "Teams") {
      setSearchedTeam("");
      setTeamsShow(!teamsShow);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const completeAssignment = async () => {
    const courseList = [{
      id: courseId,
      product_type: productType,
    }];

    const formData = {
      users: usersShow && selectedUsers?.length > 0 ? selectedUsers.map(user => user.id) : [],
      teams: teamsShow && selectedTeams?.length > 0 ? selectedTeams.map(team => team.id) : [],
      courses: courseList,
    };
    const response = await assignCourses(formData);
    setRequest(response);
    setMessage(response?.message);
    setOpen(true);
    setOpenModal(false);
    setUsersShow(false);
    setTeamsShow(false);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
    setSelectedCourse([]);
    setSelectedUsers([]);
    setSelectedTeams([]);
  };

  const handleClickOpen = (course_id, product_type) => {
    setCourseId(course_id);
    setProductType(product_type);
    setOpenModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      searchTimeout = setTimeout(async () => {
        const res = await searchuser(searchedUser);
        if (res?.data.status === true && res?.data?.users?.length > 0) {
          let finalList = [];
          if (selectedUsers?.length > 0) {
            finalList = res.data.users
              .filter(item => !selectedUsers.some(user => user.id === item.id))
              .map(item => ({
                id: item.id,
                src: images.activities4,
                name: (<>{`${item.firstname} ${item.lastname}`}<span>({item.email})</span></>),
                iconclose: "icon-cross",
              }));
          } else {
            finalList = res.data.users.map(item => ({
              id: item.id,
              src: images.activities4,
              name: (<>{`${item.firstname} ${item.lastname}`}<span>({item.email})</span></>),
              iconclose: "icon-cross",
            }));
          }
          setUsers(finalList);
        } else {
          setUsers([]);
        }
      }, 1000);
    };
    user_data?.data?.is_owner && fetchData();
    return () => clearTimeout(searchTimeout);
  }, [searchedUser]);

  useEffect(() => {
    const fetchData = async () => {
      searchTimeout = setTimeout(async () => {
        const res = await getCourseTeams(searchedTeam);
        if (res?.data?.length > 0) {
          let finalList = [];
          if (selectedTeams?.length > 0) {
            finalList = res?.data
              .filter(item => selectedTeams.every(team => team.id !== item.id))
              .map(item => ({
                id: item.id,
                title_txt: item.team_name,
                img: images.team_img,
                iconclose: "icon-cross",
              }));
          } else {
            finalList = res?.data?.map(item => ({
              id: item.id,
              title_txt: item.team_name,
              img: images.team_img,
              iconclose: "icon-cross",
            }));
          }
          setTeams(finalList);
        }
      }, 1000);
    };
    user_data?.data?.is_owner && fetchData();
    return () => clearTimeout(searchTimeout);
  }, [searchedTeam]);

  const actions = (course_id, product_type) => {
    return (
      <div className="btn-admin-access">
        <div className="item-1 icon-btn" onClick={() => handleClickOpen(course_id, product_type)}>
          <Tooltip title="Assign to Teams/user(s)">
            <GroupAddIcon className="icon" />
          </Tooltip>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bannerContainer">
        <div className="bannerText">
          <div>
            <h3>Upgrade Your Skills</h3>
            <span> With Our Newly Launched Courses</span>
          </div>
        </div>
        <div className="bannerImage">
          <img src={`${process.env.REACT_APP_WEB_MEDIA_URL}whizlabs-it-certifications-training.webp`}
            alt="whizlabs is certifications online training provider"
          />
        </div>
      </div>
      <TableContainer component={Paper} className="table-content">
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell> Courses</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <div className="react-loader">
                <PulseLoader />
              </div>
            ) : (
              <>
                {courseData?.length > 0 ? (
                  courseData?.map((data, index) => {
                    let isPremiumPlus = isSubscription?.some((plan) => {
                      return plan.plan_title === "Premium Plus";
                    });
                    let isPremium = isSubscription?.some((plan) => {
                      return plan.plan_title === "Premium";
                    });
                    let isEnrolled = enrolledCourses?.some((row) => {
                      return (
                        row.course_id === data.course_id &&
                        row.productDetail.includes(data.product_type)
                      );
                    });
                    const isRequested = requestedCoursesData?.some(requestedCourse => (
                      requestedCourse.course_id === data.course_id && requestedCourse.course_type === data.product_type
                    ));
                    // this part of code contains the logic to show requested button, access now button and request to enroll button conditonally
                    let content2;
                    if (isRequested) {
                      content2 = (
                        <input className="btn-enroll-requested" type="button" value="Requested" />
                      )
                    }
                    else if (isEnrolled) {
                      content2 = (<>{actionsAccess(data.course_id, data.slug)}</>)
                    }
                    else {
                      content2 = (
                        <input
                          className="btn-enroll"
                          onClick={() =>
                            enrollRequest(data.course_id, data.product_type)
                          }
                          type="button"
                          value="Request to Enroll"
                        />
                      )
                    }

                    let content;
                    if (user_data.data.is_owner == 1) {
                      content = (
                        <TableCell>
                          {actions(data.course_id, data.product_type)}
                        </TableCell>
                      );
                    } else {
                      if (isSubscription?.length == 0) {
                        content = (
                          <TableCell>
                            <div className="actions">{content2}</div>
                          </TableCell>
                        );
                      } else {
                        if (isPremiumPlus) {
                          content = (
                            <TableCell>
                              {actionsAccess(data.course_id, data.slug)}
                            </TableCell>
                          );
                        } else if (isPremium) {
                          if (data.product_type === "PT" ||
                            data.product_type === "OC" ||
                            data.product_type === "LAB") {
                            content = (
                              <TableCell>
                                {actionsAccess(data.course_id, data.slug)}
                              </TableCell>
                            );
                          }
                          else {
                            content = (
                              <TableCell>
                                {isRequested ? (
                                  <input className="btn-enroll-requested" type="button" value="Requested" />
                                ) : (
                                  <input
                                    className="btn-enroll"
                                    onClick={() =>
                                      enrollRequest(data.course_id, data.product_type)
                                    }
                                    type="button"
                                    value="Request to Enroll"
                                  />
                                )}
                              </TableCell>
                            );
                          }
                        }
                        else if (!isPremium || !isPremiumPlus) {
                          if (data.product_type !== "SANDBOX" && data.product_type !== "LAB") {
                            content = (
                              <TableCell>
                                {actionsAccess(data.course_id, data.slug)}
                              </TableCell>
                            );
                          }
                          else {
                            content = (
                              <TableCell>
                                {isRequested ? (
                                  <input className="btn-enroll-requested" type="button" value="Requested" />
                                ) : (
                                  <input
                                    className="btn-enroll"
                                    onClick={() =>
                                      enrollRequest(data.course_id, data.product_type)
                                    }
                                    type="button"
                                    value="Request to Enroll"
                                  />
                                )}
                              </TableCell>
                            )
                          }
                        }
                      }
                    }
                    return (
                      <>
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            {course(data.title, data.featured_image, data.product_type)}
                          </TableCell>
                          {content}
                        </TableRow>
                      </>
                    );
                  })
                ) : (
                  <TableRow className="no-course-table-row">
                    <TableCell className="no-course" colSpan={8}>
                      No Result Found.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <MessageAlert
        severity={request?.status === "success" ? request?.status : "error"}
        message={message}
        onClick={() => {
          setOpen(false);
        }}
        open={open}
      />
      <ModalDefault
        open={openModal}
        handleClose={handleClose}
        searchedUser={searchedUser}
        setSearchedUser={setSearchedUser}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        setUsers={setUsers}
        users={users}
        searchedTeam={searchedTeam}
        setSearchedTeam={setSearchedTeam}
        teams={teams}
        setTeams={setTeams}
        setSelectedTeams={setSelectedTeams}
        selectedTeams={selectedTeams}
        selectedCourse={selectedCourse}
        completeAssignment={completeAssignment}
        teamsShow={teamsShow}
        usersShow={usersShow}
        handleCheckbox={handleCheckbox}
        cancelSearch={cancelSearch}
        {...props.modal_default}
      />
    </>
  );
};
export default NewLaunch;
