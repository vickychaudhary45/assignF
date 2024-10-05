import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { searchuser, letsCreateTeam } from "src/services/teams-services/services";
import { getCoursesToInclude, getSubscriptionListTeams, getLearningPaths } from "src/services/learning-paths/services";
import { images } from "src/config/images";
import MessageAlert from "../MessageAlert/MessageAlert";
import { parseJwt } from "src/config/utils";
import { PulseLoader } from "../Loader/Loader";
import { Tooltip, IconButton } from '@material-ui/core';
import { subscription_status } from "src/services/role-privileges/services";
import { HelpOutlineOutlined } from "@material-ui/icons";
import TransferList from "../TransferList/TransferList";
import TransferLisSubscription from "../TransferLisSubscription/TransferList";
import TransferListLearningPath from "../TransferListLearningPath/TransferList";
import TransferListUser from "../TransferListUser/TransferList";
import TransferListManager from "../TransferListUserManager/TransferList";
import { CircularProgressWithLabel } from "../MUIComponents/MUIComponents";
import * as xlsx from "xlsx";

const CreateTeamForm = (props) => {
  const [teamName, setTeamName] = useState("");
  const [courses, setCourses] = useState([]);
  const [searchedCourse, setSearchedCourse] = useState('true')
  const [selectedCourses, setSelectedCourses] = useState('');
  const [selectedBundles, setSelectedBundles] = useState('');
  const [searchedSubscription, setSearchedSubscription] = useState('true')
  const [subscriptions, setSubscriptions] = useState('');
  const [searchManager, setSearchManager] = useState('');
  const [selectedMaanager, setSelectedMaanager] = useState('');
  const [manager, setManager] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');
  const [users, setUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState('');
  const [selectedUsers, setSelectedUsers] = useState('');
  const [learning_path, setLearning_path] = useState('');
  const [selectedLearningPath, setSelectedLearningPath] = useState('');
  const [searchedLearningPath, setSearchedLearningPath] = useState('');
  const [subscriptionShow, setSubscriptionShow] = useState(false);
  const [coursesShow, setCoursesShow] = useState(false);
  const [learningShow, setLearningShow] = useState(false);
  const [subdisabled, setSubdisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [topen, setTopen] = useState(false);
  const [progress, setProgress] = React.useState(2);
  const [usertype, setUserType] = useState('users');
  const [file, setFile] = React.useState("");
  const [btnActive, setBtnActive] = useState(false);

  const history = useHistory();
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
      setTimeout(() => {
        setOpen(false);
      }, 2000)
    }
  };

  useEffect(async () => {
    await getLearningPaths('', '', searchedLearningPath).then((res) => {
      if (res.status === 'success' && res?.data.length > 0) {
        setTimeout(() => {
          let finalList = [];
          if (selectedLearningPath?.length > 0) {
            res.data.filter(function (item) {
              let i = selectedLearningPath.findIndex(course => (course.id == item.id));
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
  }, [searchedLearningPath])

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
  var searchTimeout = () => { };
  // todo : convert into switch case
  const requestSearch = (type, searchedVal) => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
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
    }, 1000)
  }

  const cancelSearch = (type) => {
    if (type === 'subscriptions')
      setSearchedSubscription('');
    else if (type === 'courses') {
      setCourses('');
      setSearchedCourse('')
    }
    else if (type === 'manager') {
      setManager([]);
      setSearchManager('')
    }
    else if (type === 'users') {
      setSearchedUsers('')
    }
    else if (type === 'learning_path') {
      setSearchedLearningPath('')
    }
  };
  const handleInfo = () => {
    setTopen(!topen);
  };

  const handleCancel = () => {
    setBtnActive(true);
    setTimeout(() => {
      history.push('/teams');
    }, 3000);
  }

  useEffect(async () => {
    await getCoursesToInclude(searchedCourse).then((res) => {
      if (res.status === 'success' && res?.data.length > 0) {
        setTimeout(() => {
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
        }, 2000)
      }
    })
  }, [searchedCourse])

  useEffect(async () => {
    await getSubscriptionListTeams(searchedSubscription).then((res) => {
      if (res.status === true && res?.data.length > 0) {
        setTimeout(() => {
          let finalList = [];
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
        }, 2000)
      }
    })
  }, [searchedSubscription])

  useEffect(async () => {
    if (searchManager) {
      if (searchManager.length > 2) {
        await searchuser(searchManager, 'manager').then((res) => {
          if (res.status === 200) {
            if (res.data.users?.length > 0) {
              setTimeout(() => {
                let finalList = [];
                res.data.users?.filter(function (item) {
                  if (selectedMaanager.length > 0) {
                    let i = selectedMaanager.findIndex(user => (user.user_details?.id == item.id || user?.id == item.id));
                    if (i <= -1) {
                      finalList.push(item);
                    }
                    return null;
                  } else {
                    finalList.push(item);
                  }
                });
                setManager(finalList);
              }, 2000)
            }
            else {
              setManager([]);
            }
          }
        })
      }
    } else {
      await searchuser('search', 'manager').then((res) => {
        if (res.status === 200) {
          if (res.data.users?.length > 0) {
            setTimeout(() => {
              let finalList = [];
              res.data.users?.filter(function (item) {
                if (selectedMaanager.length > 0) {
                  let i = selectedMaanager.findIndex(user => (user.user_details?.id == item.id || user?.id == item.id));
                  if (i <= -1) {
                    finalList.push(item);
                  }
                  return null;
                } else {
                  finalList.push(item);
                }
              });
              setManager(finalList);
            }, 2000)
          } else {
            setManager([]);
          }
        }
      })
    }
  }, [searchManager])

  useEffect(async () => {
    await searchuser(searchedUsers).then((res) => {
      if (res.status === 200) {
        setTimeout(() => {
          let finalList = [];
          res.data.users?.filter(function (item) {
            if (selectedUsers?.length > 0) {
              let i = selectedUsers.findIndex(user => (user.id == item.id));
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
  }, [searchedUsers])

  const handleCheckbox = (section) => {
    if (section === 'Courses') {
      setCoursesShow(!coursesShow)
    }
    if (section === 'Subscrip. Bundle') {
      setSubscriptionShow(!subscriptionShow)
    }
    if (section === 'Learning Paths') {
      setLearningShow(!learningShow)
    }
  }
  const handleUserType = (section) => {
    setUserType(section);
  }
  const createTeam = (e) => {
    e.preventDefault();
    const user_data = JSON.parse(localStorage.getItem('user_data'));
    let regExp = /^[a-zA-Z0-9-_ ]{5,40}$/i;
    if (btnActive) {
      setOpen(true);
      setMessage("Your data will be lost");
      setSeverity("warning");
    } else {
      if (teamName == '') {
        setBtnLoading(false);
        setOpen(true);
        setMessage("Team name cannot be empty.");
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
      else if ((selectedCourses?.length > 0 || selectedBundles?.length > 0 || selectedLearningPath.length > 0) && teamName !== null && (selectedUsers?.length > 0 || file) && selectedMaanager.length > 0) {
        setBtnLoading(true);
        const timer = setInterval(() => {
          setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
        }, 1600);
        let managerId = ''
        selectedMaanager?.map(manager => {
          managerId = manager.id
        })
        const data = {
          fileinfo: file,
          company_id: user_data.data.company_id,
          name: teamName,
          courses: selectedCourses?.length ? selectedCourses?.map(course => { return { 'course_id': course.id, 'type': course.type } }) : null,
          subscriptions: selectedBundles ? selectedBundles.map(subscription => subscription.lms_subscription_id) : null,
          assigned_users: (selectedUsers) ? selectedUsers?.map(user => user.id) : null,
          manager_id: managerId,
          learning_Path: selectedLearningPath ? selectedLearningPath.map(learning_Path => learning_Path.id) : null,
        }

        letsCreateTeam(data).then((res) => {
          setBtnLoading(false);
          if (res.status === true) {
            setOpen(true);
            setMessage(res.message);
            setSeverity("success");
            clearInterval(timer);
            // redirect to /teams path after a delay of 1 second
            setTimeout(() => {
              setOpen(false);
              window.location.href = `/teams`;
            }, 3000);
          }
          else {
            setOpen(true);
            setMessage(res.message);
            setSeverity("error");
            setTimeout(() => {
              setOpen(false);
            }, 3000);
          }
        })
      } else {
        setBtnLoading(false);
        setOpen(true);
        setMessage("Please select all required fields");
        setSeverity("error");
        setTimeout(() => {
          setOpen(false);
        }, 3000);
      }
    }
  }

  return (
    <div className="details-block">
      {!loading ? (
        <>
          <form onSubmit={createTeam}>
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
                <Tooltip>
                  <IconButton onClick={handleInfo}>
                    <HelpOutlineOutlined className="icon" />
                  </IconButton>
                </Tooltip>
              </div>
              {topen ? <div className="error-msg">
                <small style={{ color: '#FF615E', fontSize: '11px' }}>Characters allowed :
                  <span>a - z, A - Z, 0 - 9, _ , - and space. <br />min & max-length should be 5 & 40 respectively </span>
                </small>
              </div> : null}
            </div>
            {/* type-block */}
            <div className="assign-type">
              <div className="title">
                {props.title_type}
                <span>{props.star}</span>
              </div>
              <div className="checkbox-group">
                <label className="checkbox-style">
                  Courses
                  <input type="checkbox" onChange={() => handleCheckbox('Courses')} />
                  <span className="checkmark"></span>
                </label>
                {subdisabled === false ? (
                  <label className="checkbox-style">
                    Subscriptions
                    <input type="checkbox" onChange={() => handleCheckbox('Subscrip. Bundle')} />
                    <span className="checkmark"></span>
                  </label>) : ("")}
                <label className="checkbox-style">
                  Learning Paths
                  <input type="checkbox" onChange={() => handleCheckbox('Learning Paths')} />
                  <span className="checkmark"></span>
                </label>
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
                />
              </>
            }

            {/* Subscription block*/}
            {!subdisabled ?
              <>
                {subscriptionShow &&
                  <>
                    <TransferLisSubscription
                      selectedCourses={selectedBundles}
                      setSelectedCourses={setSelectedBundles}
                      courses={subscriptions}
                      setCourses={setSubscriptions}
                      requestSearch={requestSearch}
                    />
                  </>
                }
              </> : ("")}

            {/* Learning-Path block*/}
            {learningShow &&
              <>
                <div className="block learning-block">
                  <div className="title">
                    Assign Learning Paths
                    <span>*</span>
                  </div>
                </div>
                <TransferListLearningPath
                  selectedLP={selectedLearningPath}
                  setSelectedLP={setSelectedLearningPath}
                  learningPath={learning_path}
                  setLearningPath={setLearning_path}
                  requestSearch={requestSearch}
                />
              </>}
            {/* manager-block */}
            <div className="manager-block users-block">
              <div className="team-manager-name" >
                <div className="title">
                  Select a Manager
                  <span>*</span>
                </div>
              </div>
              <TransferListManager
                searchedUser={searchManager}
                setSearchedUser={setSearchManager}
                users={manager}
                setUsers={setManager}
                selectedUsers={selectedMaanager}
                setSelectedUsers={setSelectedMaanager}
                setBtnLoading={setBtnLoading}
                setOpen={setOpen}
                setMessage={setMessage}
                setSeverity={setSeverity}

              />
            </div>
            {/* users-block */}
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
            <div className="manager-block users-block">
              {usertype === 'users' && (
                <>
                  <TransferListUser
                    cancelSearch={cancelSearch}
                    searchedUser={searchedUsers}
                    setSearchedUser={setSearchedUsers}
                    users={users}
                    setUsers={setUsers}
                    selectedUsers={selectedUsers}
                    setSelectedUsers={setSelectedUsers} />
                </>
              )}
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
              )
              }
            </div>
            {/* btn-group */}
            <div className="btn-group">
              {!btnLoading ? (<button className="btn btn-team" type="submit">Create a Team</button>) :
                <div className="btn-primary" >
                  <CircularProgressWithLabel size={40} className="button-progress" value={progress} />
                  <p style={{ color: "#2647ab", margin: 0 }}>Please wait for 2 minutes to complete the enrollments.</p>
                </div>
              }
              <button className="btn btnMain btn-team" onClick={() => handleCancel()}>cancel</button>
            </div>
          </form>
          <div>
            <MessageAlert
              severity={severity}
              message={message}
              open={open}
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

export default CreateTeamForm;