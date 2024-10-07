import React from 'react';
import { images } from '../../config/images';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { brochureForm, brochureEmailVerification, leadNotify, getCalendlyEvent, sendMeetingScheduledEmail } from 'src/services/auth-services/services';
import { getCountries, getIplocation } from 'src/services/Settings-services/settings';
import { useHistory, useLocation } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import './FillUpForm.scss';
import "../../components/ThankYouBlock/ThankYouBlock.scss";

const FillUpForm = () => {
  const [countries, setCountries] = React.useState([]);
  const { register, handleSubmit, formState: { errors }, control, setValue, getValues } = useForm();
  const [countryData, setCountryData] = React.useState(''); // format => countryCode + countryname
  const [isValid, setIsValid] = React.useState(true);
  const [btnloading, setBtnloading] = React.useState(false);
  const [thankyou, setThankyou] = React.useState(false);
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [meetingUri, setMeetingUri] = React.useState(null);
  const [uuid, setUuid] = React.useState(null);
  const [meetingUrl, setMeetingUrl] = React.useState(null);
  const [eventDate, setEventDate] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [emailValid, setEmailValid] = React.useState(false);
  const [prefill, setPrefill] = React.useState({
    name: "",
    email: ""
  });
  const [userIPLocation, setUserIPLocation] = React.useState({
    country: "",
    countryCode: ""
  });

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const history = useHistory();

  // get user ip address

  React.useEffect(() => {
    getCountries().then((res) => {
      setCountries(res.data);
    });
    getIplocation().then((res) => {
      if(res.status){
        setUserIPLocation(res.data);
        setCountryData(res.data.countryCode + '|' + res.data.country);
      }
      else{
        setUserIPLocation({
          country: "",
          countryCode: 'in',
        });
      }
    }
    )
    if (!localStorage.getItem('utm_source') || params.get('utm_source')) {
      localStorage.setItem('utm_source', params.get('utm_source'));
      params.delete('utm_source');
      history.replace({
        search: params.toString(),
      });
    }
  }, []);

  const onSubmit = (data) => {
    if (!data?.phone?.length || data?.phone?.length === 0 || data?.phone?.length > 7) {
      // setIsValid(true);
      data.contact_type = localStorage.getItem('utm_source');
      // localStorage.removeItem('utm_source');
      setBtnloading(true);
      const brochureData = {
        fullname: data.fullname,
        email: data.email,
        phonenumber: data?.phone || '',
        companyname: data.companyname,
        country: data.countryname.split("|")[1],
        // description: data.description,
        no_of_employees: data.no_of_employees,
        how_heard: data.heardaboutus,
        contact_type: data.contact_type,
        event_date: eventDate,
        meeting_link: meetingUrl
      };
      setName(data.fullname);
      setEmail(data.email);

      setPrefill({
        name: data.fullname,
        email: data.email
      })

      brochureForm(brochureData).then((res) => {
        if (res?.data.status === true) {
          const datalead = {
            email: data.email,
          };
          leadNotify(datalead).then((res) => {
            if (res?.data.status === 'success') {
              setBtnloading(false);
              // setThankyou(true);
              setShowCalendar(true);
            }
          });
        }
      });
    } else {
      setIsValid(false);
    }
  };

  const disallowSpaces = (value) => {
    // !/\s/.test(value); // to check the if there are spaces
    const validateValue = value.trim();
    if (validateValue === "") {
      return false;
    }
    return true;
  }

  const calendlyFormData = {
    uri: meetingUri,
    name: "feedback LMS Demo",
    status: "active",
  }
  const confirmDemoHandler = async () => {
    if (meetingUri == null) {
      setErrorMessage("Please select a day and time to proceed.")
      return;
    }
    else {
      setBtnloading(true);
      const res = await getCalendlyEvent(uuid, calendlyFormData);
      setMeetingUrl(res?.data?.resource.location.join_url);
      setEventDate(res?.data?.resource.start_time);
      let emailData = {
        name: name,
        email: email,
        meeting_link: res?.data?.resource.location.join_url,
        event_date: res?.data?.resource.start_time,
        event_time: res?.data?.resource.start_time
      }
      const response = await sendMeetingScheduledEmail(emailData);
      if (response?.data?.status === "success") {
        setBtnloading(false);
        setThankyou(true);
      }
    }
  }
  const pagesetting = {
    hideEventTypeDetails: true,
    hideLandingPageDetails: true,
    backgroundColor: '#F0F8FF',
  }
  const style = {
    border: '2px solid white',
    borderRadius: '10px',
    height: '85vh',
    width: '40vw'
  }
  useCalendlyEventListener({
    onEventScheduled: (e) => {
      setMeetingUri(e.data.payload.event.uri)
      let url = e.data.payload.event.uri;
      let parts = url.split("/");
      setUuid(parts[parts.length - 1]);
      setErrorMessage("");
    },
  });

  const emailVerify = async() => {
    let email = getValues();
    if(!email.email){
      setEmailValid(true)
      return;
    }
    const formData = {email: email.email}
    const res = await brochureEmailVerification(formData);
  } 

  const Range = [
    {id: 1, value: "2-10"},
    {id: 2, value: "11-50"},
    {id: 3, value: "51-100"},
    {id: 4, value: "101-1000"},
    {id: 5, value: "1000+"},
  ]
  return (
    <>
      {!thankyou ? (
        <>
          {showCalendar == true ? (
            <div id="calendar" className="date-calendar-block">
              <InlineWidget url={`${process.env.REACT_APP_CALENDLY_feedback_DEMO_EVENT_LINK}?hide_gdpr_banner=1`}
                pageSettings={pagesetting}
                styles={style}
                prefill={prefill}
              />
              <div className='errormsg'>{errorMessage}</div>
              <div className='btn-group'>
                {!btnloading ? (
                  meetingUri != null ? <><button className="btn btn-demo" onClick={confirmDemoHandler}>Confirm Demo</button></> :
                    <></>) : (<button className='btn btn-demo'>Loading.....</button>)}
              </div>
            </div>
          ) : (
            <div className="fill-up-box">
              <Link to="/" className="logo">
                <img className="img-full" src={images.logo_busi} alt="" />
              </Link>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-box-group">
                  <div className="input-box">
                    <label>
                      Full Name<span>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      {...register('fullname', {
                        required: { value: true, message: 'Name is required.' },
                        pattern: {
                          value: /^[a-zA-Z ]+$/,
                          message: 'Name should not contain any number',
                        },
                        validate: {
                          noSpaces: (value) =>
                            disallowSpaces(value) || 'Name is required.', // validation for spaces
                        },
                        maxLength: {
                          value: 80,
                          message: 'Max length can be 80 only.',
                        },
                      })}
                    />
                    <div className="errormsg">
                      {errors?.fullname?.message}
                      {errors?.pattern?.message}
                    </div>
                  </div>

                  <div className="input-box">
                    <div className='email-field'>
                      <label>
                        Work Email<span>*</span>
                      </label>
                      <label onClick={()=>emailVerify()}>
                        {/* Verify Email */}
                      </label>
                    </div>
                    <input type="email" placeholder="e.g. johnsmith@feedback.com."
                      {...register('email', {
                        required: { value: true, message: 'Email is required.' },
                        // pattern to accept this kind of email spatil@parkar.consulting
                        // pattern: { value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, message: "Please enter valid email." },
                        pattern: {
                          value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,14}$/,
                          message: 'Please enter valid email.',
                        },
                        maxLength: { value: 80, message: 'Max length can be 80 only.' },
                        validate: value => !/^[A-Za-z0-9._%+-]+@gmail\.com$/.test(value) || 'Please provide the company email address'
                      })}
                    />
                    {/* <label className='email-content'>(For faster responses, please click on verify email and check inbox)</label> */}
                    <div className="errormsg">{errors?.email?.message}</div>
                    {emailValid ? <div className="errormsg">{errors?.email?.message}</div> : ""}
                  </div>
                  <div className="input-box">
                    <label>
                      Country<span>*</span>
                    </label>
                    <div>
                      <select
                        {...register('countryname', {
                          required: {
                            value: true,
                            message: "Country name needs to be selected",
                          },
                          validate: (value) => {
                            return value === "select" ? "Please select country" : true
                          },
                        })}
                        value={countryData ? countryData : (userIPLocation?.countryCode + "|" + userIPLocation?.country)}
                        onChange={(e) => {
                          setCountryData(prev => e.target.value)
                          setValue('phone', '')
                        }}
                      >
                        <option defaultValue={'select'}>select</option>
                        {countries.map((country, index) => (
                          <option key={index} value={country.country_code + "|" + country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {countryData === '' ? <div className='errormsg'> {errors?.countryname?.message} </div> :
                      countryData === 'select' ? <div className="errormsg">Please select country</div> : ""}
                  </div>
                  <div className="input-box">
                    <label>
                      Phone Number
                    </label>
                    <Controller
                      control={control}
                      name="phone"
                      rules={{

                        validate: (value) => {
                          if (!value) return true;
                          return isValid;
                        }
                      }}
                      render={({ field: { ref, ...field } }) => (
                        <PhoneInput
                          country={`${countryData?.split("|")[0].toLowerCase() || userIPLocation?.countryCode?.toLowerCase()}`}
                          enableTerritories={true}
                          countryCodeEditable={false}
                          onChange={(phone, country) => {

                            let onlyNumber = phone.length - country.dialCode.length;
                            if(onlyNumber == 0){
                              setIsValid(prev => false)
                            } else if (onlyNumber >= 7){
                              setIsValid(prev => true)
                            } else{
                              setIsValid(prev => false)
                            }
                            if (onlyNumber === 0){
                              setIsValid(prev => false)
                              field.onChange('')
                            }
                            else
                              field.onChange(phone)
                          }}
                          inputRef={ref}
                          // value = {phoneNumber}
                          isValid={(value, country) => {
                            if (!value) return true;
                            return true;
                          }}
                        />
                      )}
                    />
                    {isValid ? "" : <span className='errormsg'>Enter valid phone number</span>}
                  </div>

                  <div className="input-box">
                    <label>
                      Company Name<span>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter company name"
                      {...register('companyname', {
                        required: {
                          value: true,
                          message: 'Company Name  is required.',
                        },
                        minLength: {
                          value: 1,
                          message: 'Please enter valid name.',
                        },
                        maxLength: {
                          value: 100,
                          message: 'Please enter valid name.',
                        },
                      })}
                    />
                    <div className="errormsg">{errors?.companyname?.message}</div>
                  </div>

                  <div className="input-box">
                    <label>How you heard about us?</label>
                    <div>
                      <select {...register('heardaboutus', { required: false })}>
                        <option defaultValue={'select'}>select</option>
                        <option>Search Engine (Google, Yahoo, Bing, etc.)</option>
                        <option>Friend or Colleague</option>
                        <option>LinkedIn</option>
                        <option>Facebook</option>
                        <option>Google Ad</option>
                        <option>Blog or Publication</option>
                        <option>Email</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  {/* <div className="input-box">
                    <label>
                      What are your training requirements?
                    </label>
                    <textarea
                      placeholder="Describe your requirement"
                      {...register('description', {
                      })}
                    ></textarea>
                    <div className="errormsg">{errors?.description?.message}</div>
                  </div> */}
                  <div className="input-box">
                    <label>
                      How many employees would you like to train?<span>*</span>
                    </label>
                      <div className="radio-group" >
                        {Range && Range?.map((el, index) => {
                          return (
                            <label className="radio-style" key={`${el.id}_${index}`}>
                              <input
                                {...register('no_of_employees', {
                                  required: {
                                    value: true,
                                    message: "No of employee Required.",
                                  },
                                })}
                                type="radio"
                                value={el.id}
                              />
                              <span className="checkmark"></span>
                              {el.value}
                            </label>
                          );
                        })}
                      </div>
                    <div className="errormsg">{errors?.no_of_employees?.message}</div>
                  </div>
                </div>
                <div className="btn-group">
                  {!btnloading ? (<button className="btn btn-demo">Submit and Schedule Demo</button>
                  ) : (<button className="btn btn-demo">Submitting.....</button>)}
                </div>
              </form>
            </div>
          )}
        </>
      ) : (
        <div className="thank-you-block">
          <figure>
            <img className="img-full" src={images.right_img} alt="" />
          </figure>
          <div className="caption-group">
            <div className="title">Thank you for requesting a demo </div>
            <p>
              You are very important to us, all information received will always
              remain confidential. We will contact you in 24hrs.
            </p>
            <Link to="/" className="link">
              <i className="icon-arrow-right"></i>
              <span>
                Back to <strong>feedback Business</strong>
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default FillUpForm;
