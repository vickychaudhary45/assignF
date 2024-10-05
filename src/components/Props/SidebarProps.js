export const SidebarProps = {
  txt: "©" + new Date().getFullYear() + ", ",
  txt_link: "All rights reserved.",
  links_first: [
    {
      nav_link: "Dashboard",
      path: "/dashboard",
      path_employee: "/home-user",
      icon: "icon icon-dashboard-nav",
    },
    {
      nav_link: "Fill feedback form",
      path: "/enroll-users",
      icon: "icon icon-question",
    },
    // {
    //   nav_link: "Analytics",
    //   path: "/reports",
    //   icon: "icon icon-analytics-nav",
    //   sub_nav_link: [
    //     {
    //       nav_link: "Enrollment",
    //       path: "/reports/enrollment-report",
    //       icon: "icon icon-bundle-card",
    //     },
    //   ],
    // },
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
