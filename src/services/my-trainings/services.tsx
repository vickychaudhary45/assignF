import api, {user_id} from "../axios-config/app";

export const getSubscriptionBundles = async (search: string) => {
  try {
    let searchQuery = '';
    if(search){
      searchQuery = `&search=${search}`
    }
    const response = await api.get(`my-trainings/list-subscription-bundles?user_id=${user_id}${searchQuery}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getLearningPaths = async (search: string) => {
  try {
    let searchQuery = '';
    if(search){
      searchQuery = `&search=${search}`
    }
    const response = await api.get(`my-trainings/user-learning-paths?user_id=${user_id}${searchQuery}`);
    return response.data;
  } catch (error) {
    return error;
  }
};


export const getLearningPathCourses = async (path_id:number ,page: number, rowsPerPage: number ,search: string) => {
  try {
    let searchQuery = '';
    if(search){
      searchQuery = `&search=${search}`
    }
    const response = await api.get(`my-trainings/learning-path-courses?page=${page}&per_page=${rowsPerPage}&path_id=${path_id}${searchQuery}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getUserSubscriptionCourses = async (plan_id: number,page: number, rowsPerPage: number, search: string) => {
  try {
    let searchQuery = '';
    if(search){
      searchQuery = `&search=${search}`
    }
    const response = await api.get(`my-trainings/list-subscription-courses?page=${page}&per_page=${rowsPerPage}&user_id=${user_id}&plan_id=${plan_id}${searchQuery}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getUserEnrollmentCourses = async (search: string) => {
  try {
    let searchQuery = '';
    if(search){
      searchQuery = `&search=${search}`
    }
    const response = await api.get(`my-trainings/list-enrollment-courses?user_id=${user_id}${searchQuery}`);
    return response.data;
  } catch (error) {
    return error;
  }
};


 