import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { BtnProps } from "../Props/BtnProps";
import BtnMain from "../BtnMain/BtnMain";
import MessageAlert from "../MessageAlert/MessageAlert";
import { PulseLoader } from "../Loader/Loader";
import { updateUserRecord } from "src/services/users-services/services";
import { useParams } from "react-router-dom";
import { getRoles } from "../../services/role-privileges/services";
import AssignRole from "../AssignRoleBlock/AssignRole";
import { useForm } from "react-hook-form";
import { TabPanel, a11yProps } from "../MUIComponents/MUIComponents";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const EditUserForm = (props) => {
  const classes = useStyles();
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [value, setValues] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState('info');
  const [btnloading, setBtnLoading] = React.useState(false);
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [roles, setROles] = React.useState("");
  const [userRole, setUserRoles] = React.useState([1]);

  useEffect(() => {
    async function fetchData() {
      const response = await getRoles(0, 100, '');
      if (response.status === 'success') {
        setROles(response?.data);
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    setFirstname(props.userInfo.firstname);
    setLastname(props.userInfo.lastname);
    setEmail(props.userInfo.email);
    setUserRoles(props.userInfo.role)
  }, []);
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValues(newValue);
  };
  const { id } = useParams()
  const handleUpdate = (privileges, e) => {
    e.preventDefault();
    setBtnLoading(true);
    const data = {
      user_id: id,
      firstname: firstname,
      lastname: lastname,
      ...privileges
    };
    setUserRoles(privileges.privileges)
    if (firstname !== "" && lastname !== "") {
      updateUserRecord(data).then((res) => {
        setBtnLoading(false);
        setMessage("User record updated successfully");
        setSeverity("success");
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          window.location.href = `/users`;
        }, 3000);
      }
      );
      setBtnLoading(false);
    } else if (privileges.privileges?.length == 0) {
      setMessage("Please select the desired role");
      setSeverity("error");
      setOpen(true);
      setBtnLoading(false);
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    }
    else {
      setMessage("Please fill in all fields");
      setSeverity("error");
      setOpen(true);
      setBtnLoading(false);
    }
  }
  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="User Details" {...a11yProps(0)} />
          </Tabs>
        </AppBar>

        {/* ----- tab-1 ------ */}
        <TabPanel value={value} index={0} className="tab-content">
          <form onSubmit={handleSubmit(handleUpdate)}>
            <div className="input-box-group">
              <div className="input-box">
                <label>
                  First Name <span>*</span>
                </label>
                <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
              </div>
              <div className="input-box">
                <label>
                  Last Name <span>*</span>
                </label>
                <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
              </div>
              <div className="input-box">
                <label>
                  Email Address <span>*</span>
                </label>
                <input type="email" placeholder={email} disabled />
              </div>
            </div>
            <AssignRole setValue={setValue} getValues={getValues} register={register} roles={roles} userRole={userRole} />
            <div className="btn-group">
              {!btnloading ? (
                <button className="btn" style={{ borderRadius: "3px", }} type="submit" >Save</button>
              ) : (
                <PulseLoader height={15} width={20} />
              )}
              &nbsp; <BtnMain {...BtnProps.btn_cancel_user} />
            </div>
          </form>
        </TabPanel>
      </div>
      <MessageAlert
        open={open}
        severity={severity}
        onClick={handleClose}
        message={message}
      />
    </>
  );
}

export default EditUserForm;
