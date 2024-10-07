export const SidebarProps = {
  txt: "©" + new Date().getFullYear() + ", ",
  txt_link: "All rights reserved.",
  links_first: [
    {
      nav_link: "Dashboard",
      path: "/dashboard",
      path_employee: "/dashboard",
      icon: "icon icon-dashboard-nav",
    },
    {
      nav_link: "Feedback form",
      path: "/enroll-users",
      icon: "icon icon-question",
    },
    {
      nav_link: "Manage",
      path: "/manage",
      icon: "icon icon-setting-nav",
      sub_nav_link: [
        {
          nav_link: "Users",
          path: "/users",
          icon: "icon icon-users-nav",
        },
        {
          nav_link: "Roles/Privileges",
          path: "/roles-privileges",
          icon: "icon icon-role-nav",
        },
      ],
    },
  ],
};
