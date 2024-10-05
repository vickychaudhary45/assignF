import api from '../axios-config/app'

export const getById = async (company_id : Number) => {
    const response = await api.get(`emailsettings/options?company_id=${company_id}`,);
    return response.data;
    }

export const updateNotification = async (formData:any) => {
    const response = await api.post(`emailsettings/options/update`, formData,);
    return response.data;
    }