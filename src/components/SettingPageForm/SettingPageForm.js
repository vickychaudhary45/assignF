import { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, TextField } from "@material-ui/core";
import CircularProgress from '@mui/material/CircularProgress';
import moment from "moment";
import MessageAlert from "../../components/MessageAlert/MessageAlert";
import { PulseLoader } from "../Loader/Loader";
import { parseJwt } from "src/config/utils";
import { getCountries, getStates, getCities, changePassword, userProfile, updateUserProfile, updateCompanyInfo } from "src/services/Settings-services/settings";
import { uploadImgToS3 } from "src/services/query-services/services";
import { images } from "src/config/images";
import UploadImage from "src/shared/UploadImage";
import { PermissionContexts } from '../../PermissionContexts';
import EmailBox from "../EmailBox/EmailBox";
import { TabPanel, a11yProps } from "../MUIComponents/MUIComponents";


const useDatePiker = makeStyles(() => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const SettingPageForm = () => {
  const classdate = useDatePiker();
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [countries, setCountries] = useState([]);
  const [buttonUpdate, setButtonUpdate] = useState(false);
  const [buttonUpdatePassword, setButtonUpdatePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedCheckbox, setSelectedCheckbox] = useState(false);
  const [states, setStates] = useState([] || "");
  const [cities, setCities] = useState([] || "");
  const { privileges } = useContext(PermissionContexts);

  // [tab1] Data
  const [userprofilepicture, setUserprofilepicture] = useState(null);
  const [userfirstname, setUserfirstname] = useState("");
  const [userlastname, setUserlastname] = useState("");
  const [userphone, setUserphone] = useState("");
  const [userdob, setUserdob] = useState("");
  const [email, setEmail] = useState("")
  const [usergender, setUsergender] = useState("");
  const [useraddress, setUseraddress] = useState("");
  const [useraddress2, setUseraddress2] = useState("");
  const [usercity, setUsercity] = useState("");
  const [userstate, setUserstate] = useState("");
  const [usercountry, setUsercountry] = useState("");
  const [userzipcode, setUserzipcode] = useState("");
  const [caller, setCaller] = useState(null);

  // [tab-2] Data
  const [usercompanylogo, setUsercompanylogo] = useState("");
  const [usercompanyname, setUsercompanyname] = useState("");
  const [usercompanyaddress, setUsercompanyaddress] = useState("");
  const [usercompanycity, setUsercompanycity] = useState("");
  const [usercompanystate, setUsercompanystate] = useState("");
  const [usercompanycountry, setUsercompanycountry] = useState("");
  const [usercompanypincode, setUsercompanypincode] = useState("");
  const [usercompanyphone, setUsercompanyphone] = useState("");
  const [usercompanytaxid, setUsercompanytaxid] = useState("");
  const [cobrandingtext, setCobrandingText] = useState("");
  const [usercompanywebsite, setUsercompanywebsite] = useState("");
  const [usercompanyemail, setUsercompanyemail] = useState("");
  const [userData, setuserData] = useState({});
  const [companystates, setCompanystates] = useState([]);
  const [companycities, setCompanycities] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertResponse, setAlertResponse] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [uploadProcess, setUploadProcess] = useState(false);
  const [uploadLogoProcess, setUploadLogoProcess] = useState(false);
  const [uploadlogoModal, setUploadlogoModal] = useState(false);
  const [buttonUpdateCompany, setButtonUpdateCompany] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCountries();
      setCountries(res?.data);
    }
    fetchData();
  }, []);

  const handleChangechk = (event) => {     // gender Radio button
    setSelectedCheckbox(event.target.value)
  };

  const handleChange = (event, newValue) => { // tab change handler
    setValue(newValue);
  };

  const handleSubmit = async (e) => { // password change handler
    setButtonUpdatePassword(true);
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setAlert(true);
      setAlertResponse({
        status: 'error',
        message: 'Password does not match',
      });
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      setButtonUpdatePassword(false);
    } else if (newPassword.length < 6) {
      setAlert(true);
      setAlertResponse({
        status: 'error',
        message: 'Password length should be at least 6',
      });
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      setButtonUpdatePassword(false);
    } else {
      setButtonUpdatePassword(true);
      const data = {
        user_id: userData.userId,
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword
      }
      const res = await changePassword(data);
      setAlert(true);
      setAlertResponse({
        status: res?.status === true ? "success" : "error",
        message: res?.message
      });
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setButtonUpdatePassword(false);
    }
  };

  const changeCountry = async (e) => {
    setStates([]);
    setCities([]);
    setCompanystates([]);
    setCompanycities([]);
    const countryId = e.target.value;
    if (countryId) {
      const stateResp = await getStates(countryId);
      setUsercountry(countryId)
      setUsercompanycountry(countryId)
      setStates(stateResp?.data)
      setCompanystates(stateResp?.data)
    }
  };

  const changeState = async (e) => {
    setCities([]);
    const stateId = e.target.value;
    if (stateId) {
      const cityResp = await getCities(stateId);
      setUserstate(stateId);
      setUsercompanystate(stateId);
      setCities(cityResp.data);
      setCompanycities(cityResp.data);
    }
  };

  const changeCity = async (e) => {
    const cityId = e.target.value;
    if (cityId) {
      setUsercity(cityId);
      setUsercompanycity(cityId);
    }
  };
  const changeDOB = (event) => {
    setUserdob(event.target.value);
  };


  const changeGender = (event) => {
    setUsergender(event.target.value);
  };

  useEffect(() => {
    const user_data = JSON.parse(localStorage.getItem('user_data'));
    const userInfo = parseJwt(user_data?.data.token);
    setuserData(userInfo);
    let user_id = userInfo.userId;
    setLoading(true);
    const fetchData = async () => {
      const res = await userProfile(user_id);
      if (res.status === true) {
        if (!res?.data?.profile_picture) {
          setUserprofilepicture(images.user_img);
        }
        else {
          setUserprofilepicture(res?.data?.profile_picture)
        }
        setUserfirstname(res?.data?.firstname);
        setUserlastname(res?.data?.lastname);
        setUserphone(res?.data?.phone);
        setUserdob(moment(res?.data?.dob).format('YYYY-MM-DD'));
        setEmail(res.data?.email);
        setUsergender(res?.data?.gender);
        setUseraddress(res?.data?.address_line_1);
        setUseraddress2(res?.data?.address_line_2);
        setUsercountry(res?.data?.country_id);
        if (res?.data?.country_id) {
          const response = await getStates(res?.data?.country_id);
          setStates(response?.data);
        }
        setUserstate(res?.data?.state_id);
        if (res?.data?.state_id) {
          const response = await getCities(res?.data?.state_id);
          setCities(response?.data);
        }
        setUsercity(res?.data?.city_id);
        setUserzipcode(res?.data?.pincode);
        if ((res?.data?.company_logo) || (res?.data?.company_logo !== "null")) {
          setUsercompanylogo(res?.data?.company_logo)
        }
        setUsercompanyname(res?.data?.company_name);
        setUsercompanyaddress(res?.data?.company_address);
        setUsercompanycountry(res?.data?.company_country);
        if (res?.data?.company_country) {
          const response = await getStates(res?.data?.company_country);
          setCompanystates(response?.data);
        }
        setUsercompanystate(res?.data?.company_state);
        if (res?.data?.company_state) {
          const response = await getCities(res?.data?.company_state);
          setCompanycities(response?.data);
        }
        setUsercompanycity(res?.data?.company_city);
        setUsercompanypincode(res?.data?.company_pincode);
        setUsercompanyphone(res?.data?.company_phone);
        setUsercompanytaxid(res?.data?.company_tax_id);
        setCobrandingText(res?.data?.cobranding_text);
        setUsercompanywebsite(res?.data?.company_website);
        setUsercompanyemail(res?.data?.company_email);
        if (res.data.gender === "M") {
          setSelectedCheckbox("M");
        }
        else if (res.data.gender === "F") {
          setSelectedCheckbox("F");
        }
        else if (res.data.gender === "O") {
          setSelectedCheckbox("O");
        }
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const companyinfoupdate = async (e) => {
    e.preventDefault();
    setButtonUpdateCompany(true);
    const UpdatedInfo = {
      company_logo: usercompanylogo,
      company_name: usercompanyname,
      email: usercompanyemail,
      website: usercompanywebsite,
      company_address: usercompanyaddress,
      company_city: usercompanycity,
      company_state: usercompanystate,
      company_country: usercompanycountry,
      company_pincode: usercompanypincode,
      company_phone: usercompanyphone,
      company_tax_id: usercompanytaxid,
      cobranding_text: cobrandingtext,
    }
    // calculate length of UpdatedInfo.company_phone
    if (!UpdatedInfo.usercompanyphone > 10 && !UpdatedInfo.usercompanyphone < 20) {
      setAlert(true);
      setAlertResponse({
        status: "error",
        message: "Please enter valid phone number",
      });
      setButtonUpdateCompany(false);
    }
    else {
      const res = await updateCompanyInfo(userData.userId, UpdatedInfo);
      setAlert(true)
      setAlertResponse(res);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      setButtonUpdateCompany(false);
    }
  }
  const onSubmit = async (e) => {
    setButtonUpdate(true);
    e.preventDefault();
    const formData = {
      profile_picture: userprofilepicture,
      firstname: userfirstname,
      lastname: userlastname,
      phone: userphone,
      dob: userdob,
      gender: usergender,
      address_1: useraddress,
      address_2: useraddress2,
      country: usercountry,
      state: userstate,
      city: usercity,
      pincode: userzipcode,
    }
    if (!formData.firstname || !formData.lastname) {
      setAlert(true);
      setAlertResponse({
        status: 'warning',
        message: 'Please enter firstname and lastname',
      })
    }
    else {
      if (parseInt(!formData.phone).length > 10 && parseInt(!formData.phone).length < 20) {
        setAlert(true);
        setAlertResponse({
          status: 'warning',
          message: 'Please enter valid phone number',
        })
      }
      else {
        const res = await updateUserProfile(userData.userId, formData);
        setAlert(true)
        setAlertResponse({
          status: 'success',
          message: res.message,
        });
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      }
    }
    setButtonUpdate(false);
  }
  const onImageChange = async (imageUrl, file_name) => {
    if (imageUrl) {
      setUploadProcess(true);
      const formData = new FormData();
      formData.append('file', imageUrl);
      formData.append('directory_name', 'user-profile-uploads');
      formData.append('file_name', file_name);
      formData.append('user_id',userData?.userId);
      formData.append('company_id',userData?.company_id);
      let uploadResponse = await uploadImgToS3(formData);
      if (uploadResponse && uploadResponse.data) {
        setUserprofilepicture(uploadResponse.data);
        setUploadProcess(false);
        setUploadModal(false);
        setAlert(true);
        setAlertResponse({
          status: uploadResponse?.status === true ? "success" : "error",
          message: uploadResponse?.msg,
        });
        setTimeout(() => {
          setAlert(false);
        }, 3000)
      }
    }
  };

  const removeprofilePic = () => {
    setUserprofilepicture(null)
  }

  const onLogoChange = async (imageUrl, file_name) => {
    if (imageUrl) {
      setUploadLogoProcess(true);
      const formData = new FormData();
      formData.append('file', imageUrl);
      formData.append('directory_name', 'company-logos');
      formData.append('file_name', file_name);
      formData.append('user_id',userData?.userId);
      formData.append('company_id',userData?.company_id);
      let uploadResponse = await uploadImgToS3(formData);
      if (uploadResponse && uploadResponse.data) {
        setUsercompanylogo(uploadResponse.data);
        setUploadLogoProcess(false);
        setUploadlogoModal(false);
        setAlert(true);
        setAlertResponse({
          status: uploadResponse?.status === true ? "success" : "error",
          message: uploadResponse?.msg,
        });
        setTimeout(() => {
          setAlert(false);
        }, 3000)
      }
    }
  };

  const removeLogo = () => {
    setUsercompanylogo(null);
  }
  const openUploadImageModal = (e) => {
    e.preventDefault();
    setUploadModal(true);
  };
  const openUploadLogoModal = (e) => {
    e.preventDefault();
    setUploadlogoModal(true);
    setCaller("called");
  };
  return (
    <>
      <UploadImage
        uploadProcess={uploadProcess}
        onImageChange={onImageChange}
        openStatus={uploadModal}
        setUploadModal={setUploadModal}
      />
      <UploadImage
        cl={caller}
        uploadProcess={uploadLogoProcess}
        onImageChange={onLogoChange}
        openStatus={uploadlogoModal}
        setUploadModal={setUploadlogoModal}
      />
      <div className={classes.root}>
        {loading ? (
          <div className="loader-div">
            <PulseLoader />
          </div>
        ) : (
          <>
            <AppBar position="static" color="default">
              <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" selectionFollowsFocus={true} variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example" >
                <Tab label="My Profile" {...a11yProps(0)} />
                {privileges?.is_owner && <Tab label="Company Info" {...a11yProps(1)} />}
                <Tab label="Change Password" {...a11yProps(privileges?.is_owner ? 2 : 1)} />
                {privileges?.is_owner && <Tab label="Email Notification" {...a11yProps(3)} />}
              </Tabs>
            </AppBar>

            {/* ----- tab-1 ------ */}
            <TabPanel value={value} index={0} className="tab-content">
              <form className="form-default" onSubmit={onSubmit}>
                <div className="profile-block">
                  <div className="img-upload">
                    <figure>
                      <img className="img-full" src={userprofilepicture ? `${process.env.REACT_APP_B2B_MEDIA_URL}user-profile-uploads/${userprofilepicture}` : images.user_img} alt="user" />
                    </figure>
                  </div>
                  <div className="btn-group">
                    <input
                      className="btn-input btn-upload"
                      value={userprofilepicture ? "Edit" : "Upload"}
                      type="button"
                      onClick={(e) => openUploadImageModal(e)}
                    />
                    <input
                      className="btn-input btn-rem"
                      type="button"
                      value="Remove"
                      onClick={removeprofilePic}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <div className="input-box">
                    <label>First Name <span>*</span></label>
                    <input type="text" placeholder="E.g. John" required defaultValue={userfirstname} onChange={(e) => setUserfirstname(e.target.value)} />
                  </div>
                  <div className="input-box">
                    <label>Last Name <span>*</span></label>
                    <input type="text" placeholder="E.g. Dio" required defaultValue={userlastname} onChange={(e) => setUserlastname(e.target.value)} />
                  </div>
                  <div className="input-box">
                    <label>Phone</label>
                    <input type="tel" placeholder="+91 800 100 9009"
                      pattern="[0-9]{10,20}"
                      defaultValue={userphone}
                      onChange={(e) => setUserphone(parseInt(e.target.value))} />
                  </div>
                  <div className="input-box">
                    <label>Email</label>
                    <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" placeholder={email} disabled />
                  </div>
                  <div className="pickers-group input-box">
                    <div className="pickers" noValidate>
                      <TextField
                        id="date"
                        label="Date of Birth"
                        type="date"
                        defaultValue={userdob}
                        className={classdate.textField}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ min: "1970-01-01", max: moment().format('YYYY-MM-DD') }}
                        onChange={(e) => changeDOB(e)}
                      />
                    </div>
                  </div>
                  {/* redio-block */}
                  <div className="redio-block">
                    <span>Gender</span>
                    <div className="group" onChange={handleChangechk}>
                      <div className="box">
                        <input type="radio" name="gender" checked={selectedCheckbox === "M"} value="M" onChange={(e) => changeGender(e)} />
                        <label>Male</label>
                      </div>
                      <div className="box">
                        <input type="radio" name="gender" checked={selectedCheckbox === "F"} value="F" onChange={(e) => changeGender(e)} />
                        <label>Female</label>
                      </div>
                      <div className="box">
                        <input type="radio" name="gender" checked={selectedCheckbox === "O"} value="O" onChange={(e) => changeGender(e)} />
                        <label>Other</label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* address-block */}
                <div className="address-block">
                  <label>Address</label>
                  <div className="input-group">
                    <div className="input-box">
                      <input type="text" placeholder="Address line one" defaultValue={useraddress} onChange={(e) => setUseraddress(e.target.value)} />
                    </div>
                    <div className="input-box">
                      <input type="text" placeholder="Address line Two" defaultValue={useraddress2} onChange={(e) => setUseraddress2(e.target.value)} />
                    </div>
                  </div>
                </div>
                {/* select-block */}
                <div className="select-block">
                  <div className="input-box">
                    <label>Country</label>
                    <div className="input-style">
                      <i className="icon icon-dropdown"></i>
                      <select name="country" onChange={(e) => changeCountry(e)}>
                        <option value="">Select Country</option>
                        {countries && countries?.map((item, i) => (
                          <option key={i} selected={usercountry === item.id ? true : false} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="input-box">
                    <label>State</label>
                    <div className="input-style">
                      <i className="icon icon-dropdown"></i>
                      <select name="state" onChange={(e) => changeState(e)}>
                        <option value="">Select State</option>
                        {states && states?.map((item, i) => (
                          <option key={i} value={item.id} selected={userstate === item.id ? true : false}>
                            {item.name}
                          </option>))}
                      </select>
                    </div>
                  </div>
                  <div className="input-box">
                    <label>City</label>
                    <div className="input-style">
                      <i className="icon icon-dropdown"></i>
                      <select name="city" onChange={(e) => changeCity(e)}>
                        <option value="" >Select City</option>
                        {cities && cities?.map((item, i) => (
                          <option key={i} value={item.id} selected={usercity === item.id ? true : false}>
                            {item.name}
                          </option>))}
                      </select>
                    </div>
                  </div>
                  <div className="input-box">
                    <label>Post code</label>
                    <input type="tel" pattern="[0-9]{10,20}" placeholder="Add Post code" defaultValue={userzipcode} onChange={(e) => setUserzipcode(e.target.value)} />
                  </div>
                </div>
                {/* btn */}
                {buttonUpdate ? < CircularProgress color="info" size={25} /> :
                  <div className="btn-box">
                    <input className="btn btn-save" type="submit" value="save"></input>
                  </div>
                }
              </form>
            </TabPanel>

            {/* ----- tab-2 ----- */}
            {privileges?.is_owner ?
              < TabPanel value={value} index={1} className="tab-content">
                <form className="form-default" onSubmit={companyinfoupdate}>
                  <div className="company-info-block">
                    <div className={usercompanylogo ? "img-upload" : "img-upload set-bg"}>
                      <figure className={usercompanylogo ? "img-figure" : "logo-figure"}>
                        <img className={usercompanylogo ? "logo-img-full" : "img-full"} src={usercompanylogo ? `${process.env.REACT_APP_B2B_MEDIA_URL}company-logos/${usercompanylogo}` : `${images.user_img}`}
                          alt="company-logo" />
                      </figure>
                    </div>
                    <div className="btn-group">
                      <input className="btn-input" type="button" value={usercompanylogo ? "Edit Logo" : "Upload Logo"}
                        onClick={(e) => openUploadLogoModal(e)} />
                      <input className="btn-input btn-remove" type="button" value="Remove" onClick={removeLogo} />
                    </div>
                    <div>
                      <label> <br /> Logo must be a rectangle size. <br /> Minimum dimenstions 155 x 60 </label>
                    </div>
                  </div>
                  <div className="input-group">
                    <div className="input-box">
                      <label> Company Name <span>*</span></label>
                      <input type="text"
                        placeholder="E.g. John"
                        required
                        defaultValue={usercompanyname}
                        onChange={(e) => setUsercompanyname(e.target.value)} />
                    </div>
                    <div className="input-box">
                      <label> Email <span>*</span> </label>
                      <input type="email"
                        placeholder="E.g. hello@domain.com"
                        required
                        defaultValue={usercompanyemail}
                        onChange={(e) => setUsercompanyemail(e.target.value)} />
                    </div>
                    <div className="input-box">
                      <label>Company Website</label>
                      <input type="text"
                        placeholder="Website (http(s)://..)"
                        defaultValue={usercompanywebsite}
                        onChange={(e) => setUsercompanywebsite(e.target.value)}
                      />
                    </div>
                    <div className="input-box">
                      <label>Phone</label>
                      <input type="tel"
                        placeholder="+91 800 100 9009"
                        pattern="[0-9]{10,20}"
                        defaultValue={usercompanyphone}
                        onChange={(e) => setUsercompanyphone(e.target.value)} />
                    </div>
                  </div>
                  {/* address-block */}
                  <div className="address-block">
                    <label>Address</label>
                    <div className="input-group">
                      <div className="input-box">
                        <input type="text"
                          placeholder="Address line one"
                          defaultValue={usercompanyaddress}
                          onChange={(e) => setUsercompanyaddress(e.target.value)} />
                      </div>
                      <div className="input-box">
                        <input type="text" placeholder="Address line Two" />
                      </div>
                    </div>
                  </div>
                  {/* select-block */}
                  <div className="select-block">
                    <div className="input-box">
                      <label>Country</label>
                      <div className="input-style">
                        <i className="icon icon-dropdown"></i>
                        <select name="country" onChange={(e) => changeCountry(e)}>
                          <option value="" >Select Country</option>
                          {countries?.map((item, i) => (
                            <option key={i} value={item.id} selected={usercompanycountry === item.id ? true : false}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="input-box">
                      <label>State</label>
                      <div className="input-style">
                        <i className="icon icon-dropdown"></i>
                        <select name="state" onChange={(e) => changeState(e)}>
                          <option value="" >Select State</option>
                          {companystates?.map((item, i) => (
                            <option key={i} value={item.id} selected={usercompanystate === item.id ? true : false}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="input-box">
                      <label>City</label>
                      <div className="input-style">
                        <i className="icon icon-dropdown"></i>
                        <select name="city" onChange={(e) => changeCity(e)}>
                          <option value="">Select City</option>
                          {companycities?.map((item, i) => (
                            <option key={i} value={item.id} selected={usercompanycity === item.id ? true : false}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="input-box">
                      <label>Post code</label>
                      <input type="tel" placeholder="Add Post code"
                        defaultValue={usercompanypincode}
                        onChange={(e) => setUsercompanypincode(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* address-block */}
                  <div className="address-block">
                    <div className="input-group">
                      <div className="input-box">
                        <label>Tax Id Number</label>
                        <input type="tel"
                          placeholder="234-22-5467"
                          defaultValue={usercompanytaxid}
                          onChange={(e) => setUsercompanytaxid(e.target.value)}
                        />
                      </div>
                      {privileges?.allow_cobranding ?
                        <div className="input-box">
                          <label>Cobranding Text</label>
                          <input type="text"
                            placeholder="Cobranding Text"
                            defaultValue={cobrandingtext}
                            onChange={(e) => setCobrandingText(e.target.value)}
                          />
                        </div>
                        : ""
                      }
                    </div>
                  </div>
                  {/* btn */}
                  {buttonUpdateCompany ? < CircularProgress color="info" size={25} /> :
                    <div className="btn-box">
                      <input className="btn btn-save" type="submit" value="save"></input>
                    </div>
                  }
                </form>
              </TabPanel> : null
            }
            {/* ----- tab-3 ----- */}
            <TabPanel value={value} index={privileges?.is_owner ? 2 : 1} className="tab-content">
              <form className="form-passwrd" onSubmit={handleSubmit}>
                <div className="input-group">
                  <div className="input-box">
                    <label> Current Password <span>*</span></label>
                    <input type="password"
                      value={currentPassword}
                      placeholder="Current Password"
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required />
                  </div>
                  <div className="input-box">
                    <label> New Password <span>*</span></label>
                    <input type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required />
                  </div>
                  <div className="input-box">
                    <label>Re-Type New Password <span>*</span></label>
                    <input type="password"
                      placeholder="Re-Type New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required />
                  </div>
                </div>
                {/* btn */}
                {!buttonUpdatePassword  ?
                  <div className="btn-box">
                    <input className="btn btn-save" type="submit" value="save"></input>
                  </div>
                  : <div className="loader-div">
                    <PulseLoader />
                  </div>
                }
              </form>
            </TabPanel>

            {/* ----- tab-4 ----- */}
            <TabPanel value={value} index={privileges?.is_owner ? 3 : 2} className="tab-content">
              <EmailBox />
            </TabPanel>

            <MessageAlert gutterTop
              severity={alertResponse?.status}
              message={alertResponse?.message}
              onClick={() => { setAlert(false); }}
              open={alert}
            />
          </>
        )
        }
      </div >
    </>
  );
}

export default SettingPageForm;
