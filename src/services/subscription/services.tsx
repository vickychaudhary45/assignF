import api,{company_id} from "../axios-config/app";

export const getSubscription = async (search:any) => {
  try {
    const response = await api.get(`learning-path/list-subscription-bundles?company_id=${company_id}&search=${search}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const assignSubscription = async (formData: any) => {
  try {
    const response = await api.post(`learning-path/assign-subscriptions?company_id=${company_id}`, formData);
    return response.data;
  } catch (error) {
    return error;
  }
};
