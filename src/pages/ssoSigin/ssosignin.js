import React, { useEffect, useState } from "react";
import { SsoClientLogin, ssoJwtCreation } from "src/services/auth-services/services"
import { useParams } from "react-router";
import { PulseLoader } from "src/components/Loader/Loader";

const SsoSignin = () => {
  const [etoken, setEtoken] = useState("")
  const [slug, setSlug] = useState("")
  const [course_id,] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const { token, id } = useParams();

  useEffect(() => {
    SsoClientLogin(token, id).then(res => {
      if (res.status === 200) {
        if (res.data.data.activity_type && res.data.data.activity_id) {
          if (res.data.data.activity_type === "labs") {
            //for company turing hardcoded condition was requested
            if (id == 742) {
              if (res.data.data.labs_slug) {
                // window.location.href = `${process.env.REACT_APP_WEB_URL}labs/${res.data.data.labs_slug.task_slug}`
                window.location.href = `https://developer-labs.turing.com/labs/${res.data.data.labs_slug.task_slug}`
              } else {
                window.location.href = `https://developer-labs.turing.com/labs/`
              }
            }  else if (id == 1126) {  //Static condition for Quick start Client for virtual Machine.
              window.location.href = `${process.env.REACT_APP_WEB_URL}labs/virtual-machine`
            } else {
              if (res.data.data.labs_slug) {
                window.location.href = `${process.env.REACT_APP_WEB_URL}labs/${res.data.data.labs_slug.task_slug}`
              } else {
                window.location.href = `${process.env.REACT_APP_WEB_URL}labs/library`
              }
            }
          } else {
            if (!res?.data?.data?.redirect_course_slug || !res?.data?.data?.redirect_course_id || !res?.data?.data?.activity_type || !res?.data?.data?.activity_id) {
              setError(true);
              setLoading(false);
            } else {
              window.location.href = `${process.env.REACT_APP_LEARN_URL}/course/${res?.data?.data?.redirect_course_slug}/${res?.data?.data?.redirect_course_id}/${res?.data?.data?.activity_type}/${res?.data?.data?.activity_id}/?token=${res?.data?.data?.token}`
            }
          }
        } else {
          if (!res?.data?.data?.redirect_course_slug || !res?.data?.data?.redirect_course_id) {
            setError(true);
            setLoading(false);
          } else {
            window.location.href = `${process.env.REACT_APP_LEARN_URL}/course/${res?.data?.data?.redirect_course_slug}/${res?.data?.data?.redirect_course_id}/?token=${res?.data?.data?.token}`
          }
        }
      }
      else {
        setError(true);
        setLoading(false);
        //  setTimeout(() => {
        //   window.location.href = '/'
        //   }, 2000);
      }
    })
  }, [])
  return (
    <div className="main-content sso-redirection">
      <div className="container-big" style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'center'
      }}>
        {loading ? <><PulseLoader /><p>Please Wait !! While your Request is being Processed</p></> : ""}
        {error ? <><h4>An Error occured while Processing your Request</h4></> : ""}
      </div>
    </div>
  );
};

export default SsoSignin;

