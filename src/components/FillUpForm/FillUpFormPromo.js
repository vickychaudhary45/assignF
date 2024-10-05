import React from "react";
import "./FillUpForm.scss";
import { images } from "../../config/images";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { brochureForm, leadNotify } from 'src/services/auth-services/services';
import { getCountries } from "src/services/Settings-services/settings"
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import "../../components/ThankYouBlock/ThankYouBlock.scss";

const FillUpFormPromo = () => {
  const [countries, setCountries] = React.useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [phoneNumber, setPhoneNumber] = React.useState('91');
  const [countryData, setCountryData] = React.useState(null);
  const [isValid, setIsValid] = React.useState(true);
  const [btnloading, setBtnloading] = React.useState(false);
  const [thankyou, setThankyou] = React.useState(false);
  const checkSlug = window.location.pathname.split("/");

  React.useEffect(() => {
    getCountries().then(res => {
      setCountries(res.data);
    });
    if (!localStorage.getItem("type")) {
      localStorage.setItem("type", checkSlug[1]);
    }
    handleVisibility();
  }, []);

  const handleVisibility = () => {
    if (document.visibilityState === "hidden") {
      localStorage.removeItem("type")
    }
  }
  document.addEventListener("visibilitychange", handleVisibility);

  const onSubmit = (data) => {
    if (phoneNumber.length > 7) {
      setIsValid(true)
      data.contact_type = localStorage.getItem("type");
      localStorage.removeItem("type");
      setBtnloading(true);
      const brochureData = {
        fullname: data.fullname,
        email: data.email,
        phonenumber: `+${phoneNumber}`,
        companyname: data.companyname,
        country: data.countryname === "select" ? countryData.name : data.countryname,
        // description: data.description,
        how_heard: data.heardaboutus,
        contact_type: data.contact_type,
        no_of_employees: data.no_of_employees
      }
      brochureForm(brochureData).then(res => {
        if (res.data.status === true) {
          const datalead = {
            email: data.email,
          }
          leadNotify(datalead).then(res => {
            if (res.data.status === "success") {
              setBtnloading(false);
              setThankyou(true);
            }
          })
        }
      })
    } else {
      setIsValid(false)
    }
  };
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
                <input type="text" placeholder="e.g. John Smith" {...register("fullname", {
                  required: { value: true, message: "Name is required." },
                  pattern: { value: /^[a-zA-Z ]+$/, message: "Name should not contain any number" },
                  maxLength: { value: 80, message: "Max length can be 80 only." }
                })} />
                <div className='errormsg'>{errors?.fullname?.message}{errors?.pattern?.message}</div>
              </div>
              <div className="input-box">
                <div className='email-field'>
                  <label>
                    Work Email<span>*</span>
                  </label>
                  <label>
                    {/* Verify Email */}
                  </label>
                </div>
                <input type="email" placeholder="e.g. johnsmith@whizlabs.com."
                  {...register("email", {
                    required: { value: true, message: "Email is required." },
                    // pattern to accept this kind of email spatil@parkar.consulting
                    // pattern: { value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, message: "Please enter valid email." },
                    pattern: { value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,14}$/, message: "Please enter valid email." },
                    maxLength: { value: 80, message: "Max length can be 80 only." }
                  })} />
                <div className='errormsg'>{errors?.email?.message}</div>
              </div>
              <div className="input-box">
                <label>
                  Phone Number<span>*</span>
                </label>
                <PhoneInput
                  country={'in'}
                  enableTerritories={true}
                  countryCodeEditable={false}
                  onChange={phone => setPhoneNumber(phone)}
                  isValid={(value, country) => {
                    setCountryData(country)
                    return true
                  }}
                />
                {(phoneNumber.length >= 1 && phoneNumber.length <= 5) && isValid ? ""
                  : phoneNumber.length > 7 ? "" : <span style={{ color: "red" }}>Enter Valid Phone Number</span>
                }
              </div>
              <div className="input-box">
                <label>Company Name</label>
                <input type="text" placeholder="Enter company name" {...register("companyname", { required: false, minLength: { value: 1, message: "Please enter valid name." }, maxLength: { value: 100, message: "Please enter valid name." } })} />
                <div className='errormsg'>{errors?.companyname?.message}</div>
              </div>
              <div className="input-box">
                <label>Country</label>
                <div>
                  <select {...register("countryname", { required: false })}>
                    <option defaultValue={"select"}>select</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country.name}>{country.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              {/* <div className="input-box">
                <label>
                  What are your training requirements?<span>*</span>
                </label>
                <textarea placeholder="Describe your requirement" {...register("description", { required: { value: true, message: "Description is required." } })}></textarea>
                <div className='errormsg'>{errors?.description?.message}</div>
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
              {!btnloading ? <button className="btn btn-demo">Request a demo</button> : (<small>Requesting...</small>)}
              <Link className="btn btn-cancel" to="/">Cancel</Link>
            </div>
          </form>
        </div>
      ) : (
        <div className="thank-you-block">
          <figure>
            <img className="img-full" src={images.right_img} alt="" />
          </figure>
          <div className="caption-group">
            <div className="title">Thank you for requesting a demo </div>
            <p>You are very important to us, all information received will always remain confidential. We will contact you in 24hrs.</p>
            <Link to="/" className="link">
              <i className="icon-arrow-right"></i>
              <span>Back to <strong>Whizlabs Business</strong></span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default FillUpFormPromo;