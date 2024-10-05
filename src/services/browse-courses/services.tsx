import api,{company_id,user_id,user_data} from "../axios-config/app";
 
export const getCoursesToEnroll = async (user_id: number, formData: any) => {
  try {
    const searchData = new URLSearchParams(formData).toString();
    const response = await api.get(`courses/list-browse-courses?user_id=${user_id}&${searchData}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const requestToEnroll = async (params: any) => {
  try {
    const response = await api.post(`courses/request-to-enroll`, params);
    if (response.data && response.data.status === 200) {
      return response.data;
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

export const requestedCourses = async (params: any) => {
  try {

    const { page, rowsPerPage, searched } = params;
    let searchQuery = '';
    if (searched) {
      searchQuery = `&search=${searched}`
    }
    let user = '';
    // Not required to check this condition any more as now if user is having previlages to see all courses then he can see all courses requested by all users.
    // if (!user_data?.data?.is_owner) {
    //   user = `&user_id=${user_id}`
    // }
    const response = await api.get(`courses/requested-courses?company_id=${company_id}&page=${page}&per_page=${rowsPerPage}${searchQuery}${user}`);
    return response.data;
  } catch (error) {
    return error;
  }
}

