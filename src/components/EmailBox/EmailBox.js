import { useState, useEffect } from 'react';
import { FormControlLabel, CircularProgress } from '@mui/material';
import { Button } from '@material-ui/core';
import MessageAlert from '../../components/MessageAlert/MessageAlert';
import { PulseLoader } from '../Loader/Loader';
import { CKEditor } from 'ckeditor4-react';
import parse from 'html-react-parser';
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { getById, updateNotification } from 'src/services/EmailNotification-services/services';
import "./EmailBox.scss";

const SimpleContainer = () => {
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedValue1, setSelectedValue1] = useState('');
  const [enrollsubject, setEnrollsubject] = useState('');
  const [enrollmessage, setEnrollmessage] = useState('');
  const [passwordsubject, setPasswordsubject] = useState('');
  const [passwordmessage, setPasswordmessage] = useState('');
  const [preferences, setPreferences] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('info');
  const [message, setMessage] = useState('');
  const [buttonloading, setButtonloading] = useState(false);

  const handleChange = (event) => {
    setChecked(!checked);
    const isChecked = event?.target?.checked;
    setSelectedValue(isChecked ? "enabled" : "disabled");
  };
  const handleChange1 = (event) => {
    setChecked1(!checked1)
    const isChecked = event?.target?.checked;
    setSelectedValue1(isChecked ? "enabled" : "disabled");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_data = JSON.parse(localStorage.getItem('user_data'));
    setButtonloading(true);
    const formData = {
      id: user_data.data.company_id,
      is_send_notification: selectedValue === "enabled" ? "1" : "0",
      email_subject: enrollsubject,
      email_template: enrollmessage,
      password_generate_status: selectedValue1 === "enabled" ? "1" : "0",
      password_generate_body: passwordmessage,
      password_generate_subject: passwordsubject,
    }
    const res = await updateNotification(formData);
    if (res?.status) {
      setButtonloading(false);
      setOpen(true);
      setSeverity(res.status === true ? 'success' : 'error');
      setMessage(res.status === true ? 'Email Notification settings updated successfully' : 'Something went wrong');
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  };

  useEffect(() => {
    const user_data = JSON.parse(localStorage.getItem('user_data'));
    const fetchData = async () => {
      const res = await getById(user_data?.data?.company_id);
      setLoading(true);
      setPreferences(res?.data);
      setSelectedValue(res?.data?.is_send_notification);
      setSelectedValue1(res?.data?.password_generate_status);
      setEnrollsubject((res?.data?.email_subject) ? res?.data?.email_subject : 'Congratulations! New Course Assigned to you');
      setEnrollmessage((res?.data?.email_template) ? res?.data?.email_template : `
          Congratulations! You have been assigned below Course(s) /Subscription(s)/Learning Paths(s) in Whizlabs under Whizcorp portal.<br> 
        `);
      setPasswordsubject((res?.data?.password_generate_subject) ? res?.data?.password_generate_subject : 'Whizlabs Business: Generate your password to access your content');
      setPasswordmessage((res?.data?.password_generate_body) ? res?.data?.password_generate_body
        : `Hello [[first_name]], <br />
    
                Please generate your login password from the given link in order to login into your account. <br />
                
                In case the hyperlink doesn’t work, just copy/paste the link [[password_url]] and change your password [[password_url]]. <br />
                
                Please make sure that password consists of a combination of uppercase and lowercase letters, numbers and special symbols, such as punctuation; and it should be at least 8 characters long,<br />
    
                In case you face any difficulties, please contact our support: support@whizlabs.com.<br />
                
                We wish you a great learning experience.
                `);

      if (res?.data?.is_send_notification === 1) {
        setSelectedValue('enabled');
        setChecked(true);
      }
      else {
        setSelectedValue('disabled');
        setChecked(false);
      }
      if (res?.data?.password_generate_status === 1) {
        setSelectedValue1('enabled');
        setChecked1(true);
      }
      else {
        setSelectedValue1('disabled');
        setChecked1(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className='email-box'>
        {loading && preferences ? (
          <form className='container' onSubmit={handleSubmit}>
            <div className='form-email'>
              <h6> Enrollment Notification</h6>
              <div className="switch-button-1">
                <FormControlLabel
                  control={<ToggleSwitch
                    checked={checked}
                    onChange={handleChange}
                    value={checked ? "disabled" : "enabled"}
                    name="radio-buttons" />}
                />
              </div>
              <div className='box'>
                <label>Subject<small>*</small>:</label>
                <input className="input-field" type="text" placeholder="Subject" value={enrollsubject}
                  onChange={(e) => { setEnrollsubject(e.target.value) }} required />
                <label>Message<small>*</small>:</label>
                <CKEditor initData={<div>{parse(enrollmessage)}</div>}
                  onChange={(e) => { const data = e.editor.getData(); setEnrollmessage(data); }}
                />
                <div className='note-heading'>Note:</div>
                <div className="note-box">
                  <small>[[enrollments]] - List enrolled courses<br /></small>
                  <small>[[user_name]] - Enrolled user name<br /></small>
                  <small>[[login_url]] - Whizcorp Login url<br /></small>
                </div>
              </div>
              <hr />
              {preferences.allow_password_email_template === 1 ? (
                <>
                  <div>
                    <h6>Password Generation Email Notification<small>*</small></h6>
                    <div className="switch-button-2">
                      <FormControlLabel
                        control={<ToggleSwitch
                          checked={checked1}
                          onChange={handleChange1}
                          value={checked1 ? "disabled" : "enabled"}
                          name="radio-buttons"
                        />}
                      />
                    </div>
                  </div>
                  <div className='box'>
                    <label>Subject<small>*</small>:</label>
                    <input className="input-field" type="text" placeholder="Subject" value={passwordsubject}
                      onChange={(e) => { setPasswordsubject(e.target.value); }} required />
                    <label>Message<small>*</small>:</label>
                    <CKEditor initData={<div>{parse(passwordmessage)}</div>}
                      onChange={(e) => { const data = e.editor.getData(); setPasswordmessage(data); }}
                    />
                    <div className='note-heading'>Note:</div>
                    <div className='note-box'>
                      <small>[[first_name]] - User's First Name<br /></small>
                      <small>[[password_url]] - Generate Password Link<br /></small>
                    </div>
                  </div>
                </>
              ) : ("")}
              <div className='btn-box'>
                {!buttonloading ? (<Button variant="contained" type='submit'> update </Button>) : (
                  <CircularProgress color="info" size={25} />)}
              </div>
            </div>
          </form>
        ) : (
          <div className="loader-div">
            <PulseLoader />
          </div>)}
      </div>
      <div>
        <MessageAlert severity={severity} message={message} open={open} onClick={() => setOpen(false)} />
      </div>
    </>
  );
}

export default SimpleContainer;