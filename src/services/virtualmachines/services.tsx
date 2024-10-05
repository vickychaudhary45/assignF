import axios from "axios";
import api, {labUrl} from "../axios-config/app";

export const getVMUsers = async (searched, company_id ) => {
try {
    let searchQuery = '';
    if (searched) {
    searchQuery = `&search=${searched}`
    }
    const response = await api.get(`virtual-machine/users?company_id=${company_id}${searchQuery}`);
    return response.data;
} catch (error) {
    return error;
}
};

export const runningVMs = async (data: any) => {
  try {
    const response = await axios.post(labUrl + "api/web/b2b/play-get-running-sandboxes", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
}

export const enrollVM  = async (data: any) => {
  try {
    const response = await api.post("virtual-machine/enroll", data,)
    return response;
  } catch (error) {
    return error;
  }
}

export const terminateVM  = async (data: any) => {
  try {
    const response = await api.post("virtual-machine/terminate", data,)
    return response;
  } catch (error) {
    return error;
  }
}

export const VMenrollments = async (data: any) => {
  try {
    const response = await api.get(`virtual-machine/enrollments?company_id=${data.company_id}`, )
    return response;
  } catch (error) {
    return error;
  }
}