import React, { useEffect, useState } from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AppBar from "@material-ui/core/AppBar";
import MessageAlert from "../MessageAlert/MessageAlert";

import { useForm } from "react-hook-form";
import { PulseLoader } from "../Loader/Loader";
import { CheckPrivileges } from "src/config/utils";
import { Autocomplete, TextField } from "@mui/material";
import { getUsers, addAForm } from "src/services/users-services/services";
import { getRoles } from "../../services/role-privileges/services";
import { TabPanel, a11yProps } from "../MUIComponents/MUIComponents";

const CommonAddUserForm = (props) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [endDate] = useState("");
  const [startDate] = useState("");
  const [page] = React.useState(0);
  const [sortDate] = useState("desc");
  const [per_page] = React.useState(10);
  const [users, setUsers] = useState([]);
  const [email, setEmail] = React.useState("");
  const [roles, setROles] = React.useState("");
  const [value, setValues] = React.useState(0);
  const [searched, setSearched] = useState("");
  const [open, setOpen] = React.useState(false);
  const [sortingColumn] = useState("created_at");
  const [alertbox, setAlertbox] = useState(false);
  const [message, setMessage] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [userRole, setUserRoles] = React.useState([1]);
  const [firstname, setFirstname] = React.useState("");
  const [severity, setSeverity] = React.useState("info");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { privileges, isLoadingPrivileges } = CheckPrivileges();
  const user_data = JSON.parse(localStorage.getItem("user_data"));

  const handleClose = () => {
    setOpen(false);
  };

  const addUser = async (privileges, e) => {
    setUserRoles(privileges.privileges);
    e.preventDefault();
    const formData = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      company_id: user_data.data.company_id,
      selectedUserId: selectedUserId,
    };
    console.log(formData, "formData");

    if (
      formData.firstname === "" ||
      formData.lastname === "" ||
      formData.email === ""
    ) {
      setMessage("Please fill all the fields");
      setSeverity("warning");
      setOpen(true);
      setTimeout(() => {
        setMessage("");
        setOpen(false);
      }, 3000);
    } else {
      addAForm(formData).then((res) => {
        if (res.status === "success") {
          setMessage(res.message);
          setSeverity("success");
          setOpen(true);
          setTimeout(() => {
            window.location.href = `/enroll-users`;
            setOpen(false);
            setFirstname("");
            setLastname("");
            setEmail("");
          }, 2000);
        } else {
          setMessage(res.message);
          setSeverity("error");
          setOpen(true);
          setTimeout(() => {
            window.location.href = `/enroll-users`;
            setOpen(false);
          }, 2000);
        }
      });
    }
  };

  const bodyData = {
    page: page,
    per_page: per_page,
    search: searched,
    company_id: user_data?.data?.company_id,
    sortDate: sortDate,
    sortingColumn: sortingColumn,
    startDate: startDate,
    endDate: endDate,
  };

  async function fetchData() {
    setLoading(true);
    getUsers(bodyData).then((response) => {
      setUsers(response);
      setLoading(false);
    });
  }

  useEffect(() => {
    async function fetchRoleData() {
      const response = await getRoles(0, 100, "");
      if (response.status === "success") {
        setROles(response?.data);
      }
    }
    fetchRoleData();
    fetchData();
  }, []);

  return (
    <>
      <div className={"tab-parent"}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Add Form" {...a11yProps(0)} />
          </Tabs>
        </AppBar>

        {/* ----- tab-1 ------ */}
        <TabPanel value={value} index={0} className="tab-content">
          <>
            <form>
              <div className="input-box-group">
                <div className="input-box">
                  <label>
                    Feedback Form for User<span>*</span>
                  </label>
                  <Autocomplete
                    options={users}
                    getOptionLabel={(option) => option.email}
                    onChange={(event, newValue) => {
                      setSelectedUserId(newValue ? newValue.id : null);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                          ...params.InputProps,
                          style: { border: "none", padding: "0", margin: "0" },
                        }}
                      />
                    )}
                    renderOption={(props, option) => (
                      <li {...props}>{option.email}</li>
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    value={
                      users.find((user) => user.id === selectedUserId) || null
                    }
                  />
                </div>
                <div className="input-box">
                  <label>
                    Question 1 <span>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="E.g. Question 1"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <label>
                    Question 2 <span>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="E.g. Question 2"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <label>
                    Question 3 <span>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="E.g. Question 3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </form>
            <div
              className="btn-group"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <button
                style={{ borderRadius: "5px" }}
                className={`btn btnMain btn-add-user`}
                onClick={handleSubmit(addUser)}
              >
                Add Form
              </button>
              <button
                style={{ borderRadius: "5px" }}
                className="btn btnMain btn-cancel"
                onClick={() => props.setShowModal((prev) => false)}
              >
                Cancel
              </button>
            </div>
          </>
          {isLoadingPrivileges ? (
            <div className="" style={{ marginTop: "10px" }}>
              <div className="loader">
                <PulseLoader />
              </div>
            </div>
          ) : (
            <div className="add-user-prohibited-msg">
              <span></span>
            </div>
          )}
        </TabPanel>
      </div>
      <MessageAlert
        severity={severity}
        open={open}
        message={message}
        onClick={handleClose}
      />
    </>
  );
};

export default CommonAddUserForm;
