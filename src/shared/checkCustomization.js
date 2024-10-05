import { useEffect, useState } from "react";
import { getB2BCompanyData } from "src/services/auth-services/services";
import { useParams, useHistory } from 'react-router-dom';

export const CheckCustomization = () => {
  const { slug } = useParams();
  const history = useHistory();
  const [enableLogin, setEnableLogin] = useState(0);
  const [customLogin, setCustomLogin] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await getB2BCompanyData(slug);
        setCustomLogin(res.data[0]);
        setEnableLogin(res.data[0].enable_custom_login);
        localStorage.setItem("custom_login", JSON.stringify(res.data[0]))
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [slug, history]);

  return { enableLogin, customLogin, isLoading };
};