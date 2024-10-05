import api from "../axios-config/app";

export const getCaseStudy = async () => {
  try {
    const response = await api.get(
      `case-study/get-case-study`,
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getCaseStudyById = async (slug) => {
  try {
    const response = await api.get(
      `case-study/get-case-study-by-id/${slug}`,
    );
    return response;
  } catch (error) {
    return error;
  }
};
