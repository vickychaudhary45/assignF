import Cookie from "js-cookie";
import api, {baseUrl, calendlyToken } from '../axios-config/app';
import axios from "axios";

export const sendTokenEmail = async (formData: any) => {
  try {
    return await api.post( "auth/password/forgot", formData);
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
