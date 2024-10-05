export const RolesPageprops = {
  role_page: {
    heading_block: {
      title: "Roles/Privileges",
      placeholder: "Search role…",
      btn_filter: "Add New Role",
    },
    modal_delete: {
      title: "Please Confirm",
      para: (
        <>
          Are you sure you want to delete <span>“Learner”</span> Role? Are you
        </>
      ),
      btn_delete: "Yes, Delete",
      path_delete: "/",
      btn_cancel: "Cancel",
      path_cancel: "/",
      id: null
    },
    modal_quick_role: {
      title: "Assign this Learning Path to teams/users",
      btn_edit: "Edit Privileges",
      path_complete: "/",
      btn_cancel: "Cancel",
      path_cancel: "/",
      assign_block: {
        title: "Team Name",
        title_type: "Assign Type",
        star: "*",
        checkbox: [
          {
            txt: "Users",
          },
          {
            txt: "Teams",
          },
        ],
      },
      assign_role: {
        title: (
          <>
            Assign Privileges for Role<span>*</span>
          </>
        ),
        link_txt: " Privileges Assigned",
        check_box: [
          { label: "Create Learning Path" },
          { label: "Onboard Team" },
          { label: "Customize Mails" },
          { label: "Team Efforts Distrib." },
          { label: "Round Analytics" },
          { label: "Edit Learning Path" },
          { label: "Add/Remove User" },
          { label: "Assign Cours" },
          { label: "Create Team" },
          { label: "Create Training Plan" },
          { label: "View Report" },
          { label: "View Progress" },
          { label: "Add/Remove User" },
          { label: "Round Analytics" },
          { label: "Edit Learning Path" },
          { label: "Assign Cours" },
        ],
      },
    },
  },
  add_role_page: {
    assign_role: {
      title: (
        <>
          Assign Privileges for Role<span>*</span>
        </>
      ),
      link_txt: "+ Add Role",
      check_box: [
        { label: "Create Learning Path" },
        { label: "Onboard Team" },
        { label: "Customize Mails" },
        { label: "Team Efforts Distrib." },
        { label: "Round Analytics" },
        { label: "Edit Learning Path" },
        { label: "Add/Remove User" },
        { label: "Assign Cours" },
        { label: "Create Team" },
        { label: "Create Training Plan" },
        { label: "View Report" },
        { label: "View Progress" },
        { label: "Add/Remove User" },
        { label: "Round Analytics" },
        { label: "Edit Learning Path" },
        { label: "Assign Cours" },
      ],
    },
  },
  edit_role_page: {
    assign_role: {
      title: (
        <>
          Assign Privileges for Role<span>*</span>
        </>
      ),
      role_info: null,
      link_txt: "Edit -",
      check_box: [
        { label: "Create Learning Path" },
        { label: "Onboard Team" },
        { label: "Customize Mails" },
        { label: "Team Efforts Distrib." },
        { label: "Round Analytics" },
        { label: "Edit Learning Path" },
        { label: "Add/Remove User" },
        { label: "Assign Cours" },
        { label: "Create Team" },
        { label: "Create Training Plan" },
        { label: "View Report" },
        { label: "View Progress" },
        { label: "Add/Remove User" },
        { label: "Round Analytics" },
        { label: "Edit Learning Path" },
        { label: "Assign Cours" },
      ],
    },
  },
};
export default RolesPageprops;
