import api, {company_id, user_id} from "../axios-config/app";


export const getCourses = async (page: any, rowsPerPage: any, search: any, data: any) => {
  try {
    let searchQuery = '';
    if (search) {
      searchQuery = `&search=${search}`
    }
    const response = await api.get(`courses/list?page=${page}&per_page=${rowsPerPage}${searchQuery}&category=${data.category}&content=${data.content}&sort=${data.sortType}`, );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const assignCourses = async (formData: any) => {
  try {
    const response = await api.post(`courses/assign?company_id=${company_id}`, formData, );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const assignRequestedCourses = async (formData: any) => {
  try {
    const response = await api.post(`courses/assign-requested?company_id=${company_id}`, formData, );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getNewLaunchedCourses = async (search: any, company_id: any) => {
  try{
   let searchQuery = '';
   if (search) {
    searchQuery = `&search=${search}`
   }
   const response = await api.get(`courses/new-launch?${searchQuery}&company_id=${company_id}`, );
   return response.data;
  }
  catch (error) {
    return error;
  }
};

export const getUserEnrollmentDetails = async () =>{
  try{
    const response = await api.get(`courses//user-enrollment-details?user_id=${user_id}`, );
    return response.data;
  }
  catch (error) {
    return error;
  }
};


