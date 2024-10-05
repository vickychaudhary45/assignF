import api, { company_id } from "../axios-config/app";


export const getUsers = async (bodyData: any) => {
  try {
    const response = await api.post(`users/list`, bodyData, );
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (id: any, status: boolean) => {
  try {
    const data = {
      status,
      user_id: id,
    }
    return await api.post(`users/delete`, data, );
  } catch (error) {
    return error;
  }
};

export const getUserProfile = async (token) => {
  try {
    const data = {};
    return await api.post("users/getuserinfo", data, );
  } catch (error) {
    return error;
  }
};

export const userBulkUpload = async (data: any) => {
  try {
    return await api.post("users/bulk-upload", data, );
  } catch (error) {
    return error;
  }
}

export const excelOrderReport = async () => {
  try {
    const response = await api.get(`users/export-order-report?company_id=${company_id}`, );
    return response.data;
  } catch (error) {
    return error;
  }
}

export const quickViewUser = async (formData: any) => {
  try {
    return await api.post(`users/quickview`, formData, );
  } catch (error) {
    return error;
  }
}
export const updateUserRecord = async (formData: any) => {
  try {
    const response = await api.post(`users/edit`, formData, );
    if (response.data && response.data.status === 200) {
      return response.data;
    }
    return response.data;
  } catch (error) {
    return error;
  }
}
export const getUserRecord = async (formData: any) => {
  try {
    const response = await api.post(`users/user_details`, formData, );
    return response.data;
  } catch (error) {
    return error;
  }
}
export const addAUser = async (formData: any) => {
  try {
    const response = await api.post(`users/add`, formData, );
    return response.data;
  } catch (error) {
    return error;
  }
}
export const addQrUser = async (formData: any) => {
  try {
    const response = await api.post(`users/add-qr-user`, formData);
    return response.data;
  } catch (error) {
    return error;
  }
}
export const fetchCountryPhoneCode = async () => {
  try {
    const response = await api.get("https://ipapi.co/json/");
    return response;
  } catch (error) {
    console.error("Error fetching the country phone code:", error);
  }
};

//calling downloadUserReport API to download all users report of a company.
export const downloadUserReport = async (company_id) => {
  try{
   const response = await api.get(`users/download-user-report?company_id=${company_id}`,);
   return response.data;
  }
  catch (error) {
    return error;
  }
}
export const getUserTimeline = async (formData: any) => {
  try {
    return await api.post(`users/timeline`, formData, );
  } catch (error) {
    console.error(error);
    return error;
  }
}
