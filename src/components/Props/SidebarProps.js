export const SidebarProps = {
  txt: '©' + new Date().getFullYear() + ', ',
  txt_link: 'Whizlabs Software Pvt. Ltd. All rights reserved.',
  links_first: [
    {
      nav_link: 'Dashboard',
      path: '/dashboard',
      path_employee: '/home-user',
      icon: 'icon icon-dashboard-nav',
    },
    {
      nav_link: 'Virtual Machines',
      path: '/virtual-machines',
      icon: 'icon icon-inbox-nav',
    },
    {
      nav_link: 'Enrollments',
      path: '/enroll-users',
      icon: 'icon icon-question',
    },
    {
      nav_link: 'Custom Environment',
      path: '/custom-environment',
      icon: 'icon icon-question',
      sub_nav_link: [
        {
          nav_link: 'Custom Sandboxes',
          path: '/custom-sandboxes',
          icon: 'icon icon-bundle-card',
        },
        {
          nav_link: 'Workspaces',
          path: '/workspaces',
          icon: 'icon icon-inbox-nav',
        },
      ],
    },
    {
      nav_link: 'Analytics',
      path: '/reports',
      icon: 'icon icon-analytics-nav',
      sub_nav_link: [
        {
          nav_link: 'Enrollment',
          path: '/reports/enrollment-report',
          icon: 'icon icon-bundle-card',
        },
        {
          nav_link: 'Practice Test',
          path: '/reports/practice-test',
          icon: 'icon icon-question',
        },
        {
          nav_link: 'Video Course',
          path: '/reports/video-course',
          icon: 'icon icon-play',
        },
        {
          nav_link: 'Labs',
          path: '/reports/hands-on-labs',
          icon: 'icon icon-lab',
        },
        {
          nav_link: 'Sandbox',
          path: '/reports/sandbox',
          icon: 'icon icon-quiz',
        },
        {
          nav_link: 'Certificate ',
          path: '/reports/certificate-report',
          icon: 'icon icon-select',
        },
      ],
    },
    {
      nav_link: 'Lab Monitors',
      path: '/reports',
      icon: 'icon icon-line-chart',
      sub_nav_link: [
        {
          nav_link: 'Live Labs Dashboard',
          path: '/reports/live-labs-dashboard',
          icon: 'icon icon-lab',
        },
        {
          nav_link: 'Live Sandbox Dashboard',
          path: '/reports/sandbox-dashboard',
          icon: 'icon icon-lab',
        },
        {
          nav_link: 'Labs User Behaviour',
          path: '/reports/lab-behaviour-report',
          icon: 'icon icon-line-chart',
        },
        {
          nav_link: 'Sandbox User Behaviour',
          path: '/reports/sandbox-behaviour-report',
          icon: 'icon icon-line-chart',
        },
        {
          nav_link: 'Labs Validation Report',
          path: '/reports/labs-validation-report',
          icon: 'icon icon-lab',
        },
      ],
    },
    {
      nav_link: 'Manage',
      path: '/manage',
      icon: 'icon icon-setting-nav',
      sub_nav_link: [
        {
          nav_link: 'Users',
          path: '/users',
          icon: 'icon icon-users-nav',
        },
        {
          nav_link: 'Teams',
          path: '/teams',
          icon: 'icon icon-teams-nav',
        },
        {
          nav_link: 'Create Learning Path',
          path: '/create-learning',
          icon: 'icon icon-learning-nav',
        },
        {
          nav_link: 'Requested Courses',
          path: '/requested-courses',
          icon: 'icon icon-training-nav',
        },
        {
          nav_link: 'Roles/Privileges',
          path: '/roles-privileges',
          icon: 'icon icon-role-nav',
        },
      ]
    },
  ],
  links_sec: [
    {
      nav_link: "Launched Courses",
      path: "/new-launch",
      icon: "icon icon-exclamation",
    },
    // {
    //   nav_link: "Support",
    //   path: "/support-page",
    //   icon: "icon icon-call-support",
    // },
    {
      nav_link: 'New Features',
      path: '/release-notes',
      icon: 'icon icon-hamburger',
    },
  ],
};
