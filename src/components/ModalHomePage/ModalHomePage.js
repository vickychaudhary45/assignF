import { useRef, useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import "./ModalHomePage.scss";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "../../services/auth-services/services";
import { addQrUser } from "src/services/users-services/services";
import { fetchCountryPhoneCode } from "src/services/users-services/services";
import { ArrowBack, Cancel, CheckCircle } from "@mui/icons-material";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">Activate Your Subscription</Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose} >
        <CloseIcon />
      </IconButton>
    </MuiDialogTitle>
  );
});

const SuccessMsg = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <div style={{display: "flex", justifyContent: "center"}}>
      <CheckCircle fontSize="large"color="success" />
      </div>
      <div style={{display: "flex", justifyContent: "center"}}>
        <Typography color="success" style={{color: "green" }} variant="h5">Activation Successful</Typography>
      </div>
      <div style={{display: "flex", justifyContent: "center"}}>
        Registration and Subscription details will be sent to your email shortly
      </div>

        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose} >
        <CloseIcon />
      </IconButton>
      <br></br>
      <br></br>
        <div style={{display: "flex", justifyContent: "center"}}>
        <p><span style={{color: "red"}}>*</span>Please login from your desktop for best viewing experience</p>
      </div>
    </MuiDialogTitle>
  );
});
const ErrMsg = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <div style={{display: "flex", justifyContent: "center"}}>
        <Cancel fontSize="large" color="error" />
      </div>
      <br />
      <div style={{display: "flex", justifyContent: "center"}}>
      <Typography color="error">This email is already registered with Whizlabs Business</Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose} >
          <CloseIcon />
        </IconButton>
      </div>
      <br />
        <div style={{display: "flex", justifyContent: "center"}}>
          <ArrowBack onClick={props.back} style={{cursor: "pointer"}}/>
      </div>
    </MuiDialogTitle>
  );
});

const ModalDefault = (props) => {
  const [validationResult, setValidationResult] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [formData, setFormData] = useState({
    company_id: props.company_id,
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    organization_name: "",
    designation: "",
    linkedInURL: "",
    countryCode: "",
  });

  const back = () => {
    setErrorMsg(false);
    setFormData({...formData, email:""})
  };

  const recaptcha = useRef();
  useEffect(() => {
    setFormData({
      ...formData,
      company_id: props.company_id,
    });
  }, [props]);

  const validateLinkedInUrl = () => {
    const urlRegex =
      /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub|profile)\/[\w-]+\/?$/i;
    const { linkedInURL } = formData;

    if (linkedInURL) {
      if (!urlRegex.test(linkedInURL)) {
        setValidationResult("Invalid URL");
        return;
      } else {
        setValidationResult("Validation Success!");
      }
    } else {
      setValidationResult("Kindly Enter your LinkedIn Profile Url");
    }
  };

  function submitForm(event) {
    event.preventDefault();
    if (validationResult !== "Validation Success!") {
      alert("Kindly validate your LinkedIn Profile URL!");
      return;
    }
    const captchaValue = recaptcha.current.getValue();
    if (!formData.sandbox) {
      alert("Please select a sandbox option!");
      return;
    }
    if (!captchaValue) {
      alert("Please verify the reCAPTCHA!");
    } else {
        verifyCaptcha(captchaValue).then(res => {
          if(res.data.status){  
          addQrUser(formData).then((res) => {
            if (res.status === "success") {
              setSuccessMsg(true);
              setErrorMsg(false);
                localStorage.removeItem("qr_source")
              }
              else {
              setSuccessMsg(false);
              setErrorMsg(true);
                localStorage.removeItem("qr_source")
            }
          });
        }
        } )
    }
  }
  let qr_source = (props.company_id === 1119) ? "qr_source_ccj" : (props.company_id === 1172) ? "qr_source_aws_cce24" : "unknown";


  useEffect(() => {
    fetchCountryPhoneCode().then((res) => {
      if (res.status === "200") {
        const countryPhoneCode = res.data.country_calling_code;
        setFormData((prevData) => ({
            ...prevData,
            countryCode: countryPhoneCode,
          }));
        }
    });
    fetchCountryPhoneCode();
  }, []);

  return (
    <>
      <Dialog
        className="modal-default"
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        {!successMsg && !errorMsg && (
          <form className="modal" onSubmit={(event) => submitForm(event)}>
            <div className="modal-head">
              <div className="caption"></div>
              <DialogTitle
                id="customized-dialog-title"
                onClose={props.handleClose}
              />
            </div>
            <div className="modal-container">
              <div className="input-group">
                <div className="input-box">
                  <label>
                    First Name <span>*</span>{" "}
                  </label>
                  <input
                    type="text"
                    placeholder="E.g. John"
                    maxLength={20}
                    value={formData.firstname}
                    required
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        firstname: e.target.value.replace(/[0-9]/g, ""),
                      });
                    }}
                  />
                </div>
                <div className="input-box">
                  <label> Second Name </label>
                  <input
                    type="text"
                    placeholder="E.g. Dio"
                    maxLength={20}
                    value={formData.lastname}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        lastname: e.target.value.replace(/[0-9]/g, ""),
                      });
                    }}
                  />
                </div>

                <div className="input-box">
                  <label>
                    Email <span>*</span>
                  </label>
                  <input
                    type="email"
                    maxLength={50}
                    value={formData.email}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    placeholder={"email"}
                    required
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                    }}
                  />
                  <p>Registration details will be sent to email</p>
                </div>
              </div>
              <div className="input-group">
                <div className="input-box">
                  <label>
                    Company name / Institute name<span> *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Whizlabs"
                    value={formData.organization_name}
                    maxLength={50}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        organization_name: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="input-box">
                  <label>Designation</label>
                  <input
                    type="text"
                    value={formData.designation}
                    maxLength={20}
                    placeholder={"Designation"}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        designation: e.target.value.replace(/[0-9]/g, ""),
                      });
                    }}
                  />
                </div>
                <div className="input-box">
                  <label>
                    Phone
                  </label>
                  <div style={{ display: "flex" }}>
                    <input
                      type="text"
                      // required
                      placeholder="+91"
                      maxLength={6}
                      pattern="\+[0-9]{1,6}"
                      value={formData.countryCode}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          countryCode: e.target.value,
                        });
                      }}
                      style={{ width: "60px", marginRight: "10px" }}
                    />
                    <input
                      type="tel"
                      // required
                      placeholder="800 100 9009"
                      maxLength={20}
                      pattern="[0-9]{5,20}"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="input-box">
                  <label>
                    LinkedIn Profile URL <span>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your profile URL"
                    maxLength={50}
                    value={formData.linkedInURL}
                    onChange={(e) => {
                      setFormData({ ...formData, linkedInURL: e.target.value });
                      setValidationResult('');
                    }}
                  />
                  {validationResult === "" ? (
                    <button
                      className="validate-button"
                      type="button"
                      onClick={validateLinkedInUrl}
                    >
                      Validate
                    </button>
                  ) : (
                    <span
                      className={
                        validationResult !== "Validation Success!"
                          ? "error-text"
                          : "success-text"
                      }
                    >
                      {validationResult}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <br></br>
            <div className="sandbox">
              <div
                className="sandbox-options"
                style={{ flex: 1, marginLeft: "10px" }}
              >
                <label>
                  Sandbox Options <span>*</span>
                </label>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label>
                    <input
                      type="radio"
                      name="sandbox"
                      value="1253"
                      checked={formData.sandbox === "1253"}
                      onChange={(e) => {
                        setFormData({ ...formData, sandbox: e.target.value });
                      }}
                    />
                    AWS Sandbox (3M)
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="sandbox"
                      value="1254"
                      checked={formData.sandbox === "1254"}
                      onChange={(e) => {
                        setFormData({ ...formData, sandbox: e.target.value });
                      }}
                    />
                    Azure Sandbox (3M)
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="sandbox"
                      value="1255"
                      checked={formData.sandbox === "1255"}
                      onChange={(e) => {
                        setFormData({ ...formData, sandbox: e.target.value });
                      }}
                    />
                    Google Cloud Sandbox (3M)
                  </label>
                </div>
              </div>

              <div className="capta" style={{ flex: 1, marginLeft: "0px" }}>
                <ReCAPTCHA
                  ref={recaptcha}
                  sitekey={process.env.REACT_APP_SITE_KEY}
                />
              </div>
            </div>

            <br></br>
            <div className="modal-footer">
              <Typography>
                Interested in teams? "
                <a
                  href={`/request-demo-page?utm_source=${qr_source}`}
                  style={{ borderRadius: "30px" }}
                >
                  Request a Demo
                </a>
                "
              </Typography>
            </div>
            <div className="btn-group">
              {/* {validationResult === "Validation Success!" && ( */}
              <input
                type="submit"
                className="btn btn-complete"
                value="Activate"
              />
              {/* )} */}
            </div>
          </form>
        )}
        {successMsg ? (
          <SuccessMsg
            id="customized-dialog-title"
            onClose={props.handleClose}
          />
        ) : (
          ""
        )}
        {errorMsg ? (
          <ErrMsg
            id="customized-dialog-title"
            back={back}
            onClose={props.handleClose}
          />
        ) : (
          ""
        )}
      </Dialog>
    </>
  );
};

export default ModalDefault;
