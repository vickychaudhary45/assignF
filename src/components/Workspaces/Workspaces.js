import { useState, useEffect } from 'react';
import './Workspaces.scss';
import WorkspacesTable from './WorkspacesTable';
import UserListModal from './UserListModal';
import { login } from "src/services/Lab-services/services";
import { getWorkSpaces, getUsers, runningWorkSpaces, createWorkspace, TerminateWorkspace } from "src/services/workspaces/services";
import { Refresh } from '@mui/icons-material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { CircularProgress, Typography } from '@mui/material';
import Swal from "sweetalert2";
import MessageAlert from "../MessageAlert/MessageAlert";
import moment from 'moment';
import { CSVLink } from "react-csv";


const user_data = JSON.parse(localStorage.getItem('user_data'));

const Workspaces = () => {
  const [viewModal, setViewModal] = useState(false);
  const [checkedUsersModal, setCheckedUsersModal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wsploading, setWspLoading] = useState(false);
  const [termLoading, setTermLoading] = useState(false);
  const [workspaces, setWorkspaces] = useState("");
  const [users, setUsers] = useState([]);
  const [labToken, setLabToken] = useState("");
  const [runningWsp, setRunningWsp] = useState([]);
  const [validity, setValidity] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertResponse, setAlertResponse] = useState('');
  const [selectedWorkspace, setSelectedWorkspace] = useState('');
  const [filter, setFilter] = useState({
    workspace_name: "",
    workspace_status: "",
  });
  const [filtered, setFiltered] = useState([]);
  const company_id = user_data.data.company_id;
  function total_weeks(start_date, end_date) {
    const start = moment(start_date);
    const end = moment(end_date);
    const duration = moment.duration(end.diff(start));
    const weeks = Math.floor(duration.asWeeks());
    return weeks;
  }

  async function WorkspaceData() {
    setLoading(true);
    login().then((res) => {
      if (res.status) {
        const data = {
          token: res.data.auth_token,
        }
        setLabToken(res.data.auth_token);
        var lab_token = res.data.auth_token;
        getWorkSpaces(data).then((res) => {
          if (res.data.status) {
            setWorkspaces(res.data.data);
            setSelectedWorkspace(res.data.data[0]?.slug);
            // setLoading(false);
            const data2 = {
              token: lab_token,
              workspace_slug: res.data.data[0]?.slug,
            }
            runningWorkSpaces(data2).then((res) => {
              if (res.data.status) {
                setLoading(false);
                let data = res.data.data.map((item) => {
                  return {
                    ...item,
                    start_date: moment(item.start_date).format('YYYY-MM-DD HH:mm:ss'),
                    end_date: moment(item.end_date).format('YYYY-MM-DD HH:mm:ss'),
                    validity: total_weeks(item.start_date, item.end_date),
                  }
                })
                setRunningWsp(data);
              }
              else {
                // console.log("something went wrong");
              }
            })
          }
          else {
            // console.log("something went wrong");
          }
        });
      }
      else {
        // console.log("something went wrong");
      }
    }
    );
  }
  async function fetchRunningWorkspaces(slug) {
    setLoading(true);
    if (slug === "") {
      setLoading(false);
      Swal.fire({
        title: "Warning",
        text: "Please select workspace",
        icon: "warning",
        confirmButtonText: "Ok",
        confirmButtonColor: "#4CAF50",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      })

      return;
    }
    const data = {
      token: labToken,
      workspace_slug: slug,
    }
    runningWorkSpaces(data).then((res) => {
      if (res.data.status) {
        setLoading(false);
        let data = res.data.data.map((item) => {
          return {
            ...item,
            start_date: moment(item.start_date).format('DD-MM-YYYY'),
            end_date: moment(item.end_date).format('DD-MM-YYYY'),
            validity: total_weeks(item.start_date, item.end_date),
          }
        })
        setRunningWsp(data);
      }
      else {
        // console.log("something went wrong");
      }
    })
  }

  async function UserData() {
    const searched = "";
    getUsers(searched, company_id).then(res => {
      if (res.status) {
        setUsers(res.data);
      }
      else {
        // console.log("something went wrong");
      }
    });
  }

  let finalData = checkedUsersModal.map((item) => {
    return {
      user_email_id: item.email,
      user_first_name: item.firstname,
      user_last_name: item.lastname,
      user_id: item.id
    }
  })

  function create() {
    if (checkedUsersModal.length === 0) {
      setAlertResponse({ status: 'error', msg: 'Please select atleast one user' })
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      // alert("Please select atleast one user");
      return;
    }
    if (validity === "") {
      setAlertResponse({ status: 'error', msg: 'Please select validity' })
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      // alert("Please select validity");
      return;
    }
    const data = {
      workspace_slug: selectedWorkspace,
      workspace_name: (workspaces.find((item) => item.slug === selectedWorkspace))?.title,
      workdoc_users: finalData,
      validity: validity,
      token: labToken,
    }
    Swal.fire({
      title: "confirm?",
      text: "Process will take upto 20 to 40m",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, create!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then(function (result) {
      if (result.value) {
        setWspLoading(true);
        createWorkspace(data).then((res) => {
          if (res?.data?.status) {
            setWspLoading(false);
            Swal.fire(
              "Success!",
              "Workspace creation initiated successfully",
              "success"
            )
            WorkspaceData();
            UserData();
            setCheckedUsersModal([]);
            setValidity("");
          } else {
            setWspLoading(false);
            Swal.fire(
              "Cancelled!",
              "Workspace not created.",
              "error"
            )
          }
        }
        )
      } else if (result.dismiss === "cancel") {
        Swal.fire(
          "Cancelled",
          "Workspace not created.",
          "error"
        )
      }
    }
    );
  }
  function terminateWsp(d) {
    const data2 = {
      workspace_slug: d.workspace_slug,
      token: labToken,
      user_name: d.user_name,
    }
    Swal.fire({
      title: "Are you sure?",
      text: "Terminate the workspace!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, terminate!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then(function (result) {
      if (result.value) {
        setTermLoading(true);
        TerminateWorkspace(data2).then((res) => {
          if (res.data.status) {
            if (res.data.data.workdoc_users.length > 0) {
              setTermLoading(false);
              Swal.fire(
                "Terminated!",
                "Workspace terminated successfully.",
                "success"
              )
              fetchRunningWorkspaces(data2.workspace_slug);
              UserData();
            }
            else {
              setTermLoading(false);
              Swal.fire(
                "Failed!",
                "Workspace not terminated.",
                "error"
              )
              fetchRunningWorkspaces(data2.workspace_slug);
              UserData();
            }
          } else {
            setTermLoading(false);
            Swal.fire(
              "Cancelled!",
              "Workspace not terminated.",
              "error"
            )
          }
        }
        )
      } else if (result.dismiss === "cancel") {
        Swal.fire(
          "Cancelled",
          "Workspace not terminated.",
          "error"
        )
      }
    }
    );
  }

  useEffect(() => {
    if (!workspaces) {
      WorkspaceData();
    }
    if (users.length === 0) {
      UserData();
    }
  }, [workspaces, users]);
  useEffect(() => {
    if (filter.workspace_name !== "") {
      const filtered = runningWsp.filter((item) => (item.workspace_name === filter.workspace_name))
      setFiltered(filtered);
      if (filter.workspace_status !== "") {
        const data1 = filtered.filter(
          (item) =>
            (item.workspace_env_status === filter.workspace_status)
        )
        setFiltered(data1);
      }
    } else {
      if (filter.workspace_status !== "") {
        const data2 = runningWsp.filter(
          (item) =>
            (item.workspace_env_status === filter.workspace_status)
        )
        setFiltered(data2);
      }
      else {
        setFiltered(runningWsp);
      }
    }
  }, [filter, runningWsp])

  const headers = [
    { label: 'User_email', key: 'user_email_id' },
    { label: 'Workspace Name', key: 'workspace_name' },
    { label: 'Workspace Status', key: 'workspace_env_status' },
    { label: 'Start Date UTC', key: 'start_date' },
    { label: 'End Date UTC', key: 'end_date' },
    { label: 'Total Number of Weeks', key: 'validity' },
    { label: 'Workspace Initiation Time UTC', key: 'workspace_initiation_time' },
    // { label: 'Workspace Termination Time UTC', key: 'workspace_terminate_time' },
    { label: 'User name', key: 'user_name' },
    { label: 'User Password', key: 'user_password' },
    { label: 'Download Url', key: 'download_url' },
    { label: 'Registration Code', key: 'registration_code' }
  ];

  const filename = `Workspace_Report_${new Date().toLocaleDateString()}_${new Date().toLocaleTimeString()}.csv`;

  return (
    <>
      <div className="workspace-container">
        <h3>Workspaces</h3>
        <div className="workspace-top">
          <div className="box select-box">
            <div className="head">
              <label>Select Workspaces</label>
            </div>
            <div className="select-box">
              <select value={selectedWorkspace}
                onChange={(e) => {
                  setSelectedWorkspace(e.target.value);
                  // fetchRunningWorkspaces(e.target.value);
                }}>
                {/* <option value="">Select workspace</option> */}
                {workspaces &&
                  workspaces.map((workspaces, index) => {
                    return (
                      <option key={index} value={workspaces.slug}>
                        {workspaces.title}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="select-user">
            <label style={{ width: "122px" }}> User Selection</label>
            <button className="btn" onClick={() => setViewModal((prev) => !prev)}>
              Select User
            </button>
            <label>{checkedUsersModal.length} User(s) Selected</label>
          </div>
          <div className="select-user">
            {/* set validity */}
            <label style={{ width: "122px" }}> Validity</label>
            <select
              style={{ width: "150px" }}
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
            >
              <option value="Select validity">Select validity</option>
              {/* options 1 to 11 weeks in loop */}
              {[...Array(16)].map((e, i) => {
                return (
                  <option key={i} value={i + 1}>
                    {i + 1} Week{i + 1 === 1 ? "" : "s"}
                  </option>
                );
              })}
            </select>
          </div>
          <div style={{ margin: "0px", display: "flex", justifyContent: "flex-start", }} >
            {wsploading ? (
              <button className="btn" style={{ marginLeft: "143px", borderRadius: "5px", minWidth: "152px" }} >
                <CircularProgress style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "15px", width: "15px", margin: "auto", }} color="inherit" size={15} />
              </button>
            ) : (
              <button className="btn" style={{ marginLeft: "143px", borderRadius: "5px" }} onClick={create} >
                Create Workspace
              </button>
            )}
          </div>
        </div>

        <div>
          {loading ? (
            <CircularProgress style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50px", width: "50px", margin: "auto", }} />
          ) : (
            <>
              <div style={{ margin: "0 0 10px 0", display: "flex", justifyContent: "space-between" }} >
                <button className="refresh-btn"
                  onClick={() => {
                    fetchRunningWorkspaces(selectedWorkspace);
                    UserData();
                  }}
                >
                  <Refresh className="icon-refresh" fontSize="small" />
                  <Typography className="refresh-btn-txt">
                    Refresh / Update
                  </Typography>
                </button>
                {!loading ?
                  <div style={{margin: '0px'}}>
                     <CSVLink data={filtered} headers={headers} filename={filename}>
                      <button className="btn" style={{ borderRadius: '5px' }}>
                        <FileDownloadOutlinedIcon style={{ display: 'flex', height: '15px', width: '15px', margin: 'auto' }} />
                      </button>
                    </CSVLink>
                  </div>
                  : null
                }
              </div>
              {/* Filter */}
              <div className="box select-box">
                <select className="select-box" size="small" variant="outlined" value={filter.workspace_name} onChange={(e) => {
                  setFilter({ ...filter, workspace_name: e.target.value });
                }}>
                  <option value="">Select workspace</option>
                  {workspaces &&
                    workspaces.map((workspaces, index) => {
                      return (
                        <option key={index} value={workspaces.title}>
                          {workspaces.title}
                        </option>
                      );
                    })}
                </select>
                {/* workspace status */}
                <select className="select-box" size="small" variant="outlined" value={filter.workspace_status}
                  onChange={(e) => { setFilter({ ...filter, workspace_status: e.target.value }); }}
                >
                  <option value="">Select workspace status</option>
                  {/* get the unique status from runningWsp */}
                  {[...new Set(runningWsp.map((item) => item.workspace_env_status))].map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  }
                  )}
                </select>
                {/* clear button */}
                <button className="btn" onClick={() => {
                  setFilter({ workspace_name: '', workspace_status: '' });
                }
                } style={{ borderRadius: '5px' }}>Clear</button>
              </div>
              <WorkspacesTable
                finalData={filtered}
                filter={filter}
                terminate={terminateWsp}
                loading={termLoading}
              />
            </>
          )}
          {viewModal && (
            <UserListModal
              setViewModal={setViewModal}
              setCheckedUsersModal={setCheckedUsersModal}
              usersArray={users}
              chkdUsers={checkedUsersModal}
            />
          )}
        </div>
      </div>
      <MessageAlert
        severity={alertResponse?.status}
        message={alertResponse?.msg}
        onClick={() => setAlert(false)}
        open={alert}
      />
    </>
  );
}

export default Workspaces;
