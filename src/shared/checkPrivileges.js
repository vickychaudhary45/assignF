// import React, { useEffect, useState } from "react";
// import { getPermissions } from "src/services/role-privileges/services";
// import { parseJwt } from "src/config/utils";

// export const CheckPrivileges = (privilege) => {
//     const [privileges, setPrivileges] = useState([]);
//     const [isAccess, setIsAccess] = useState(false);
//     const user_data = JSON.parse(localStorage.getItem('user_data'));

//     const userInfo = parseJwt(user_data?.data.token);
//     let user_id = userInfo.userId;
//     async function fetchPermissions() {
//         const response = await getPermissions(user_id);
//         if (response.status === 'success') {
//             setPrivileges(response?.data);
//         }
//     }
//     useEffect(() => {
//         if (privileges.includes(privilege)) {
//             setIsAccess(true)
//         }
//     }, [privilege])
//     useEffect(() => {
//         fetchPermissions();
//     }, [])
//     return isAccess;
// }