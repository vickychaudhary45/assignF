import api, {company_id} from "../axios-config/app";


export const getTeams = async (page: any, per_page: any, searched: any, company_id: any) => {
  try {
    let searchQuery = '';
    if (searched) {
      searchQuery = `&search=${searched}`
    }
    const response = await api.get(`teams/all?page=${page}&per_page=${per_page}${searchQuery}&company_id=${company_id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getCourseTeams = async (search = null) => {
  try {
    let searchQuery = '';
    if (search) {
      searchQuery = `&search=${search}`
    }
    const response = await api.get(`teams/list-all-teams?company_id=${company_id}${searchQuery}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteTeam = async (id: any) => {
  try {
    const response = await api.delete("teams/delete/" + id);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateTeam = async (data: any) => {
  try {
    const response = await api.put("teams/update", data);
    return response;
  }
  catch (error) {
    return error;
  }
};

export const letsCreateTeam = async (formData: any) => {
  try {
    const response = await api.post("teams/create", formData);
    if (response.data) {
      return response.data;
    }
    return response.data.msg;
  } catch (error) {
    return error;
  }
}


export const getTeambyId = async (id: any) => {
  try {
    const response = await api.get("teams/get/" + id);
    return response.data;
  } catch (error) {
    return error;
  }
}

export const searchuser = async (searched: any, usertype: any) => {
  try {
    let type = '';
    let search = '';
    if (usertype) {
      type = '&type=' + usertype;
    }
    if(searched){
      search = '&search=' + searched;
    }
    const response = await api.get(`teams/searchuser?company_id=${company_id}${type}${search}`);
    if (response.data && response.data.status === 200) {
      return response.data;
    }
    return response;
  } catch (error) {
    return error;
  }
}