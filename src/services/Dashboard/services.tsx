import api, { user_id, company_id } from "../axios-config/app";

export const getDashboardCount = async () => {
  try {
    const response = await api.get(`dashboard/counts?company_id=${company_id}`);
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const updateFeedbackForm = async (feedbackData: any) => {
  try {
    let bodyData = { ...feedbackData, userId: user_id, company_id: company_id };
    const response = await api.put(`dashboard/update-feedback-form`, bodyData);
    return response.data;
  } catch (error) {
    return error;
  }
};
// export const getFeedbackForm = async (feedbackData: any) => {
//   try {
//     let bodyData = { company_id: company_id };
//     const response = await api.get(`dashboard/get-feedback-form`, bodyData);
//     return response.data;
//   } catch (error) {
//     return error;
//   }
// };

export const getFeedbackForm = async (feedbackData: { company_id: string }) => {
  try {
    const response = await api.post(
      `dashboard/get-feedback-form`,
      feedbackData
    ); // Use POST to send body data
    return response.data;
  } catch (error) {
    console.error("Error fetching feedback form:", error);
    throw error; // Rethrow the error for further handling if needed
  }
};

// export const getFeedbackForm = async (company_id) => {
//   try {
//     const response = await api.get(`dashboard/get-feedback-form`, {
//       params: { company_id }, // Using params to send query parameters
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching feedback form:", error);
//     throw error; // Re-throw the error for handling in the calling component
//   }
// };
