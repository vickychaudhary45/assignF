import { useState, useEffect } from 'react';
import './CustomSandbox.scss';
import UserListModal from './UserListModal';
import { useForm } from "react-hook-form";
import CustomSandboxTabs from './CustomSandboxTabs';
import MessageAlert from "../MessageAlert/MessageAlert";
import { enrollUsers, listSandboxes, listUsers } from "../../services/custom-sandbox-services/services";
import { CircularProgress } from '@material-ui/core';


const CustomSandbox = () => {
  const { register } = useForm();
  const [viewModal, setViewModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validity, setValidity] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertResponse, setAlertResponse] = useState('');
  const [category_id, setCategory_id] = useState('');
  const [sandboxes, setSandbox] = useState([]);
  const [selectedSandboxSlug, setSelectedSandboxSlug] = useState('');
  const [selectedSandboxName, setSelectedSandboxName] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsersToEnroll, setSelectedUsersToEnroll] = useState([]);
  const [userListLoading, setUserListLoading] = useState(false);
  const user_data = JSON.parse(localStorage.getItem('user_data'));
  const company_id = user_data?.data?.company_id;

  const sandbox_category = [
    { id: 1, name: "AWS" },
    { id: 2, name: "Azure" },
    { id: 3, name: "Google Cloud" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await listSandboxes(company_id, category_id);
      if (res?.status === "success") {
        setSandbox(res?.data);
      }
    }
    fetchData();
  }, [category_id]);

  useEffect(() => {
    const fetchData = async () => {
      setUserListLoading(true);
      const res = await listUsers(company_id, selectedSandboxSlug, "");
      if (res?.status === "success") {
        setUsers(res?.data);
        setUserListLoading(false);
      }
    }
    if (selectedSandboxSlug) {
      fetchData();
    }
  }, [selectedSandboxSlug])

  useEffect(() => {
    const foundSandbox = sandboxes?.find(sandbox => sandbox.sandbox_slug === selectedSandboxSlug);
    setSelectedSandboxName(foundSandbox?.sandbox_name);
  }, [sandboxes, selectedSandboxSlug]);

  const handleUserSelect = () => {
    if (selectedSandboxSlug) {
      setViewModal((prev) => !prev)
    } else {
      setAlertResponse({ status: 'error', msg: 'Kindly Select a sandbox to proceed!' });
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000)
    }
  };

  const handleUserEnrollment = () => {
    const data = {
      user_emails: selectedUsersToEnroll,
      company_id: company_id,
      sandbox_name: selectedSandboxName,
      enrollment_period: validity,
      sandbox_slug: selectedSandboxSlug
    };
    if (!selectedUsersToEnroll?.length > 0 || !selectedSandboxSlug || !validity) {
      setAlertResponse({ status: 'error', msg: 'Kindly fill all the required fields!' });
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000)
    } else {
      setLoading(true);
      enrollUsers(data).then((res) => {
        if (res?.status === "success") {
          setAlertResponse({ status: res?.status, msg: res?.message });
          setLoading(false);
          setAlert(true);
          setTimeout(() => {
            setSelectedUsersToEnroll([]);
            setValidity('');
            setSelectedSandboxName('');
            setSelectedSandboxSlug('');
            setAlert(false);
          }, 2000)
        }
      });

    }
  };

  return (
    <>
      <div className="custom-sandbox-container">
        <h3>Custom Sandboxes</h3>
        <div className="custom-sandbox-top">
          <div className="box select-box">
            <div className="head">
              <label>Select Category</label>
            </div>
            <div className="select-box cate-select">
              <select
                {...register("category_name")}
                onChange={(e) => setCategory_id(e.target.value)}
              >
                <option value={""}>ALL</option>
                {sandbox_category && sandbox_category.map((row, index) => {
                  return (
                    <option
                      key={index}
                      value={row.id}
                    >
                      {row.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="box select-box">
            <div className="head">
              <label>Select Sandbox</label>
            </div>
            <div className="select-box">
              <select value={selectedSandboxSlug}
                onChange={(e) => { setSelectedSandboxSlug(e.target.value) }}>
                <option value={""}>Select Sandbox</option>
                {sandboxes && sandboxes.map((sandbox, index) => {
                  return (
                    <option key={index} value={sandbox?.sandbox_slug}>
                      {sandbox?.sandbox_name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="select-user">
            <label className='width-122'>Enrollment Period</label>
            <select
              className='validity-dropdown'
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
            >
              <option value="Select validity">Select validity</option>
              {[...Array(16)].map((e, i) => {
                return (
                  <option key={i} value={i + 1}>
                    {i + 1} Week{i + 1 === 1 ? "" : "s"}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="select-user">
            <label className='width-122'> Select Users</label>
            <button className="btn btn-select-user" onClick={handleUserSelect}>Select User</button>
            <label>{selectedUsersToEnroll.length} User(s) Selected</label>
          </div>
          <div className='btn-div'>
            {loading ? (
              <button className="btn loading-btn" >
                <CircularProgress className='circular-progress' color="inherit" size={15} />
              </button>
            ) : (
              <button className="btn btn-enroll-users" onClick={handleUserEnrollment}>Enroll Users</button>
            )}
          </div>
        </div>

        <div>
          <CustomSandboxTabs />
          {viewModal && (
            <UserListModal
              setViewModal={setViewModal}
              setSelectedUsersToEnroll={setSelectedUsersToEnroll}
              usersArray={users}
              chkdUsers={selectedUsersToEnroll}
              UserListLoading={userListLoading}
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

export default CustomSandbox;
