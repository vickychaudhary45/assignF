import api, {company_id} from "../axios-config/app";


export const getPrivileges = async () => {
  try {
    const response = await api.get("roles/capabilities/list",);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getRoles = async (page:number, rowsPerPage:number, search:string) => {
  try {
    let searchQuery = '';
    if(search){
      searchQuery = `&search=${search}`
    }
    const response = await api.get(`roles/list?company_id=${company_id}&page=${page}&per_page=${rowsPerPage}${searchQuery}`,);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getRoleById = async (id: any) => {
  try {
    const response = await api.get("roles/" + id,);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createRole = async (formData: any) => {
  const returnData = {
    data: null,
    status: false,
    msg: "",
  };
  try {
    const response = await api.post("roles/create", formData,);
    if (response.data && response.data.status === 'success') {
      returnData.data = response.data;
      returnData.status = response.data.status;
      returnData.msg = response.data.message;
    } else {
      returnData.msg = response.data.msg;
    }
    return returnData;
  } catch (error) {
    return returnData;
  }
};

export const updateRole = async (formData: {},id: any) => {
  const returnData = {
    data: null,
    status: false,
    message: "",
  };
  try {
    const response = await api.put("roles/update/"+id, formData,);
    if (response.data && response.data.status === 'success') {
      returnData.data = response.data;
      returnData.status = response.data.status;
      returnData.message = response.data.message;
    } else {
      returnData.message = response.data.msg;
    }
    return returnData;
  } catch (error) {
    return returnData;
  }
};

export const deleteRoles = async (id: any) => {
  try {
    const response = await api.delete("roles/delete/"+ id,);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getPermissions = async (userId: any) => {
  try {
    const response = await api.get(`users/privileges?user_id=${userId}`,);
    //If trail company and have time period over, redirect on login page.
    if (response.data.status === 'success') {
      let finalData = response.data.data;
      if(finalData?.is_trail){
          let trail_period_date = finalData?.trail_period;
          let dateTwo = trail_period_date;
          let date = new Date(); //Year, Month, Date 
          let dateOne = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' +
          ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear();
          if (dateOne > dateTwo) { 
            localStorage.removeItem('user_data');
            window.location.href = `/login`;
          }
      }
    }
    return response.data;
  } catch (error) {
    return error;
  }
};