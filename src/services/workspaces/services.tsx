import axios from "axios";
import api, {labUrl} from "../axios-config/app";


export const getWorkSpaces = (data: any) => {
  try {
    const response = axios.post(labUrl + "api/web/b2b/play-fetch-workspaces", data, {
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

export const getUsers = async (searched, company_id ) => {
try {
    let searchQuery = '';
    if (searched) {
    searchQuery = `&search=${searched}`
    }
    const response = await api.get(`workspaces/users?company_id=${company_id}${searchQuery}`,);
    return response.data;
} catch (error) {
    return error;
}
};

export const runningWorkSpaces = async (data: any) => {
  try {
    const response = await api.post("workspaces/list", data,)
    return response;
  } catch (error) {
    return error;
  }
}

export const createWorkspace  = async (data: any) => {
  try {
    const response = await api.post("workspaces/create", data,)
    return response;
  } catch (error) {
    return error;
  }
}

export const TerminateWorkspace  = async (data: any) => {
  try {
    const response = await api.post("workspaces/terminate", data,)
    return response;
  } catch (error) {
    return error;
  }
}