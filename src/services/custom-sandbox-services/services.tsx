import axios from 'axios';
import api, { playUrl } from '../axios-config/app';

export const listSandboxes = async (company_id: Number, category_id: any) => {
  try {
    const response = await api.get(`custom-sandboxes/list-sandbox?company_id=${company_id}&category_id=${category_id}`, );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const listUsers = async (company_id: Number, sandbox_slug: String, search: String) => {
  try {
    const response = await api.get(`custom-sandboxes/list-users?company_id=${company_id}&sandbox_slug=${sandbox_slug}&search=${search}`, );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const enrollUsers = async (data: any) => {
  try {
    const response = await api.post(`custom-sandboxes/enroll-sandbox`, data, );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const listEnrollmentReport = async (data: any) => {
  try {
    const response = await api.post(`custom-sandboxes/enrollment-report`, data, );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const isCustomSandboxRunningApi = async (data: any) => {
  try {
    const response = await api.post(`custom-sandboxes/live-report`, data, );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateSandboxTermination = async (data: any) => {
  try {
    const response = await api.put(`custom-sandboxes/update-sandbox-termination`, data, );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const endRunningSandbox = async (data:any,access_token: any) => {
  try {
    const resp = await axios({
      method: "post",
      url: `${playUrl}api/web/b2b/play-end-sandbox`,
      data: data,
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    });
    return resp.data;
  } catch (error) {
    return error;
  }
};