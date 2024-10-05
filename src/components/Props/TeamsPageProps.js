import { images } from "../../config/images";

export const TeamsPageProps = {
  teams_page: {
    heading_block: {
      title: "Teams",
      btn_link: "Create a Team",
      placeholder: "Search teams…",
    },
    modal_delect: {
      title: "Please Confirm",
      para: (
        <>
          Are you sure you want to delete <span>"Azure Network Engineer"</span>{" "}
          Teams?
        </>
      ),
      btn_delete: "Yes, Delete",
      path_delete: "/",
      btn_cancel: "Cancel",
      path_cancel: "/",
    },
  },
  create_team_page: {
    title: "Team Name",
    title_type: "Plan Type",
    star: "*",
    team_name_placeholder: "E.g. AWS Solution Architect",
    checkbox: [
      {
        txt: "Courses",
      },
      {
        txt: "Subscrip.",
      },
      {
        txt: "Learning Paths",
      },
    ],
    courses_block: {
      title: " Assign Courses",
      star: "*",
      placeholder: "Search course and add",
      label: "5 Courses",
      list_item: [
        {
          src: images.awl,
          title_txt: "AWS Certified Cloud Practitioner",
          iconclose: "icon-cross",
        },
        {
          src: images.java,
          title_txt: "Java Spring Framework basics course",
          iconclose: "icon-cross",
        },
        {
          src: images.ansible,
          title_txt: "Ansible Basics",
          iconclose: "icon-cross",
        },
        {
          src: images.lambda,
          title_txt: "AWS Lambda and API Gateway",
          iconclose: "icon-cross",
        },
        {
          src: images.google,
          title_txt: "Google Cloud Certified Associate Cloud Engineer",
          iconclose: "icon-cross",
        },
      ],
    },
    learning_block: {
      title: "Assign Learning Paths",
      star: "*",
      placeholder: "Search Learning Paths and add",
      label: "3 Learning Paths",
      list_item: [
        {
          title_txt: "AWS Certified Cloud Practitioner",
          src: images.learning_img,
          iconclose: "icon-cross",
        },
        {
          title_txt: "Java Spring Framework basics course",
          src: images.learning_img,
          iconclose: "icon-cross",
        },
        {
          title_txt: "Ansible Basics",
          src: images.learning_img,
          iconclose: "icon-cross",
        },
      ],
    },
    training_block: {
      title: "Assign Training Plans",
      star: "*",
      placeholder: "Search Training Plans and add",
      label: "3 Learning Paths",
      list_item: [
        {
          title_txt: "AWS Certified Cloud Practitioner",
          src: images.training_img,
          iconclose: "icon-cross",
        },
        {
          title_txt: "Java Spring Framework basics course",
          src: images.training_img,
          iconclose: "icon-cross",
        },
        {
          title_txt: "Ansible Basics",
          src: images.training_img,
          iconclose: "icon-cross",
        },
      ],
    },
    manager_block: {
      title: "Assign Manager",
      star: "*",
      placeholder: "Assign Manager by their name or email add…",
      label: "1 Manager",
      list_item: [
        {
          src: images.activities6,
          name: "Ronny Asmo",
          email_id: "ronny@internia.com",
          iconclose: "icon-cross",
        },
      ],
    },
    users_block: {
      title: "Assign Users",
      star: "*",
      placeholder: "Add a user by their name or email address",
      label: "13 Users",
      list_item: [
        {
          src: images.activities4,
          name: "Tomas Lonsetteig",
          email_id: "tomas@internia.com",
          iconclose: "icon-cross",
        },
        {
          src: images.activities4,
          name: "John Smith",
          email_id: "john@internia.com",
          iconclose: "icon-cross",
        },
        {
          src: images.activities4,
          name: "Arne Opheim",
          email_id: "arne@internia.com",
          iconclose: "icon-cross",
        },
        {
          src: images.activities4,
          name: "Ronny Asmo",
          email_id: "ronny@internia.com",
          iconclose: "icon-cross",
        },
        {
          src: images.activities4,
          name: "Kathrine Lonsetteig",
          email_id: "tomas@internia.com",
          iconclose: "icon-cross",
        },
        {
          src: images.activities4,
          name: "Androw Smith",
          email_id: "androw@internia.com",
          iconclose: "icon-cross",
        },
        {
          src: images.activities4,
          name: "Ingrid Oline",
          email_id: "ingrid@internia.com",
          iconclose: "icon-cross",
        },
        {
          src: images.activities4,
          name: "Simong Ng",
          email_id: "simong@internia.com",
          iconclose: "icon-cross",
        },
        {
          src: images.activities4,
          name: "Ingrid Oline",
          email_id: "ingrid@internia.com",
          iconclose: "icon-cross",
        },
        {
          src: images.activities4,
          name: "Simong Ng",
          email_id: "simong@internia.com",
          iconclose: "icon-cross",
        },
        {
          src: images.activities4,
          name: "Arne Opheim",
          email_id: "arne@internia.com",
          iconclose: "icon-cross",
        },
        {
          src: images.activities4,
          name: "Ronny Asmo",
          email_id: "ronny@internia.com",
          iconclose: "icon-cross",
        },
        {
          src: images.activities4,
          name: "Kathrine Lonsetteig",
          email_id: "tomas@internia.com",
          iconclose: "icon-cross",
        },
      ],
    },
  },
  edit_team_page: {
    title: "Team Name",
    title_type: "Assign Type",
    star: "*",
    team_name_placeholder: "E.g. AWS Solution Architect",
    checkbox: [
      {
        txt: "Courses",
      },
      {
        txt: "Training Plans",
      },
      {
        txt: "Learning Paths",
      },
      {
        txt: "Subscrip.",
      },
    ],
    courses_block: {
      title: " Assign Courses",
      star: "*",
      placeholder: "Search course and add",
      label: "5 Courses",
      list_item: [
        {
          src: images.awl,
          title_txt: "AWS Certified Cloud Practitioner",
          iconclose: "icon-cross",
        },
        {
          src: images.java,
          title_txt: "Java Spring Framework basics course",
          iconclose: "icon-cross",
        },
        {
          src: images.ansible,
          title_txt: "Ansible Basics",
          iconclose: "icon-cross",
        },
        {
          src: images.lambda,
          title_txt: "AWS Lambda and API Gateway",
          iconclose: "icon-cross",
        },
        {
          src: images.google,
          title_txt: "Google Cloud Certified Associate Cloud Engineer",
          iconclose: "icon-cross",
        },
      ],
    },
    learning_block: {
      title: "Assign Learning Paths",
      star: "*",
      placeholder: "Search Learning Paths and add",
      label: "3 Learning Paths",
      list_item: [
        {
          title_txt: "AWS Certified Cloud Practitioner",
          src: images.learning_img,
          iconclose: "icon-cross",
        },
        {
          title_txt: "Java Spring Framework basics course",
          src: images.learning_img,
          iconclose: "icon-cross",
        },
        {
          title_txt: "Ansible Basics",
          src: images.learning_img,
          iconclose: "icon-cross",
        },
      ],
    },
    training_block: {
      title: "Assign Training Plans",
      star: "*",
      placeholder: "Search Training Plans and add",
      label: "3 Learning Paths",
      list_item: [
        {
          title_txt: "AWS Certified Cloud Practitioner",
          src: images.training_img,
          iconclose: "icon-cross",
        },
        {
          title_txt: "Java Spring Framework basics course",
          src: images.training_img,
          iconclose: "icon-cross",
        },
        {
          title_txt: "Ansible Basics",
          src: images.training_img,
          iconclose: "icon-cross",
        },
      ],
    },
    manager_block: {
      title: "Assign Manager",
      star: "*",
      placeholder: "Assign Manager by their name or email add…",
      label: "1 Manager",
      list_item: [
        {
          src: images.activities6,
          name: "Ronny Asmo",
          email_id: "ronny@internia.com",
          iconclose: "icon-cross",
        },
      ],
    },
    users_block: {
      title: "Assign Users",
      star: "*",
      placeholder: "Add a user by their name or email address",
      label: "13 Users",
      list_item: [
        {
          src: images.activities4,
          name: "Tomas Lonsetteig",
          email_id: "tomas@internia.com",
          iconclose: "icon-cross",
        },
        {
          src: images.activities4,
          name: "John Smith",
          email_id: "john@internia.com",
          iconclose: "icon-cross",
        },
        {
          src: images.activities4,
          name: "Arne Opheim",
          email_id: "arne@internia.com",
          iconclose: "icon-cross",
        },
        {
          src: images.activities4,
          name: "Ronny Asmo",
          email_id: "ronny@internia.com",
          iconclose: "icon-cross",
        },
        {
          src: images.activities4,
          name: "Kathrine Lonsetteig",
          email_id: "tomas@internia.com",
          iconclose: "icon-cross",
        },
        {
          src: images.activities4,
          name: "Androw Smith",
          email_id: "androw@internia.com",
          iconclose: "icon-cross",
        },
        {
          src: images.activities4,
          name: "Ingrid Oline",
          email_id: "ingrid@internia.com",
          iconclose: "icon-cross",
        },
        {
          src: images.activities4,
          name: "Simong Ng",
          email_id: "simong@internia.com",
          iconclose: "icon-cross",
        },
        {
          src: images.activities4,
          name: "Ingrid Oline",
          email_id: "ingrid@internia.com",
          iconclose: "icon-cross",
        },
        {
          src: images.activities4,
          name: "Simong Ng",
          email_id: "simong@internia.com",
          iconclose: "icon-cross",
        },
        {
          src: images.activities4,
          name: "Arne Opheim",
          email_id: "arne@internia.com",
          iconclose: "icon-cross",
        },
        {
          src: images.activities4,
          name: "Ronny Asmo",
          email_id: "ronny@internia.com",
          iconclose: "icon-cross",
        },
        {
          src: images.activities4,
          name: "Kathrine Lonsetteig",
          email_id: "tomas@internia.com",
          iconclose: "icon-cross",
        },
      ],
    },
  },

  message_alert: {
    type_msg: {
      class: "success",
      txt: "Successfully delete the “Azure Network Engineer” Team.",
    },
  },
};
export default TeamsPageProps;
