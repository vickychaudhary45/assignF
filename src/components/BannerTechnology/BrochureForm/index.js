import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import { brochureForm, leadNotify } from "src/services/auth-services/services";
import { saveAs } from "file-saver";
import { images } from "../../../config/images";
import { CircularProgress } from '@material-ui/core';

export const BrochureForm = ({ closeModal }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [status, setStatus] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (formData, e) => {
    setLoading(true);
    const response = await brochureForm(formData);
    if (response.data.status) {
      saveAs(images.brochurePdfFile, "Whizlabs_Business_Competency_Plus.pdf");
      setStatus({ type: 'success' });
      const datalead = {
        email: formData.email,
      }
      leadNotify(datalead).then(res => {
        if (res.data.status === "success") {
          setLoading(false);
        }
      })

    } else {
      setStatus({ type: 'error' });
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-box-group">
        <div className="input-box">
          <label htmlFor="name">Full Name<small>*</small></label>
          <input className="form-control" id="fullname" placeholder="Enter Full Name" {...register("fullname", {
            required: { value: true, message: "Name is required." },
            pattern: { value: /^[a-zA-Z ]+$/, message: "Name should not contain any number or space." },
            maxLength: { value: 80, message: "Max length can be 80 only." }
          })} />
          <div className='errormsg'>{errors?.fullname?.message}</div>
        </div>
        <div className="input-box">
          <label htmlFor="name">Enter your email ID<small>*</small></label>
          <input className="form-control" id="email" placeholder="Enter Email ID"
            {...register("email", {
              required: { value: true, message: "Email is required." },
              pattern: { value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,14}$/, message: "Please enter valid email." },
              maxLength: { value: 80, message: "Max length can be 80 only." },
              validate: value => !/^[A-Za-z0-9._%+-]+@gmail\.com$/.test(value) || 'Please provide the company email address'
            })} />
          <div className='errormsg'>{errors?.email?.message}</div>
        </div>
        <div className="input-box">
          <label htmlFor="name">Phone Number<small>*</small></label>
          <input className="form-control" id="phonenumber" maxLength={20} placeholder="Enter Phone Number" {...register("phonenumber", { 
            required: { value: true, message: "Phone Number is required." },
            minLength: { value: 6, message: "Please enter valid number." }, 
            maxLength: { value: 15, message: "Please enter valid number." } })} />
          <div className='errormsg'>{errors?.phonenumber?.message}</div>
        </div>
        <div className="input-box">
          <label htmlFor="name">Company Name<small>*</small></label>
          <input className="form-control" id="companyname" placeholder="Enter Company Name" {...register("companyname", {
            required: { value: true, message: "Company Name is required." }, 
            minLength: { value: 1, message: "Please enter valid name." }, 
            maxLength: { value: 100, message: "Please enter valid name." } })} />
          <div className='errormsg'>{errors?.companyname?.message}</div>
        </div>
        <input type="hidden" value="brochure" {...register("contact_type")} />
        <div className="input-box">
          {!loading ? (
            <button className="form-control btn overview" type="submit">
              Download Now <i className="icon-upload-down"></i>
            </button>) : (
            <CircularProgress size={24} className="btn overview" />)}
          <Link className="btn btn-cancel" onClick={closeModal} to="/">Cancel</Link>
        </div>
        <>
          {status?.type === 'success' && <div className="show-success">Your broucher downloaded successfully!.</div>}
        </>
      </div>
    </form>
  );
};
export default BrochureForm;