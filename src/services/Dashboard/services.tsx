import api, {user_id,company_id} from "../axios-config/app";

export const getDashboardCount = async () => {
  try {
    const response = await api.get(`dashboard/counts?company_id=${company_id}`,);
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const updateFeedbackForm = async (feedbackData: any) => {
  try {
    let bodyData = { ...feedbackData, userId: user_id, company_id: company_id }
    const response = await api.put(`dashboard/update-feedback-form`, bodyData,);
    return response.data;
  }
  catch (error) {
    return error;
  }
};
