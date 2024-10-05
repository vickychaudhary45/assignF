import api, {company_id, user_id} from "../axios-config/app";


export const getReportCourses = async () => {
  try {
    const response = await api.get(`reports/list-report-courses?company_id=${company_id}&user_id=${user_id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getPTReportCourses = async () => {
  try {
    const response = await api.get(`reports/list-pt-courses?company_id=${company_id}&user_id=${user_id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getOCReportCourses = async () => {
  try {
    const response = await api.get(`reports/list-oc-courses?company_id=${company_id}&user_id=${user_id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getCourseQuizes = async (course_id: any) => {
  try {
    const response = await api.get(`reports/list-course-quiz?course_id=${course_id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getPracticeTest = async (formData: any) => {
  try {
    formData = {...formData, company_id: company_id}
    const response = await api.post(`reports/list-practice-report`, formData);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getOnlineTest = async (formData: any) => {
  try {
    formData = {...formData, company_id: company_id}
    const response = await api.post(`reports/list-online-report`, formData);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getCategory = async () =>{
  try{
    const response = await api.get(`reports/list-category`);
    return response.data;
  }catch(error){
    return error;
  }
}

export const listLiveLabReport = async (formData: any) => {
  try {
    const searchData = new URLSearchParams(formData).toString();
    const response = await api.get(`reports/list-live-lab-report?company_id=${company_id}&${searchData}&user_id=${user_id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getEnrollmentReport = async (formData: any) => {
  try {
    const searchData = {...formData, company_id, user_id}
    const response = await api.post(`reports/list-enrollment-report`, searchData);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const getCertificateReport = async (formData: any) => {
  try {
    formData = {...formData, company_id: company_id}
    const response = await api.post(`reports/list-certificate-report`, formData);
    return response.data;
  } catch (error) {
    return error;
  }
};
// company_id, team_id, rows = 15, page = 0, startdate = '', enddate = '', email = '' 

export const getTeamReportbyid = async (formData: any) => {
  try {
    const searchData = new URLSearchParams(formData).toString();
    const response = await api.get(`reports/list-enrollment-report-by-team?company_id=${company_id}&${searchData}&user_id=${user_id}`);
    return response.data;
  } catch (error) {
    return error;
  }
}

export const getTeamValues = async () => {
  try {
    const response = await api.get(`reports/list-teams-info?company_id=${company_id}`);
    return response.data;
  } catch (error) {
    return error;
  }
}

export const getTeamEmails = async (teamId: any) => {
  try {
    const response = await api.get(`reports/list-teams-emails-by-id?team_id=${teamId}`);
    return response.data;
  } catch (error) {
    return error;
  }
}