import { useState, useEffect } from 'react';
import './VirtualMachines.scss';
import VirtualMachinesTable from './VirtualMachinesTable';
import UserListTable from './UserListTable';
import { login } from "src/services/Lab-services/services";
import { getWorkSpaces, getUsers, createWorkspace, TerminateWorkspace } from "src/services/workspaces/services";
import { runningVMs, terminateVM, getVMUsers, VMenrollments } from "src/services/virtualmachines/services";
import { Refresh } from '@mui/icons-material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Box, CircularProgress, Tab, Typography } from '@mui/material';
import Swal from "sweetalert2";
import MessageAlert from "../MessageAlert/MessageAlert";
import moment from 'moment';
import { CSVLink } from "react-csv";
import { TabContext, TabList, TabPanel } from '@material-ui/lab';


const user_data = JSON.parse(localStorage.getItem('user_data'));

const Workspaces = () => {
  const [viewModal, setViewModal] = useState(false);
  const [checkedUsersModal, setCheckedUsersModal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [termLoading, setTermLoading] = useState(false);
  const [workspaces, setWorkspaces] = useState("");
  const [users, setUsers] = useState([]);
  const [labToken, setLabToken] = useState("");
  const [runningWsp, setRunningWsp] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertResponse, setAlertResponse] = useState('');
  const [filter, setFilter] = useState({ email: "", email2: "" });
  const [enrollments, setEnrollments] = useState([])
  const [filteredLive, setFilteredLive] = useState([]);
  const [filteredEnrollments, setFilteredEnrollments] = useState([]);
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const company_id = user_data.data.company_id;

  async function WorkspaceData() {
    setLoading(true);
    getEnrollments();
    login().then((res) => {
      if (res.status) {
        const data = {
          token: res.data.auth_token,
        }
        setLabToken(res.data.auth_token);
        var lab_token = res.data.auth_token;
        runningVMs({token:lab_token, task_slug: "quickstart-sandbox"}).then((res) => {
          if (res.data.status) {
            setLoading(false);
            setRunningWsp(res.data?.data?.list);
          }
          else {
            setLoading(false);
            setRunningWsp(res.data.data);
            setFilteredLive(res.data.data);
            // console.log("something went wrong");
          }
        })
      }
      else {
        // console.log("something went wrong");
      }
    }
    );
  }
  async function fetchRunningWorkspaces() {
    setLoading(true);
    const data = {
      token: labToken,
      task_slug: "quickstart-sandbox"
    }
    runningVMs(data).then((res) => {
      if (res.data.status) {
        setLoading(false);
        setRunningWsp(res.data?.data?.list);
      }
      else {
        setLoading(false);
        setRunningWsp(res.data);
        // console.log("something went wrong");
      }
    })
  }

  async function UserData() {
    const searched = "";
    setLoading(true);
    getVMUsers(searched, company_id).then(res => {
      if (res.status) {
        setLoading(false);
        setUsers(res.data);
      }
      else {
        // console.log("something went wrong");
      }
    });
  }

  function terminateWsp(d) {
    const data2 = {
      token: labToken,
      role_id: d.role_id,
      user_email: d.user_email,
    }
    Swal.fire({
      title: "Are you sure?",
      text: "Terminate the Virtual Machine!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, terminate!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then(function (result) {
      if (result.value) {
        setTermLoading(true);
        terminateVM(data2).then((res) => {
          if (res.data.status) {
            setTermLoading(false);
              Swal.fire(
                "Terminated!",
                "Virtual Machine terminated successfully.",
                "success"
              )
              fetchRunningWorkspaces();
              UserData();
          } else {
            setTermLoading(false);
            Swal.fire(
              "Cancelled!",
              "Virtual Machine not terminated.",
              "error"
            )
          }
        }
        )
      } else if (result.dismiss === "cancel") {
        Swal.fire(
          "Cancelled",
          "Virtual Machine not terminated.",
          "error"
        )
      }
    }
    );
  }

  const getEnrollments = async() => {
    setLoading(true);
    await VMenrollments({company_id: company_id}).then((res) => {
      if (res.status) {
        setLoading(false);
        let data = res?.data?.data?.map((item) => {
          return {
            ...item,
            task_name: item.vm_slug,
            start_time: moment(item.start_date).format("DD-MMM-YYYY"),
            end_time: moment(item.end_date).format("DD-MMM-YYYY"),
          }
        })
        setEnrollments(data);
        setFilteredEnrollments(data);
      }
      else {
        setLoading(false)
        return
        // console.log("something went wrong");
      }
    })
  }

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  }

  useEffect(() => {
    if (!workspaces) {
      WorkspaceData();
    }
  }, [workspaces]);
  useEffect(() => {
    if (filter.email2 !== "") {
      const filtered = enrollments.filter(
        (user) =>
          user.user_email.toLowerCase().includes(filter.email2.toLowerCase())
      )
      setFilteredEnrollments(filtered);
    } else {
      setFilteredEnrollments(enrollments);
    }
    if (filter.email !== "") {
      const filtered = runningWsp.filter(
        (user) =>
          user.user_email.toLowerCase().includes(filter.email.toLowerCase())
      )
      setFilteredLive(filtered);
    } else {
      setFilteredLive(runningWsp);
    }
  }, [filter, runningWsp, enrollments])

  // const headers = [
  //   { label: 'User_email', key: 'user_email_id' },
  //   { label: 'VM Name', key: 'workspace_name' },
  //   { label: 'Start Date UTC', key: 'start_date' },
  //   { label: 'End Date UTC', key: 'end_date' },
  //   { label: 'User name', key: 'user_name' },
  //   { label: 'User Password', key: 'user_password' },
  //   { label: 'Download Url', key: 'download_url' },
  // ];

  const filename = `vm_Report_${new Date().toLocaleDateString()}_${new Date().toLocaleTimeString()}.csv`;

  return (
    <>
      <div className="workspace-container">
        <h3>Virtual Machines</h3>
        <div>
          {loading ? (
            <CircularProgress className='loader' />
          ) : (!viewModal && 
            <>
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <div style={{ margin: "0 0 10px 0", display: "flex", justifyContent: "flex-end" }} >
                  <button className="refresh-btn" onClick={() => { UserData(); setViewModal(true) }} >
                    <Typography className="refresh-btn-txt">
                      Enroll Users
                    </Typography>
                  </button>
                  {/* {!loading ?
                    <div style={{margin: '0px'}}>
                      <CSVLink data={filtered} headers={headers} filename={filename}>
                        <button className="btn" style={{ borderRadius: '5px' }}>
                          <FileDownloadOutlinedIcon style={{ display: 'flex', height: '15px', width: '15px', margin: 'auto' }} />
                        </button>
                      </CSVLink>
                    </div>
                    : null
                  } */}
                </div>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                      <Tab label="Live" value="1" />
                      <Tab label="Enrolled" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                 
                      <div className="box">
                        <input type='text'
                          name="email"
                          className='search-input'  
                          placeholder='Search Users'
                          value={filter.email}
                          onChange={(e) => handleFilter(e)} />
                        <button className="btn" onClick={() => {
                          setFilter({...filter, email: ""})
                        }
                        } style={{ borderRadius: '5px' }}>Clear</button>
                      </div>
                      <VirtualMachinesTable
                        finalData={filteredLive}
                        filter={filter}
                        terminate={terminateWsp}
                        loading={termLoading}
                        type={1}
                      />
                  </TabPanel>
                  <TabPanel value="2">
                  <>
                    <div className="box">
                      <input type='text'
                        className='search-input'  
                        placeholder='Search Users'
                        name="email2"
                        value={filter.email2}
                        onChange={(e) => handleFilter(e)}/>
                      <button className="btn" onClick={() => {
                        setFilter({ ...filter, email2: ""})
                      }
                      } style={{ borderRadius: '5px' }}>Clear</button>
                      </div>
                      <VirtualMachinesTable
                        finalData={filteredEnrollments}
                        terminate={terminateWsp}
                        loading={termLoading}
                        type={2}
                      />
                    </>
                  </TabPanel>
                </TabContext>
              </Box>
            </>
            )
          }
           {!loading && viewModal && (
              <UserListTable
                setViewModal={setViewModal}
                setCheckedUsersModal={setCheckedUsersModal}
                usersArray={users}
                chkdUsers={checkedUsersModal}
                setAlertResponse={setAlertResponse}
                setAlert={setAlert}
                refreshUsers={UserData}
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
