import Cookie from "js-cookie";
import api, {baseUrl, calendlyToken } from '../axios-config/app';
import axios from "axios";

export const sendTokenEmail = async (formData: any) => {
  try {
    return await api.post( "auth/password/forgot", formData);
  } catch (error) { }
};

export const resetPassword = async (formData: any) => {
  try {
    return await api.post( "auth/password/reset", formData); 
  } catch (error) { }
};

export const corpRegister = async (formData: any) => {
  try {
    return await api.post( "auth/register/corp", formData);
  } catch (error) { }
};

export const corpLogin = async (formData: any) => {
  const returnData = {
    data: null,
    status: false,
    msg: "",
  };
  try {
    const response = await api.post( "auth/login", formData);
    if (response.data.status === true) {
      returnData.data = response.data.data;
      returnData.status = true;
      returnData.msg = "Login Success.";
      let userData = JSON.stringify({
        msg: "Login successfull",
        data: {
          company_id: returnData.data.company_id,
          is_owner: returnData.data.is_owner,
          profile_img: returnData.data.profile_img,
          token: returnData.data.token,
          user_email: returnData.data.user_email,
          user_id: returnData.data.user_id,
          name: returnData.data.name,
          abletodownload_orderreport:
            returnData.data.abletodownload_orderreport,
          limitedusers: returnData.data.limitedusers,
          howmanyusers: returnData.data.howmanyusers,
          bulkuploaddisallow: returnData.data.bulkuploaddisallow,
          totalUser: returnData.data.totalUser,
          portal_switch: returnData.data.portal_switch,
          company_name: returnData.data.company_name,
          favicon: returnData.data.favicon,
          allow_whitelabeling: returnData.data.allow_whitelabeling,
          custom_login_enabled: returnData.data.has_custom_login, // 1/0
          login_page_slug :returnData.data.login_page_slug
        },
      });
      localStorage.setItem("user_data", userData);
      //release-notes by Niroop
      // localStorage.setItem(
      //   "releaseNotesModal",
      //   JSON.stringify({ modal: true })
      // );
      Cookie.set("userData", userData);
    }
    else if (response.data.status === false) {
      returnData.msg = response.data.message;
      returnData.status = false;
    }
    return returnData;
  } catch (error) {
    returnData.msg = 'The username or password is incorrect';
    return returnData;
  }
};

export const brochureForm = async (formData: any) => {
  try {
    const response = await api.post( "auth/brochureform", formData);
    return response;
  } catch (error) {
    return error;
  }
};

export const brochureEmailVerification = async (formData: any) => {
  try {
    const response = await api.post( "auth/verification-email", formData);
    return response;
  } catch (error) {
    return error;
  }
};

export const emailVerify = async (formData: any) => {
  try {
    const response = await api.post( "auth/email/verification", formData);
    return response;
  } catch (error) {
    return error;
  }
};

export const forgotPassword = async (formData: any) => {
  try {
    const response = await api.post( "auth/password/forgot", formData);
    return response;
  } catch (error) {
    return error;
  }
}


// /LeadNotify
export const leadNotify = async (formData: any) => {
  try {
    const response = await api.post( "auth/LeadNotify", formData);
    return response;
  } catch (error) {
    return error;
  }
}

export const samlLoginWithTOken = async (token: any) => {
  const returnData = {
    data: null,
    status: false,
    msg: "",
  };
  try {
    const data = {
      token: token,
    };
    const response = await api.post(`saml/request`, data);
    if (response.data.status === true) {
      returnData.data = response.data.data;
      returnData.status = true;
      returnData.msg = "Login Success.";
      let userData = JSON.stringify({
        msg: "Login successfull",
        data: {
          company_id: returnData.data.company_id,
          is_owner: returnData.data.is_owner,
          profile_img: returnData.data.profile_img,
          token: returnData.data.token,
          user_email: returnData.data.user_email,
          user_id: returnData.data.user_id,
          name: returnData.data.name,
          abletodownload_orderreport:
            returnData.data.abletodownload_orderreport,
          limitedusers: returnData.data.limitedusers,
          howmanyusers: returnData.data.howmanyusers,
          bulkuploaddisallow: returnData.data.bulkuploaddisallow,
          totalUser: returnData.data.totalUser,
        },
      });
      localStorage.setItem("user_data", userData);
      //release-notes by Niroop
      // localStorage.setItem(
      //   "releaseNotesModal",
      //   JSON.stringify({ modal: true })
      // );
      Cookie.set("userData", userData);
    }
    else if (response.data.status === false) {
      returnData.msg = response.data.message;
      returnData.status = false;
    }
    return returnData;
  } catch (error) {
    return error;
  }
}

export const SsoClientLogin = async (encrptString: any, id: any) => {
  try {
    const response = await api.post( `sso-business/${encrptString}/${id}`);
    if (response.status === 200) {
      let userData = JSON.stringify({
        msg: "Login successfull",
        data: {
          profile_img: response.data.data.profile_img,
          token: response.data.data.token,
          user_email: response.data.data.user_email,
          user_id: response.data.data.user_id,
          name: response.data.data.name,
          sso: true,
          user_type: "sso_client",
        },
      });
      localStorage.setItem("user_data", userData);
      //release-notes by Niroop
      // localStorage.setItem(
      //   "releaseNotesModal",
      //   JSON.stringify({ modal: true })
      // );
      Cookie.set("userData", userData);
    }
    return response;
  }
  catch(error){
    return error;
  }
}
 
export const sendMeetingScheduledEmail = async (emailData: any) =>{
  try{
  const response = await api.post(`auth/meeting-email`, emailData);
  return response;
  }
  catch(error){
    return error;
  }
}

//calendly API
export const getCalendlyEvent = async (uuid: any, formData: any)=>{
  try{
    const response = await axios.get(`https://api.calendly.com/scheduled_events/${uuid}`,{
      headers: { Authorization: `Bearer ${calendlyToken}`,
      'Content-Type': 'application/json'},
      data:formData
    });
    return response;
  }
  catch(error){
    return error;
  }
}

//verifyCaptcha
export const verifyCaptcha = async (formData: any) =>{
  try{
    const response = await axios.post(`${baseUrl}/auth/verify`,{
      headers: { 'Content-Type': 'application/json'},
      captchaValue:formData
    });
    return response
  }
  catch(error){
    return error;
  }
}

export const getB2BCompanyData = async (slug: any) => {
  try {
    const data = await api.post(`auth/list/${slug}`);
    return data.data;
  } catch (error) {
    return error;
  }
}