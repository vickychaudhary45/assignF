import { lazy } from "react";

export const routes = {
  index: {
    path: "/",
    component: lazy(() => import("../pages/LoginPage/LoginPage")),
    exact: true,
  },
  case_study: {
    path: "/case-study-page",
    component: lazy(() => import("../pages/CaseStudyPage/CaseStudyPage")),
    exact: true,
  },
  case_study_detail: {
    path: "/case-study-detail-page/:slug",
    component: lazy(() =>
      import("../pages/CaseStudyDetailPage/CaseStudyDetailPage")
    ),
    exact: true,
  },
  request_demo: {
    path: "/request-demo-page",
    component: lazy(() => import("../pages/RequestDemoPage/RequestDemoPage")),
    exact: true,
  },
  request_demo_visa: {
    path: "/visa/request-demo-page",
    component: lazy(() =>
      import("../pages/RequestDemoPage/RequestDemoPagePromote")
    ),
    exact: true,
  },
  request_demo_mastercard: {
    path: "/mastercard/request-demo-page",
    component: lazy(() =>
      import("../pages/RequestDemoPage/RequestDemoPagePromote")
    ),
    exact: true,
  },
  saml: {
    path: "/saml/accops/:token?",
    component: lazy(() => import("../pages/SamlLoginPage/SamlLoginPage")),
    exact: true,
  },
  login_page: {
    path: "/login",
    component: lazy(() => import("../pages/LoginPage/LoginPage")),
    exact: true,
  },
  login_page_slug: {
    path: "/login/:slug",
    component: lazy(() => import("../pages/LoginSlugPage/LoginSlugPage")),
    exact: true,
  },
  forget_page: {
    path: "/forgot-password",
    component: lazy(() =>
      import("../pages/ForgetPassWordPage/ForgetPassWordPage")
    ),
    exact: true,
  },
  custom_forget_page: {
    path: "/forgot-password/:slug",
    component: lazy(() =>
      import("../pages/CustomForgetPassWordPage/CustomForgetPassWordPage")
    ),
    exact: true,
  },
  reset_password: {
    path: "/password/reset",
    component: lazy(() => import("../pages/ResetPassword/ResetPassword")),
    exact: true,
  },
  custom_reset_password: {
    path: "/password/reset/:slug",
    component: lazy(() => import("../pages/CustomResetPassword/CustomResetPassword")),
    exact: true,
  },
  sso_signin: {
    path: "/sso/:token/:id",
    component: lazy(() => import("../pages/ssoSigin/ssosignin")),
    exact: true,
  },
  email_verification: {
    path: "/email/verification",
    component: lazy(() => import("../pages/EmailVerificationPage/EmailVerificationPage")),
    exact: true
  }
};

export const renderRoutes = Object.entries(routes);

export const privateroutes = {
  dashboard: {
    path: "/dashboard",
    component: lazy(() => import("../pages/Dashboard/Dashboard")),
    exact: true,
    menuname: "Dashboard",
  },
  teams: {
    path: "/teams",
    component: lazy(() => import("../pages/Teams/Teams")),
    exact: true,
    menuname: "Teams",
  },
  create_team: {
    path: "/create-team",
    component: lazy(() => import("../pages/CreateTeam/CreateTeam")),
    exact: true,
    menuname: "Teams",
  },
  Edit_team: {
    path: "/edit-team/:id",
    component: lazy(() => import("../pages/EditTeam/EditTeam")),
    exact: true,
    menuname: "Teams",
  },
  Team_Report: {
    path: "/team-report/:id",
    component: lazy(() => import("../pages/TeamReport/TeamReport")),
    exact: true,
    menuname: "Teams",
  },
  users: {
    path: "/users",
    component: lazy(() => import("../pages/Users/Users")),
    exact: true,
    menuname: "Users",
  },
  user_quick_view: {
    path: "/user-quick-view/:id",
    component: lazy(() => import("../pages/UserQuickView/UserQuickView")),
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
  create_learning: {
    path: "/create-learning",
    component: lazy(() => import("../pages/CreateLearning/CreateLearning")),
    exact: true,
    menuname: "Learning Path",
  },
  edit_learning: {
    path: "/edit-learning/:id",
    component: lazy(() => import("../pages/EditLearning/EditLearning")),
    exact: true,
    menuname: "Learning Path",
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
  newly_launched: {
    path: "/new-launch",
    component: lazy(() => import("../pages/NewLaunchPage/NewLaunchPage")),
    exact: true,
    menuname: "Newly Launched",
  },
  setting_page: {
    path: "/setting-page",
    component: lazy(() => import("../pages/SettingPage/SettingPage")),
    exact: true,
    menuname: "Settings",
  },
  support_page: {
    path: "/support-page",
    component: lazy(() => import("../pages/SupportPage/Support")),
    exact: true,
    menuname: "Support",
  },
  query_page: {
    path: "/query-page",
    component: lazy(() => import("../pages/UserQuery/UserQuery")),
    exact: true,
    menuname: "Support",
  },
  practice_test_page: {
    path: "/reports/practice-test",
    component: lazy(() => import("../pages/ReportsPage/PracticeTest")),
    exact: true,
    menuname: "Analytics",
  },
  live_lab_report_page: {
    path: "/reports/hands-on-labs",
    component: lazy(() => import("../pages/ReportsPage/HandsOnLabReport")),
    exact: true,
    menuname: "Analytics",
  },
  user_lab_behaviour_report_page: {
    path: "/reports/lab-behaviour-report",
    component: lazy(() =>
      import("../pages/UserBehaviourLabReport/UserBehaviourLabReport")
    ),
    exact: true,
    menuname: "Analytics",
  },
  user_sandbox_behaviour_report_page: {
    path: "/reports/sandbox-behaviour-report",
    component: lazy(() =>
      import("../pages/UserBehaviourSandboxReport/UserBehaviourSandboxReport")
    ),
    exact: true,
    menuname: "Analytics",
  },
  live_lab_report_dashboard: {
    path: "/reports/live-labs-dashboard",
    component: lazy(() =>
      import("../pages/LiveLabsDashboard/LiveLabsDashboard")
    ),
    exact: true,
    menuname: "Analytics",
  },
  live_sandbox_report_dashboard: {
    path: "/reports/sandbox-dashboard",
    component: lazy(() =>
      import("../pages/LiveSandboxDashboard/LiveSandboxDashboard")
    ),
    exact: true,
    menuname: "Analytics",
  },
  sandbox_report_page: {
    path: "/reports/sandbox",
    component: lazy(() => import("../pages/ReportsPage/SandboxReport")),
    exact: true,
    menuname: "Analytics",
  },
  online_test_page: {
    path: "/reports/video-course",
    component: lazy(() => import("../pages/ReportsPage/OnlineTest")),
    exact: true,
    menuname: "Analytics",
  },
  Enrollment_report_page: {
    path: "/reports/enrollment-report",
    component: lazy(() => import("../pages/ReportsPage/EnrollmentReport")),
    exact: true,
    menuname: "Analytics",
  },
  Certificate_report_page: {
    path: "/reports/certificate-report",
    component: lazy(() => import("../pages/ReportsPage/CertificateReport")),
    exact: true,
    menuname: "Analytics",
  },
  // <---- user-pages ----->
  home_user: {
    path: "/home-user",
    component: lazy(() => import("../pages/WhatIsNewPage/ReleaseNotesPage")),
    exact: true,
    menuname: "Release Notes",
  },
  courses_user_requested: {
    path: "/requested-courses",
    component: lazy(() =>
      import("../pages/RequestedCourses/RequestedCourses")
    ),
    exact: true,
    menuname: "Courses",
  },
  what_is_new: {
    path: "/release-notes",
    component: lazy(() => import("../pages/WhatIsNewPage/ReleaseNotesPage")),
    exact: true,
    menuname: "Release Notes",
  },
  enroll_users: {
    path: "/enroll-users",
    component: lazy(() => import("../pages/EnrollUsers/EnrollUsers")),
    exact: true,
    menuname: "Enroll Users",
  },
  workspaces_page: {
    path: '/workspaces',
    component: lazy(() => import('../pages/WorkspacesPage/WorksapcesPage')),
    exact: true,
    menuname: 'Workspaces',
  },
  custom_sandbox_page: {
    path: '/custom-sandboxes',
    component: lazy(() => import('../pages/CustomSandboxPage/CustomSandboxPage')),
    exact: true,
    menuname: 'Custom Sandboxes',
  },
  vm_page: {
    path: '/virtual-machines',
    component: lazy(() => import('../pages/VirtualMachine/VirtualMachine')),
    exact: true,
    menuname: 'VirtualMachine',
  },
};

export const privateRenderRoutes = Object.entries(privateroutes);
