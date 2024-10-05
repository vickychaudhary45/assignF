import axios from "axios";
import api, { labUrl, labBackendUrl, user_data } from '../axios-config/app';
const aToken = user_data?.data?.token;


export const login = async (data: any) => {
  try {
    const response = await axios.post(labUrl + "api/web/login/user-authentication", (data = { user_token: aToken, pt: 2 }));
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getTaskNames = (data: any) => {
  try {
    const response = axios.post(labUrl + "api/web/b2b/get-task-names", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getCategoryNames = async (token: any) => {
  try {
    const response = await axios.get(labUrl + "api/web/b2b/get-category-names", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getUserLabReport = async (data: any) => {
  try {
    const response = await axios.post(`${labBackendUrl}/users/b2b/user-lab-report`, data, {
      headers: {
        Authorization: `${aToken}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getUserSandboxAttempts = async (data: any) => {
  try {
    const response = await axios.post(`${labBackendUrl}/users/b2b/user-sandbox-attempts`, data, {
      headers: {
        Authorization: `${aToken}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getUserSandboxReports = async (data: any) => {
  try {
    const response = await axios.post(`${labBackendUrl}/users/b2b/user-sandbox-report`, data, {
      headers: {
        Authorization: `${aToken}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getUserLabBehaviourReport = async (data: any) => {
  try {
    const response = await axios.post(`${labBackendUrl}/users/b2b/user-behaviour-labs`, data, {
      headers: {
        Authorization: `${aToken}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getUserSandboxBehaviourReport = async (data: any) => {
  try {
    const response = await axios.post(`${labBackendUrl}/users/b2b/user-behaviour-sandbox`, data, {
      headers: {
        Authorization: `${aToken}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getLiveLabsDashboard = async (data: any) => {
  try {
    const response = await axios.post(`${labBackendUrl}/users/b2b/labs-live-dashboard`, data, {
      headers: {
        Authorization: `${aToken}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getLabCredentials = async (data: any) => {
  try {
    const response = await axios.post(`${labBackendUrl}/labs/lab-credentials`, data, {
      headers: {
        Authorization: `${aToken}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getLiveSandboxDashboard = async (data: any) => {
  try {
    const response = await axios.post(`${labBackendUrl}/users/b2b/sandbox-live-dashboard`, data, {
      headers: {
        Authorization: `${aToken}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getSanboxCredentials = async (data: any) => {
  try {
    const response = await axios.post(`${labBackendUrl}/labs/sanbox-credentials`, data, {
      headers: {
        Authorization: `${aToken}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getCompanyUsers = async (data) => {
  try {
    const response = await api.post("/users/get_company_users", data);
    return response;
  } catch (error) {
    return error;
  }
};

export const getActivitiesDurationByEmails = (emails: any) => {
  try {
    return axios.post(labUrl + "api/web/b2b/get-activities-duration-by-emails", { emails });
  } catch (error) {
    return error;
  }
};

// Update user sandbox attempts API
export const updateSandboxAttempts = async (data: any) => {
  try {
    const response = await axios.post(`${labBackendUrl}/users/b2b/sandbox-update-attempts`, data, {
      headers: {
        Authorization: `${aToken}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Update user Sandbox Hours API
export const updateSandboxHours = async (data: any) => {
  try {
    const response = await axios.post(`${labBackendUrl}/users/b2b/sandbox-update-hours`, data, {
      headers: {
        Authorization: `${aToken}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Get User Sandbox access list API
export const getSandboxAccess = async () => {
  try {
    const response = await axios.get(`${labBackendUrl}/users/b2b/user-sandbox-access`, {
      headers: {
        Authorization: `${aToken}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Get Sandbox scope details API
export const getSandboxScope = async (sandbox_slug: any) => {
  try {
    const response = await axios.get(`${labBackendUrl}/users/b2b/sandbox-scope?sandbox_slug=${sandbox_slug}`, {
      headers: {
        Authorization: `${aToken}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Is Sandbox Running API
export const isSandboxRunningApi = async (access_token: any) => {
  try {
    const resp = await axios({
      method: "post",
      url: `${labUrl}api/web/play-sandbox/play-is-sandbox-running`,
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    });
    return resp.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Start Sandbox API
export const startSandboxApi = async (data: any) => {
  try {
    const resp = await axios({
      method: "post",
      url: `${labUrl}api/web/play-sandbox/play-create-sandbox`,
      data: data,
      headers: {
        authorization: `Bearer ${data?.access_token}`,
      },
    });
    return resp.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Update Sandbox API
export const updateSandboxApi = async (data: any) => {
  try {
    const resp = await axios({
      method: "post",
      url: `${labUrl}api/web/play-sandbox/play-update-sandbox`,
      data: data,
      headers: {
        authorization: `Bearer ${data?.access_token}`,
      },
    });
    return resp.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// End Sandbox API
export const endSandboxApi = async (data: any) => {
  try {
    const resp = await axios({
      method: "post",
      url: `${labUrl}api/web/play-sandbox/play-end-sandbox`,
      data: data,
      headers: {
        authorization: `Bearer ${data?.access_token}`,
      },
    });
    return resp.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
