import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { BtnProps } from "../Props/BtnProps";
import BtnMain from "../BtnMain/BtnMain";
import * as xlsx from "xlsx";
import { addAUser } from "../../services/users-services/services";
import MessageAlert from "../MessageAlert/MessageAlert";
import { PulseLoader } from "../Loader/Loader";
import { useForm } from "react-hook-form";
import { getRoles } from "../../services/role-privileges/services";
import AssignRole from "../AssignRoleBlock/AssignRole";
// import AssignCourseSubcriptions from "./AssignCourseSubcriptions";
// import { LearningPageProps } from "../../components/Props/LearningPageProps";
import { useAppState } from "src/stateManagement";
import { TabPanel, a11yProps  } from "../MUIComponents/MUIComponents";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const AddUserForm = (props) => {
  const { register, handleSubmit, reset, getValues, setValue } = useForm();
  const { state: App } = useAppState();
  const classes = useStyles();
  const InputRef = useRef()
  const [value, setValues] = React.useState(0);
  const [file, setFile] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState('info');
  const [loading, setLoading] = React.useState(false);
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [roles, setROles] = React.useState("");
  const [selectedCourses, setSelectedCourses] = React.useState("");
  const [selectedBundles, setSelectedBundles] = React.useState('');
  const [selectedLearningPaths, setSelectedLearningPaths] = React.useState('');
  const [sequalizedCourses, setSequalizedCourses] = React.useState('');
  const [userRole, setUserRoles] = React.useState([1]);
  const [adBtnLoading, setAdBtnLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(2);

  useEffect(() => {
    async function fetchData() {
      const response = await getRoles(0, 100, '');
      if (response.status === 'success') {
        setROles(response?.data);
      }
    }
    fetchData();
  }, [])

  const resetUploadFile = () => {
    InputRef.current.value = null;
  }
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
          resetUploadFile();
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
      resetUploadFile();
    }
  };


  const handleClose = () => {
    setOpen(false);
  };

  const startUploading = () => {
    if(file.length == 0){
      setOpen(true);
      setMessage('Please Select Valid Excel File');
      setSeverity("error")
      setTimeout(() => {
        setOpen(false)
      }, 2000);
      return;
    }
    const user_data = JSON.parse(localStorage.getItem('user_data'));
    const data = {
      data: file,
      courses: selectedCourses,
      subscriptions: selectedBundles,
      learningPaths: selectedLearningPaths,
      company_id: user_data.data.company_id
    }
    if(file.length > 0){
      setAdBtnLoading(true);
      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
      }, 1600);
      // userBulkUpload(data).then((res) => {
      //   let rejectedUsers;
      //   if (res?.data?.status === "success") {
      //     setAdBtnLoading(false);
      //     clearInterval(timer);
      //     setMessage(res.data.message);
      //     setSeverity("success");
      //     setOpen(true);
      //     setTimeout(() => {
      //       setOpen(false);
      //       rejectedUsers = res.data.data.rejected_users;
      //       if (rejectedUsers.length > 0) {
      //         const text = JSON.stringify(rejectedUsers);
      //         const a = document.createElement("a");
      //         const file = new Blob([text], { type: "text/plain" });
      //         a.href = URL.createObjectURL(file);
      //         a.download = "rejectedUsers.txt";
      //         a.click();
      //         setAdBtnLoading(false);
      //         clearInterval(timer);
      //         resetUploadFile();
      //       }
      //       window.location.href = `/users`;
      //       setFile([]);
      //     }, 3000);
      //   } else {
      //     setMessage(res.data.message);
      //     setSeverity("error");
      //     setOpen(true);
      //     setAdBtnLoading(false);
      //     clearInterval(timer);
      //     resetUploadFile();
      //   }
      // })
    }
    setFile('');
  }

  const checkAddUser = () => {
    let limitedusers = App?.privileges.limitedusers;

    if (limitedusers == 0) {
      return true;
    }
    if (limitedusers == 1) {
      if (App?.privileges.howmanyusers > App?.privileges.totalUser * 1) {
        return true;
      } else {
        return false;
      }
    }
    if (limitedusers == 2) {
      return false;
    }
  }
  
  const handleChange = (event, newValue) => {
    setValues(newValue);
  };
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const addUser = async (privileges, e) => {
    setUserRoles(privileges.privileges)
    e.preventDefault();
    const user_data = JSON.parse(localStorage.getItem('user_data'));
    const formData = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      company_id: user_data.data.company_id,
      ...privileges
    }
    if (formData.firstname === "" || formData.lastname === "" || formData.email === "") {
      setMessage("Please fill all the fields");
      setSeverity("warning");
      setOpen(true);
      setTimeout(() => {
        setMessage("");
        setOpen(false);
      }, 3000);
    }
    else if (!privileges?.privileges?.length) {
      setMessage("Please select the desired role");
      setSeverity("warning");
      setOpen(true);
      setTimeout(() => {
        setMessage("");
        setOpen(false);
      }, 3000);
    }
    else if (!validateEmail(formData.email)) {
      setMessage("Please Enter valid Email");
      setSeverity("warning");
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
      return false;
    }
    else {
      addAUser(formData).then((res) => {
        if (res.status === "success") {
          setMessage(res.message);
          setSeverity("success");
          setOpen(true);
          setFirstname("");
          setLastname("");
          setEmail("");
          reset({ 'privileges': [] })
          setUserRoles([1])
          setTimeout(() => {
            window.location.href = `/users`;
            setOpen(false);
          }, 2000);
        }
        else {
          setMessage(res.message);
          setSeverity("error");
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
          }, 2000);
        }
      });
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
            <Tab label="Individual User" {...a11yProps(0)} />
            {/* <Tab label="Bulk Users Upload" {...a11yProps(1)} /> */}
          </Tabs>
        </AppBar>

        {/* ----- tab-1 ------ */}
        <TabPanel value={value} index={0} className="tab-content">
          {checkAddUser() ?
            <>
              <form>
                <div className="input-box-group">
                  <div className="input-box">
                    <label>
                      First Name <span>*</span>
                    </label>
                    <input type="text" placeholder="E.g. John" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                  </div>
                  <div className="input-box">
                    <label>
                      Last Name <span>*</span>
                    </label>
                    <input type="text" placeholder="E.g. Smith" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                  </div>
                  <div className="input-box">
                    <label>
                      Email Address <span>*</span>
                    </label>
                    <input type="email" placeholder="E.g. john@whizlabs.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
              </form>
              <AssignRole
                setValue={setValue}
                getValues={getValues}
                register={register}
                userRole={userRole}
                roles={roles}
              />
              <div className="btn-group">
                <button className={`btn btnMain btn-add-user`} onClick={handleSubmit(addUser)}> Add a User </button>
                <BtnMain {...BtnProps.btn_cancel_user} />
              </div>
            </>
            : App?.isLoadingPrivileges ?
              <div className="" style={{ marginTop: '10px' }}>
                <span>Loading...</span>
              </div> : <div className="add-user-prohibited-msg">
                <span>Please contact Whizlabs Customer Service at <a href="mailto:support@whizlabs.com">support@whizlabs.com</a></span>
              </div>
          }
        </TabPanel>

        {/* ----- tab-2 ----- */}
        <TabPanel value={value} index={1} className="tab-content">
          {checkAddUser() && !App?.privileges?.bulkuploaddisallow ?
            <div className="upload">
              <div className="Instructions">
                <form onSubmit={startUploading}>
                  <label htmlFor="upload">Upload File</label>
                  <input
                    ref={InputRef}
                    type="file"
                    name="upload"
                    id="upload"
                    onChange={readUploadFile}
                  />
                </form>
                {/* <p>Excel file must be in right format as shown in sample excel file. <a href="/assets/sample/sample.xlsx" download>Download sample file</a></p> */}
                {/* <AssignCourseSubcriptions
                  selectedCourses={selectedCourses}
                  setSelectedCourses={setSelectedCourses}
                  selectedBundles={selectedBundles}
                  setSelectedBundles={setSelectedBundles}
                  selectedLearningPaths={selectedLearningPaths}
                  setSelectedLearningPaths={setSelectedLearningPaths}
                  sequalizedCourses={sequalizedCourses}
                  setSequalizedCourses={setSequalizedCourses}
                  {...LearningPageProps.create_learning_page}
                  upload={startUploading}
                  loading={loading}
                  btnloading={adBtnLoading}
                  progress={progress}
                /> */}
                {loading === true ? <PulseLoader className="loader"
                  style={{ position: "absolute", top: "50%", left: "30%", marginTop: 5, marginLeft: 15 }}
                /> : null}
                <p style={{ margin: "5px 0" }}>Please download the <a href={`${process.env.REACT_APP_B2B_MEDIA_URL}bulkupload/new-sample.xlsx`} download>Sample File,</a> remove the existing records, add the new records as per the format and upload the file.</p>
                <div className="notes-container">
                  <b>Notes:</b>
                  <ul>
                    <li>&nbsp; &nbsp; Please enter values for all fields in the Excel file.</li>
                    <li>&nbsp; &nbsp; Ensure that there are no hyperlinks present in any of the cell values.</li>
                    <li>&nbsp; &nbsp; To enroll users, select <strong>Courses/Subscriptions/Learning Paths</strong> from the <strong>checkbox/dropdown</strong> below, and then click on Upload.</li>
                    <li>&nbsp; &nbsp; If you are uploading a file with more than 100 records, please note that it may take some time to process.</li>
                  </ul>
                </div>
              </div>
            </div>
            : App?.isLoadingPrivileges ?
              <div className="" style={{ marginTop: '10px' }}>
                <span>Loading...</span>
              </div> : <div className="add-user-prohibited-msg">
                <span>Please contact Whizlabs Customer Service at <a href="mailto:support@whizlabs.com">support@whizlabs.com</a></span>
              </div>
          }
        </TabPanel>
      </div >
      <MessageAlert
        severity={severity}
        open={open}
        message={message}
        onClick={handleClose}
      />
    </>
  );
}

export default AddUserForm;
