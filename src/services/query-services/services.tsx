import api from "../axios-config/app";

export const getQueries = async (page:Number, per_page:Number, company_id:Number) => {
    try {
      const response = await api.get(`settings/all?page=${page}&per_page=${per_page}&company_id=${company_id}`);
      return response.data;
    } catch (error) {
      return error;
    }
  };

export const createTicket = async (formData: any) => {
  try{
    const response = await api.post(`settings/create`, formData);
    return response.data;
  } catch (error){
    return error;
  }
}

export const uploadImgToS3 = async (formData: any) => {
  try {
    const response = await api.post(`settings/s3-file-upload`, formData);
    return response.data;
  }
  catch (error) {
    return error;
  }
}