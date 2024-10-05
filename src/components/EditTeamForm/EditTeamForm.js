import React, { useEffect, useState } from "react";
import BtnMain from "../BtnMain/BtnMain";
import { BtnProps } from "../Props/BtnProps";
import { searchuser, updateTeam } from "src/services/teams-services/services";
import { getCoursesToInclude, getSubscriptionListTeams, getLearningPaths } from "src/services/learning-paths/services";
import { subscription_status } from "src/services/role-privileges/services";
import { parseJwt } from "src/config/utils";
import MessageAlert from "../../components/MessageAlert/MessageAlert";
import { PulseLoader } from "../Loader/Loader";
import { images } from "src/config/images";
import { HelpOutlineOutlined } from "@material-ui/icons";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { CircularProgressWithLabel } from "../MUIComponents/MUIComponents";
import * as xlsx from "xlsx";

const EditTeamForm = (props) => {
  const [teamName, setTeamName] = useState("");
  const [courses, setCourses] = useState([]);
  const [searchedCourse, setSearchedCourse] = useState('')
  const [selectedCourses, setSelectedCourses] = useState('');
  const [defaultSelectedCourses, setDefaultSelectedCourses] = useState([]);
  const [selectedBundles, setSelectedBundles] = useState('');
  const [defaultSelectedBundles, setDefaultSelectedBundles] = useState('');
  const [searchedSubscription, setSearchedSubscription] = useState('')
  const [subscriptions, setSubscriptions] = useState('');
  const [searchManager, setSearchManager] = useState('');
  const [selectedManager, setSelectedManager] = useState('');
  const [manager, setManager] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');
  const [users, setUsers] = useState([]);
  const [defaultSelectedUsers, setDefaultSelectedUsers] = useState('');
  const [searchedUsers, setSearchedUsers] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [learning_path, setLearning_path] = useState('');
  const [defaultSelectedLearningPath, setDefaultSelectedLearningPath] = useState('');
  const [selectedLearningPath, setSelectedLearningPath] = useState('');
  const [searchedLearningPath, setSearchedLearningPath] = useState('');
  const [subscriptionShow, setSubscriptionShow] = useState(false);
  const [coursesShow, setCoursesShow] = useState(false);
  const [learningShow, setLearningShow] = useState(false);
  const [subdisabled, setSubdisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [teamId, setTeamId] = useState('');
  const [topen, setTopen] = useState(false);
  const [progress, setProgress] = React.useState(2);
  const [usertype, setUserType] = useState('users');
  const [file, setFile] = React.useState("");
  const [newSelectedUsers, setNewSelectedUsers] = React.useState([]);
  const baseUrl = process.env.REACT_APP_B2B_MEDIA_URL;

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files[0].name.split(".")[1] === "xlsx") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (evt) => {
        let errorlog = [];
        const bstr = evt.target.result;
        const wb = xlsx.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = xlsx.utils.sheet_to_json(ws);

        let isValid = true;
        data.forEach((element) => {
          if (!element.firstname || !element?.lastname || !element?.email) {
            isValid = false;
            errorlog.push(element);
          }
        });
        if (isValid) {
          setFile(data);
        }
        if (errorlog.length > 0) {
          setOpen(true);
          setMessage(`${errorlog.length} rows have invalid data`);
          setSeverity("error");
          setTimeout(() => {
            setOpen(false);
            setLoading(true);
            const text = JSON.stringify(errorlog);
            const a = document.createElement("a");
            const file = new Blob([text], { type: "text/plain" });
            a.href = URL.createObjectURL(file);
            a.download = "errorlog.txt";
            a.click();
            setLoading(false);
          }, 2000);
        }

      };
      reader.readAsBinaryString(file);
    }
    else {
      setMessage("Please upload a valid excel file in xlsx format");
      setSeverity("warning");
      setOpen(true);
    }
  };

  {/*This useEffect hook contains the logic to get only those users which are newly selected to add in a team means they were not already in that team .*/ }
  useEffect(() => {
    const newArray = selectedUsers.filter(selectedUser => {
      return !props?.teamInfo?.team_users?.some(propItem => selectedUser.user_id === propItem.user_id);
    });
    setNewSelectedUsers(newArray);
  }, [selectedUsers]);

  useEffect(() => {
    if (props.teamInfo) {
      setTeamName(props?.teamInfo?.team?.team_name);
      setSelectedCourses(props.teamInfo.assigned_courses);
      setTeamId(props.teamInfo?.team.id);
      setDefaultSelectedCourses(props?.teamInfo?.assigned_courses.length > 0 ? props?.teamInfo?.assigned_courses?.map(item => item.id + item.type) : []);
      setDefaultSelectedBundles(props?.teamInfo?.subscriptions_assigned && props?.teamInfo?.subscriptions_assigned?.map(item => item?.id));
      setSelectedBundles(props.teamInfo.subscriptions_assigned);
      setSelectedUsers(props.teamInfo.team_users);
      setDefaultSelectedUsers(props?.teamInfo?.team_users?.map(item => item.id));
      setSelectedLearningPath(props.teamInfo.assigned_learning_path);
      setDefaultSelectedLearningPath(props?.teamInfo?.assigned_learning_path?.map(item => item.id));
      setSelectedManager(props.teamInfo.manager);
      if (props?.teamInfo?.assigned_courses.length > 0) {
        setCoursesShow(true)
      }
      if (props?.teamInfo?.subscriptions_assigned.length > 0) {
        setSubscriptionShow(true)
      }
      if (props.teamInfo.assigned_learning_path.length > 0) {
        setLearningShow(true)
      }
    }
  }, [props.teamInfo]);

  useEffect(async () => {
    if (searchedLearningPath.length >= 1) {
      await getLearningPaths('', '', searchedLearningPath).then((res) => {
        if (res.status === 'success' && res?.data.length > 0) {
          setTimeout(() => {
            let finalList = [];
            if (props?.teamInfo?.assigned_learning_path?.length > 0) {
              res.data.filter(function (item) {
                let i = props?.teamInfo?.assigned_learning_path.findIndex(course => (course.id == item.id));
                if (i <= -1) {
                  finalList.push(item);
                }
                return null;
              });
            } else {
              finalList = res.data;
            }
            setLearning_path(finalList);
          }, 2000)
        }
      })
    } else {
      await getLearningPaths('', '', searchedLearningPath).then((res) => {
        if (res.status === 'success' && res?.data.length > 0) {
          setTimeout(() => {
            let finalList = [];
            if (props?.teamInfo?.assigned_learning_path?.length > 0) {
              res.data.filter(function (item) {
                let i = props?.teamInfo?.assigned_learning_path.findIndex(course => (course.id == item.id));
                if (i <= -1) {
                  finalList.push(item);
                }
                return null;
              });
            } else {
              finalList = res.data;
            }
            setLearning_path(finalList);
          }, 2000)
        }
      })
    }
  }, [searchedLearningPath])

  // todo : convert into switch case
  const requestSearch = (type, searchedVal) => {
    if (type === 'subscriptions')
      setSearchedSubscription(searchedVal);
    else if (type === 'courses')
      setSearchedCourse(searchedVal)
    else if (type == 'manager')
      setSearchManager(searchedVal)
    else if (type == 'users')
      setSearchedUsers(searchedVal)
    else if (type == 'learning_path')
      setSearchedLearningPath(searchedVal)
  }

  const cancelSearch = (type) => {
    if (type === 'subscriptions')
      setSearchedSubscription('');
    else if (type === 'courses') {
      setCourses('');
      setSearchedCourse('')
    }
    else if (type === 'manager') {
      setManager('');
      setSearchManager('')
    }
    else if (type === 'users') {
      setSearchedUsers('')
    }
    else if (type === 'learning_path') {
      setSearchedLearningPath('')
    }
  };

  const handleClose = () => {
    setTopen(false);
  };

  const handleOpen = () => {
    setTopen(true);
  };

  useEffect(async () => {
    await getCoursesToInclude(searchedCourse).then((res) => {
      if (res.status === 'success' && res?.data.length > 0) {
        setTimeout(() => {
          let finalList = [];
          if (props?.teamInfo?.assigned_courses?.length > 0) {
            res.data.filter(function (item) {
              let i = props?.teamInfo?.assigned_courses.findIndex(course => (course.id == item.id));
              if (i <= -1) {
                finalList.push(item);
              }
              return null;
            });
          } else {
            finalList = res.data;
          }
          setCourses(finalList);
        }, 2000)
      }
    })
  }, [searchedCourse])

  useEffect(() => {
    setLoading(true);
    const user_data = JSON.parse(localStorage.getItem('user_data'));
    const userInfo = parseJwt(user_data?.data.token);
    let user_id = userInfo.userId;
    subscription_status(user_id).then((res) => {
      if (res.subscription_disabled === 1) {
        setSubdisabled(true);
        setLoading(false);
      }
      setLoading(false);
    }, (err) => {
      console.log(err);
    });

  }, []);
  useEffect(async () => {
    await getSubscriptionListTeams(searchedSubscription).then((res) => {
      if (res.status === true && res?.data.length > 0) {
        setTimeout(() => {
          let finalList = [];
          res.data.filter(function (item) {
            item.iconlear = images.bundle_img;
            if (props?.teamInfo?.subscriptions_assigned?.length > 0 && props?.teamInfo?.subscriptions_assigned[0] !== null) {
              let i = props?.teamInfo?.subscriptions_assigned.findIndex(subscription => (subscription.id == item.lms_subscription_id));
              if (i <= -1) {
                finalList.push({ id: item.lms_subscription_id, title_txt: item.name, iconlear: item.iconlear });
              }
              return null;
            } else {
              finalList.push({ id: item.lms_subscription_id, title_txt: item.name, iconlear: item.iconlear });
            }
          });
          setSubscriptions(finalList);
        }, 2000)
      }
    })
  }, [searchedSubscription])

  useEffect(async () => {
    if (searchManager) {
      await searchuser(searchManager, 'manager').then((res) => {
        if (res.status === 200) {
          setManager(res.data.users);
        }
      })
    }

  }, [searchManager])

  useEffect(async () => {
    if (searchedUsers.length >= 1) {
      await searchuser(searchedUsers).then((res) => {
        if (res.status === 200) {
          setTimeout(() => {
            let finalList = [];
            res.data.users?.filter(function (item) {
              if (props?.teamInfo?.team_users.length > 0) {
                let i = props?.teamInfo?.team_users.findIndex(user => (user.user_details?.id == item.id || user?.id == item.id));
                if (i <= -1) {
                  finalList.push(item);
                }
                return null;
              } else {
                finalList.push(item);
              }
            });
            setUsers(finalList);
          }, 2000)
        }
      })
    } else {
      await searchuser(searchedUsers).then((res) => {
        if (res.status === 200) {
          setTimeout(() => {
            let finalList = [];
            res.data.users?.filter(function (item) {
              if (props?.teamInfo?.team_users.length > 0) {
                let i = props?.teamInfo?.team_users.findIndex(user => (user.user_details?.id == item.id || user?.id == item.id));
                if (i <= -1) {
                  finalList.push(item);
                }
                return null;
              } else {
                finalList.push(item);
              }
            });
            setUsers(finalList);
          }, 2000)
        }
      })
    }
  }, [searchedUsers])

  const handleUserType = (section) => {
    setUserType(section);
  }

  const updateMyTeam = (e) => {
    e.preventDefault();
    const user_data = JSON.parse(localStorage.getItem('user_data'));
    let regExp = /^[a-zA-Z0-9-_ ]{5,40}$/i;
    if (teamName == '') {
      setBtnLoading(false);
      setMessage("Team name cannot be empty.");
      setOpen(true);
      setSeverity("error")
      setTimeout(() => {
        setOpen(false);
      }, 3000);
      return;
    }
    if (!regExp.test(teamName)) {
      setBtnLoading(false);
      setOpen(true);
      setMessage("Team name should contain given characters and length.");
      setSeverity("error")
      setTimeout(() => {
        setOpen(false);
      }, 3000);
      return;
    }
    if ((selectedCourses?.length > 0 || selectedBundles?.length > 0 || selectedLearningPath.length > 0) && teamName !== null && (selectedUsers?.length > 0 || file) && selectedManager?.id) {
      setBtnLoading(true);
      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
      }, 1600);

      const data = {
        fileinfo: file,
        company_id: user_data.data.company_id,
        team_id: teamId,
        name: teamName,
        courses: selectedCourses?.length ? selectedCourses?.map(course => { return { 'course_id': course.id, 'type': course.type } }) : null,
        subscriptions: selectedBundles ? selectedBundles.map(subscription => subscription?.lms_subscription_id || subscription?.id) : null,
        assigned_users: selectedUsers ? selectedUsers?.map(user => user.id || user.user_id) : null,
        manager_id: selectedManager?.id,
        learning_Path: selectedLearningPath ? selectedLearningPath.map(learning_Path => learning_Path.id) : null,
        new_selected_users: newSelectedUsers ? newSelectedUsers?.map(user => user.id || user.user_id) : null,  // sending this list to backend  of those users who are not already present in a team(newly selected)
      } 
      updateTeam(data).then((res) => {
        setBtnLoading(false);
        if (res.data.status === true) {
          setOpen(true);
          setMessage("Team updated successfully");
          setSeverity("success");
          clearInterval(timer);
          setTimeout(() => {
            setOpen(false);
            window.location.href = `/teams`;
          }, 3000);
        }
      })
    } else {
      setBtnLoading(false);
      setOpen(true);
      setMessage("All Fields are required");
      setSeverity("error")
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  }
  const handleCheckbox = (section) => {
    if (section === 'Courses')
      if (selectedCourses.length == 0) {
        setCoursesShow(!coursesShow)
      } else {
        setOpen(true);
        setMessage("You cannot uncheck if there is selected Courses");
        setSeverity("warning")
        setTimeout(() => {
          setOpen(false);
        }, 3000);
      }
    if (section === 'Subscrip. Bundle')
      if (selectedBundles.length == 0) {
        setSubscriptionShow(!subscriptionShow)
      } else {
        setOpen(true);
        setMessage("You cannot uncheck if there is selected Subscriptions");
        setSeverity("warning")
        setTimeout(() => {
          setOpen(false);
        }, 3000);
      }
    if (section === 'Learning Paths')
      if (selectedLearningPath.length == 0) {
        setLearningShow(!learningShow)
      } else {
        setOpen(true);
        setMessage("You cannot uncheck if there is selected learning paths");
        setSeverity("warning")
        setTimeout(() => {
          setOpen(false);
        }, 3000);
      }
  }
  return (
    <div>
      {!loading ? (
        <>
          <form onSubmit={updateMyTeam}>
            {/* team-name-block */}
            <div className="team-name">
              <div className="title">
                Team Name
                <span>*</span>
              </div>
              <div className="inputwithicon">
                <input type="text"
                  placeholder="Enter team name"
                  value={teamName}
                  pattern="[a-zA-Z0-9-_ ]{5,40}"
                  onChange={(e) => setTeamName(e.target.value)}
                />
                <Tooltip open={topen} onClose={handleClose} onOpen={handleOpen}>
                  <IconButton>
                    <HelpOutlineOutlined className="icon" />
                  </IconButton>
                </Tooltip>
              </div>
              {topen ? <div className="error-msg">
                <small style={{ color: '#FF615E', fontSize: '11px' }}>Characters allowed :
                  <span>a - z, A - Z, 0 - 9, _ , - and space. <br />min & max-length for name should be 5 & 40 respectively</span>
                </small>
              </div> : null}
            </div>
            {/* courses-block */}
            <div className="assign-type">
              <div className="title">
                {props.title_type}
                <span>{props.star}</span>
              </div>
              <div className="checkbox-group">
                <label className="checkbox-style">
                  Courses
                  <input type="checkbox" onChange={() => handleCheckbox('Courses')} checked={coursesShow ? true : false} />
                  <span className="checkmark"></span>
                </label>
                {subdisabled === false ? (
                  <label className="checkbox-style">
                    Subscriptions
                    <input type="checkbox" onChange={() => handleCheckbox('Subscrip. Bundle')} checked={subscriptionShow ? true : false} />
                    <span className="checkmark"></span>
                  </label>) : ("")}
                <label className="checkbox-style">
                  Learning Paths
                  <input type="checkbox" onChange={() => handleCheckbox('Learning Paths')} checked={learningShow ? true : false} />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>     

            {/* manager-block */}
            <div className="manager-block users-block">
              <div className="title">
                Assigned Manager
                <span>*</span>
              </div>
              <div className="list-group">
                {selectedManager ?
                  <div className="list-item" >
                    <div className="profile-img">
                      <figure>
                        <img className="img-full" src={selectedManager.profile_picture ? `${baseUrl}${selectedManager.profile_picture}` : images.user_img} alt="" />
                      </figure>
                      <div className="profile-title">{selectedManager.firstname} {selectedManager.lastname}</div>
                    </div>
                    <div className="email-id">{selectedManager.email}</div>
                  </div>
                  : ("")}
              </div>
            </div>
            <div className="assign-type">
              <div className="title">
                User Upload Type
                <span>*</span>
              </div>
              <div className="checkbox-group">
                <label className="checkbox-style">
                  Users
                  <input type="radio" value="users" checked={usertype === 'users'} name="team_type" id="team_type_users" onChange={() => handleUserType('users')} />
                  <span className="checkmark"></span>
                </label>
                <label className="checkbox-style">
                  Bulk Upload
                  <input type="radio" value="bulk" checked={usertype === 'bulk'} name="team_type" id="team_type_bulk" onChange={() => handleUserType('bulk')} />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
            {/* users-block */}
            <div className="manager-block users-block">
              {usertype === 'bulk' && (
                <>
                  <div className="upload">
                    <div className="Instructions">
                      <label htmlFor="upload">Upload File</label>
                      <input
                        type="file"
                        name="upload"
                        id="upload"
                        onChange={readUploadFile}
                      />
                      <p style={{ margin: "5px 0" }}>Please download the <a href={`${process.env.REACT_APP_B2B_MEDIA_URL}bulkupload/new-sample.xlsx`} download>Sample File,</a> remove the existing records, add the new records as per the format and upload the file.</p>
                      <div className="notes-container">
                        <b>Notes:</b>
                        <ul>
                          <li>&nbsp; &nbsp; Please enter values for all fields in the Excel file.</li>
                          <li>&nbsp; &nbsp; Ensure that there are no hyperlinks present in any of the cell values. </li>
                          <li>&nbsp; &nbsp; To enroll users, select <strong>Courses/Subscriptions/Learning Path(s)</strong> from the <strong>checkbox/dropdown</strong> below, and then click on Upload.</li>
                          <li>&nbsp; &nbsp; If you are uploading a file with more than 100 records, please note that it may take some time to process.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* btn-group */}
            <div className="btn-group">
              {!btnLoading ? (<button className="btn btn-team" type="submit">Save</button>) :
                <div className="btn-primary" >
                  <CircularProgressWithLabel size={40} className="button-progress" value={progress} />
                  <p style={{ color: "#2647ab", margin: 0 }}>Please wait for 2 minutes to complete the enrollments.</p>
                </div>
              }
              <BtnMain {...BtnProps.btn_cancel_team} />
            </div>
          </form>
          <div>
            <MessageAlert
              open={open}
              severity={severity}
              message={message}
              onClick={() => setOpen(false)}
            />
          </div>
        </>) :
        (<div className="loader-div">
          <PulseLoader />
        </div>
        )}
    </div>
  );
};

export default EditTeamForm;