import api,{ user_id, company_id} from "../axios-config/app";

export const getLearningPaths = async (page, rowsPerPage, search) => {
  try {
    let searchQuery = '';
    if (search) {
      searchQuery = `&search=${search}`
    }
    const response = await api.get(`learning-path/list?company_id=${company_id}&page=${page}&per_page=${rowsPerPage}${searchQuery}`, );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const assignLearningPath = async (formData: any) => {
  try {
    const response = await api.post(`learning-path/assign-learning-path?company_id=${company_id}`, formData, );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getLearningPathById = async (id: number) => {
  try {
    const response = await api.get(`learning-path/single/${id}`, );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getLearningPathReport = async (id: number, page: number, rowsPerPage: number, search: string) => {
  try {
    let searchQuery = '';
    if (search) {
      searchQuery = `&search=${search}`
    }
    const response = await api.get(`learning-path/view-report/${id}?page=${page}&per_page=${rowsPerPage}${searchQuery}`, );
    return response.data;
  } catch (error) {
    return error;
  }
}

export const removeLearningPaths = async (id: number) => {
  try {
    const response = await api.delete(`learning-path/delete/${id}`, );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getCoursesToInclude = async (search = null) => {
  try {
    let searchQuery = '';
    if (search && search != 'true') {
      searchQuery = `&search=${search}`
    }
    const response = await api.get(`learning-path/list-courses?company_id=${company_id}${searchQuery}`, );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getSubscriptionsToInclude = async (search = null) => {
  try {
    let searchQuery = '';
    if (search && search != 'true') {
      searchQuery = `&search=${search}`
    }
    const response = await api.get(`learning-path/list-subscription-bundles?company_id=${company_id}${searchQuery}`, );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getSubscriptionListTeams = async (search = null) => {
  try {
    let searchQuery = '';
    if (search && search != 'true') {
      searchQuery = `&search=${search}`
    }
    const response = await api.get(`learning-path/list-team-subscription-bundles?company_id=${company_id}${searchQuery}`, );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getFinalSequalizeCourses = async (ids: any) => {
  try {
    const response = await api.post(`learning-path/list-sequalize-courses`, ids, );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createLearningPath = async (form_data: any, id: any = null) => {
  try {
    form_data.company_id = company_id;
    form_data.created_by = user_id;
    if (id) {
      const response = await api.put(`learning-path/update/${id}`, form_data, );
      return response.data;
    } else {
      const response = await api.post(`learning-path/create`, form_data, );
      return response.data;
    }
  } catch (error) {
    return error;
  }
};


