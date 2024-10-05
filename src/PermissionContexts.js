import { createContext, useEffect, useState } from 'react';
import { getPermissions } from "src/services/role-privileges/services";
import { parseJwt } from "src/config/utils";
import { useAppState } from './stateManagement';

export const PermissionContexts = createContext();

export const CheckPrivileges = ({ children }) => {
  const [privileges, setPrivileges] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state: App, update: AppUpdate } = useAppState();

  const user_data = JSON.parse(localStorage.getItem('user_data'));
  const userInfo = parseJwt(user_data?.data.token);
  let user_id = userInfo.userId;

  async function fetchPermissions() {
    setLoading(true);
    AppUpdate("ISLOADINGPRIVILEGES", true);
    const response = await getPermissions(user_id);
    if (response.status === 'success') {
      localStorage.setItem("privilegesInfo", JSON.stringify(response?.data));
      AppUpdate("PRIVILEGES", response?.data)
      AppUpdate("ISLOADINGPRIVILEGES", false);
      setPrivileges(response?.data);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchPermissions();
  }, [])
  return (<PermissionContexts.Provider value={{ privileges, setPrivileges, loading, setLoading }}>{children}</PermissionContexts.Provider>);
}