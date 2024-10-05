import React, { useEffect, useState } from "react";
import { getPermissions } from "src/services/role-privileges/services";

export const CheckPrivileges = () => {
  const [privileges, setPrivileges] = useState([]);
  const [isLoadingPrivileges, setIsLoadingPrivileges] = useState(true);
  const user_data = JSON.parse(localStorage.getItem("user_data"));

  const userInfo = parseJwt(user_data?.data.token);
  let user_id = userInfo.userId;
  async function fetchPermissions() {
    setIsLoadingPrivileges(true);
    const response = await getPermissions(user_id);
    if (response.status === "success") {
      setPrivileges(response?.data);
      localStorage.setItem("privilegesInfo", JSON.stringify(response?.data));
      setIsLoadingPrivileges(false);
    }
  }
  useEffect(() => {
    fetchPermissions();
  }, []);
  return { privileges, isLoadingPrivileges };
};

export const parseJwt = (token) => {
  if (!token) {
    window.location.href = `/login`;
    // return <Redirect to={{ pathname: '/dashboard' }} />;
  }
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const isLoggedIn = (token) => {
  const user_data = JSON.parse(localStorage.getItem("user_data"));
  if (user_data && parseJwt(user_data?.data.token)) {
    return true;
  } else {
    return false;
  }
};
