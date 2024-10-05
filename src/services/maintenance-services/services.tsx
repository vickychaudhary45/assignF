import axios from "axios"
const bannerUrl = process.env.REACT_APP_API_ASSIST_URL;

export const getMaintenanceBanner = async() => {
  try{
    return await axios.get(`${bannerUrl}website/banner?domain=1&platform=1`)
  }
  catch(error){
    return error;
  }
};