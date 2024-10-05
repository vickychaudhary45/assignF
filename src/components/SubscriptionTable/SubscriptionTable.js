import React, { useEffect, useState } from "react";
import { images } from "../../config/images";
import ModalDefault from "../ModalDefault/ModalDefault";
import { PulseLoader } from "../Loader/Loader";
import { Table, Accordion, Paper, TableBody, TableContainer, TableHead, TableRow, TableCell } from "@material-ui/core";
import Radio from '@mui/material/Radio';
import SearchBar from "material-ui-search-bar";
import MessageAlert from "../MessageAlert/MessageAlert";
import { getSubscription, assignSubscription } from "src/services/subscription/services";
import { searchuser, getCourseTeams } from 'src/services/teams-services/services';
import "./SubscriptionTable.scss"

const course = (course_title) => {
  return (
    <div className="course">
      <div className="course-detail">{course_title}</div>
    </div>
  );
};

const SubscriptionTable = (props) => {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchedUser, setSearchedUser] = useState(null);
  const [teams, setTeams] = useState([]);
  const [searchedTeam, setSearchedTeam] = useState(null);
  const [searched, setSearched] = useState("");
  const [selected, setSelected] = React.useState([]);
  const [alert, setAlert] = useState(false);
  const [alertResponse, setAlertResponse] = useState('');
  const [teamsShow, setTeamsShow] = useState(false);
  const [usersShow, setUsersShow] = useState(false);
  const [loading, setLoading] = useState(true);
  let searchTimeout;

  const handleCheckbox = (section) => {
    if (section === 'Users') {
      setUsersShow(!usersShow)
    }
    if (section === 'Teams') {
      setTeamsShow(!teamsShow)
    }
  }

  const toggleSelected = (course_id) => (e) => {
    if (e.target.checked) {
      setSelected([course_id])
    }
  };

  useEffect(() => {
    if (selected) {
      if (selected.length > 0) {
        if (selected.length === 1) {
          let course = courses?.filter((row) => {
            if (row?.lms_subscription_id === selected[0]) {
              return row;
            }
          })
          setSelectedCourse(course[0].name);
        } else {
          setSelectedCourse(`You have selected ${selected.length} Subscriptions`);
        }
      } else {
        setSelectedCourse(null);
      }
    }
  }, [selected]);

  const requestSearch = (searchedVal) => {
    setSearched(searchedVal);
  };

  const cancelSearch = (type) => {
    if (type == 'courses') {
      setSearched("");
    } else if (type == 'users') {
      setSearchedUser('');
    } else if (type == 'teams') {
      setSearchedTeam('');
    }
  };

  const fetchData = async () => {
    const response = await getSubscription(searched);
    if (response?.status === true) {
      setCourses(response?.data);
      setLoading(false)
    }
  }
  useEffect(() => {
    const searchSubs = setTimeout(() => {
      fetchData();
    }, 2000)
    return () => clearTimeout(searchSubs);
  }, [searched])

  useEffect(async () => {
    await searchuser(searchedUser).then((res) => {
      if (res?.data.status === true && res?.data?.users?.length > 0) {
        let finalList = [];
        if (selectedUsers?.length > 0) {
          res.data.users?.filter(function (item) {
            let i = selectedUsers.findIndex(user => (user.id == item.id));
            if (i <= -1) {
              let obj = {
                id: item.id,
                src: images.activities4,
                name: (<> {`${item.firstname} ${item.lastname}`} <span>({item.email})</span></>),
                iconclose: "icon-cross",
              }
              finalList.push(obj);
            }
            return null;
          });
        } else {
          res.data.users?.filter(function (item) {
            let obj = {
              id: item.id,
              src: images.activities4,
              name: (<>{`${item.firstname} ${item.lastname}`} <span>({item.email})</span></>),
              iconclose: "icon-cross",
            }
            finalList.push(obj);
          });
        }
        setUsers(finalList);
      } else {
        setUsers('');
      }
    })
  }, [searchedUser])

  useEffect(async () => {
    await getCourseTeams(searchedTeam).then((res) => {
      if (res?.data?.length > 0) {
        let finalList = [];
        if (selectedTeams?.length > 0) {
          res.data.filter(function (item) {
            let i = selectedTeams.findIndex(team => (team.id == item.id));
            if (i <= -1) {
              let obj = {
                id: item.id,
                title_txt: item.team_name,
                img: images.team_img,
                iconclose: "icon-cross",
              }
              finalList.push(obj);
            }
            return null;
          });
        } else {
          res.data.filter(function (item) {
            let obj = {
              id: item.id,
              title_txt: item.team_name,
              img: images.team_img,
              iconclose: "icon-cross",
            }
            finalList.push(obj);
          });
        }
        setTeams(finalList);
      }
    })
  }, [searchedTeam])

  const handleClickOpen = (course_id = null, product_type = null) => {
    if (!course_id && (Object.keys(selected).length === 0)) {
      setAlert(true);
      setAlertResponse({ status: 'error', message: 'Please Select the Subscription first.' })
      setTimeout(() => {
        setAlert(false)
      }, 3000)
      return false;
    }
    if (course_id) {
      let course = courses.filter((row) => {
        if (row.course_id === course_id && row.product_type === product_type) {
          return row;
        }
      })
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTeamsShow(false);
    setUsersShow(false);
    let addedUser = [];
    selectedUsers.map((el) => addedUser.push(el));
    setSelectedUsers([]);
    setUsers([...addedUser, ...users]);
    let addedTeams = [];
    selectedTeams.map((el) => addedTeams.push(el));
    setSelectedTeams([]);
    setTeams([...addedTeams, ...teams]);
  };

  const completeAssignment = async () => {
    const formData = {
      is_teams_selected: selectedTeams?.length ? 1 : 0,
      is_users_selected: selectedUsers?.length ? 1 : 0,
      user_id: (usersShow && selectedUsers?.length > 0) ? selectedUsers.map(user => user.id) : [],
      team_id: (teamsShow && selectedTeams?.length > 0) ? selectedTeams.map(team => team.id) : [],
      subscriptions_id: selected,
    };
    const response = await assignSubscription(formData);
    setAlertResponse(response);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000)
    setOpen(false);
    setUsersShow(false);
    setTeamsShow(false);
    setSelected([]);
    setUsers([])
    setTeams([])
    setSelectedCourse(null);
    setSelectedUsers([]);
    setSelectedTeams(null);
    setSearchedUser('')
    setSearchedTeam('')
  }
  return (
    <>
      {/* research-report */}
      <div className="subscription-block">
        <div className="research-report">
          <Accordion>
            <div className="subs-heading-block">
              <div className="subs-search-bar">
                <SearchBar
                  placeholder={props.heading_block.placeholder}
                  value={searched}
                  onChange={(searchVal) => requestSearch(searchVal)}
                  onCancelSearch={() => cancelSearch('courses')}
                />
              </div>
              <div className="assign-btn-group group" onClick={() => { handleClickOpen() }}>
                <div className="btn btn-assign">
                  <i className="icon icon-assign-icon-team"></i>
                  <span>{props.heading_block.btn_assign}</span>
                </div>
              </div>
            </div>
          </Accordion>
        </div>
        {/* table */}
        <TableContainer component={Paper} className="table-content">
          {!loading ? (
            <Table className="subscription-table">
              <TableHead>
                <TableRow>
                  <TableCell className="check_group" padding="checkbox"></TableCell>
                  <TableCell className="managers table-heading">Subscription Name</TableCell>
                  <TableCell className="managers table-heading">Duration</TableCell>
                  <TableCell className="managers table-heading">Description</TableCell>
                  <TableCell className="content-box table-heading">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(courses?.length > 0) ? courses.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="check_group" padding="checkbox">
                      <Radio
                        checked={selected.includes(row.lms_subscription_id)}
                        onChange={toggleSelected(row.lms_subscription_id)}
                        value={selected}
                        name="radio-buttons"
                      />
                    </TableCell>
                    <TableCell> {course(row.name)} </TableCell>
                    <TableCell>
                      <span>{(row.overwrite_expiry) ? row.expiry_days + " Day(s)" : row.subscription_for + " Month(s)"}</span>
                    </TableCell>
                    <TableCell> <span>{row.subscription_desc}</span> </TableCell>
                    <TableCell> <span>${row.price}</span> </TableCell>
                  </TableRow>
                )) : (
                  <TableRow className="no-course-table-row">
                    <TableCell className="no-course">
                      No Result Found.
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          ) : <div className="loader-div">
            <PulseLoader />
          </div>}
        </TableContainer>
      </div>
      <MessageAlert
        severity={alertResponse?.status}
        message={alertResponse?.message}
        onClick={() => { setAlert(false); }}
        open={alert}
      />
      {/* modal-block */}
      <ModalDefault
        open={open}
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
export default SubscriptionTable;
