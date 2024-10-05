import { lazy } from "react";

export const routes = {
  index: {
    path: "/",
    component: lazy(() => import("../pages/LoginPage/LoginPage")),
    exact: true,
  },
  login_page: {
    path: "/login",
    component: lazy(() => import("../pages/LoginPage/LoginPage")),
    exact: true,
  },
};

export const renderRoutes = Object.entries(routes);

export const privateroutes = {
  dashboard: {
    path: "/dashboard",
    component: lazy(() => import("../pages/Dashboard/Dashboard")),
    exact: true,
    menuname: "Dashboard",
  },

  users: {
    path: "/users",
    component: lazy(() => import("../pages/Users/Users")),
    exact: true,
    menuname: "Users",
  },
  add_user: {
    path: "/add-user",
    component: lazy(() => import("../pages/AddUser/AddUser")),
    exact: true,
    menuname: "Users",
  },
  edit_user: {
    path: "/edit-user/:id",
    component: lazy(() => import("../pages/EditUser/EditUser")),
    exact: true,
    menuname: "Users",
  },
  roles_privileges: {
    path: "/roles-privileges",
    component: lazy(() => import("../pages/RolesPrivileges/RolesPrivileges")),
    exact: true,
    menuname: "Roles",
  },
  add_roles_privileges: {
    path: "/add-roles-privileges",
    component: lazy(() => import("../pages/AddRoles/AddRoles")),
    exact: true,
    menuname: "Roles",
  },
  edit_roles_privileges: {
    path: "/edit-roles-privileges/:id",
    component: lazy(() => import("../pages/EditRoles/EditRoles")),
    exact: true,
    menuname: "Roles",
  },
  // <---- user-pages ----->
  enroll_users: {
    path: "/enroll-users",
    component: lazy(() => import("../pages/EnrollUsers/EnrollUsers")),
    exact: true,
    menuname: "Enroll Users",
  },
};

export const privateRenderRoutes = Object.entries(privateroutes);
