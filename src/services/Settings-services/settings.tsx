import api from "../axios-config/app";


// user profile services
export const userProfile = async (userId:any) => {
    const response = await api.get(`settings/userProfile/${userId}`);
    return response.data;
};

export const updateUserProfile = async (userId:any, formData: any) => {
    const response = await api.post(`settings/userProfile/update/${userId}`, formData);
    return response.data;
}

export const updateCompanyInfo = async (userId:any, formData: any) => {
    const response = await api.post(`settings/companyInfo/update/${userId}`, formData);
    return response.data;
}

// password update service
export const changePassword = async (formData: any) => {
    const response = await api.post(`settings/changepassword`, formData);
    return response.data;
}

// States countries city data fetch
export const getCountries = async () => {
    const response = await api.get(`settings/countries`);
    return response.data;
}

export const getStates = async (country_id: number) => {
    const response = await api.get(`settings/states/${country_id}`);
    return response.data;
}

export const getCities = async (state_id: number) => {
    const response = await api.get(`settings/cities/${state_id}`);
    return response.data;
}

export const getIplocation = async () => {
    const response = await api.post(`settings/ip-loc`);
    return response.data;
}

