import api from "../axios-config/app";

export const getUsers = async (bodyData: any) => {
  try {
    const response = await api.post(`users/list`, bodyData);
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
    };
    return await api.post(`users/delete`, data);
  } catch (error) {
    return error;
  }
};

export const quickViewUser = async (formData: any) => {
  try {
    return await api.post(`users/quickview`, formData);
  } catch (error) {
    return error;
  }
};
export const updateUserRecord = async (formData: any) => {
  try {
    const response = await api.post(`users/edit`, formData);
    if (response.data && response.data.status === 200) {
      return response.data;
    }
    return response.data;
  } catch (error) {
    return error;
  }
};
export const getUserRecord = async (formData: any) => {
  try {
    const response = await api.post(`users/user_details`, formData);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const addAUser = async (formData: any) => {
  try {
    const response = await api.post(`users/add`, formData);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const addAForm = async (formData: any) => {
  try {
    const response = await api.post(`users/add-form`, formData);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const getAForm = async (formData: any) => {
  try {
    const response = await api.get(`users/get-form`);
    return response.data;
  } catch (error) {
    return error;
  }
};


