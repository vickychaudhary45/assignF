import { images } from "../../config/images";

export const SubscriptionPageProps = {
  course_page: {
    heading_block: {
      title: "Subscription",
      btn_link: "Advanced Filters",
      placeholder: "Search subcription...",
    },
    modal_default: {
      title: "Java Spring Framework basics course",
      subtitle: "Assign subscription(s) to teams/users",
      img: images.java,
      btn_complete: "Assign Complete",
      path_complete: "/",
      btn_cancel: "Cancel",
      path_cancel: "/",
      assign_block: {
        title: "Team Name",
        title_type: "Assign Type",
        star: "*",
        checkbox: [
          {
            txt: "Courses",
          },
          {
            txt: "Training Plans",
          },
        ],
      },
      manager_block: {
        title: "Assign to User",
        star: "*",
        placeholder: "Search User and add",
        label: "3 Users",
        list_item: [
          {
            src: images.activities4,
            name: (
              <>
                Tomas Lonsetteig <span>(tomas@internia.com)</span>
              </>
            ),
            iconclose: "icon-cross",
          },
          {
            src: images.activities3,
            name: (
              <>
                Ingrid Oline <span>(ingrid@internia.com)</span>
              </>
            ),
            iconclose: "icon-cross",
          },
          {
            src: images.activities6,
            name: (
              <>
                Arne Opheim <span>(arne@internia.com)</span>
              </>
            ),
            iconclose: "icon-cross",
          },
        ],
      },
      learning_block: {
        title: "Assign to Team",
        star: "*",
        placeholder: "Search Team and add",
        label: "3 Teams",
        list_item: [
          {
            title_txt: "AWS Certified Cloud Practitioner",
            img: images.team_img,
            iconclose: "icon-cross",
          },
          {
            title_txt: "Azure Network Engineer",
            img: images.team_img,
            iconclose: "icon-cross",
          },
          {
            title_txt: "Salesforce Certifications Learner",
            img: images.team_img,
            iconclose: "icon-cross",
          },
        ],
      },
    },
  },
  subscription_select_page: {
    heading_block: {
      title: "Subscription",
      btn_filter: "Advanced Filters",
      placeholder: "Search subscription…",
      btn_assign: "Assign to teams/users",
    },
    modal_default: {
      title: "You have selected a 5 Courses",
      subtitle: "Assign subscription(s) to teams/users",
      img: images.java,
      btn_complete: "Assign",
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
      manager_block: {
        title: "Assign to User",
        star: "*",
        placeholder: "Search User and add",
        label: " Users",
        list_item: [
          {
            src: images.activities4,
            name: (
              <>
                Tomas Lonsetteig <span>(tomas@internia.com)</span>
              </>
            ),
            iconclose: "icon-cross",
          },
          {
            src: images.activities3,
            name: (
              <>
                Ingrid Oline <span>(ingrid@internia.com)</span>
              </>
            ),
            iconclose: "icon-cross",
          },
          {
            src: images.activities6,
            name: (
              <>
                Arne Opheim <span>(arne@internia.com)</span>
              </>
            ),
            iconclose: "icon-cross",
          },
        ],
      },
      learning_block: {
        title: "Assign to Team",
        star: "*",
        placeholder: "Search Team and add",
        label: " Teams",
        list_item: [
          {
            title_txt: "AWS Certified Cloud Practitioner",
            img: images.team_img,
            iconclose: "icon-cross",
          },
          {
            title_txt: "Azure Network Engineer",
            img: images.team_img,
            iconclose: "icon-cross",
          },
          {
            title_txt: "Salesforce Certifications Learner",
            img: images.team_img,
            iconclose: "icon-cross",
          },
        ],
      },
    },
  },
};
export default SubscriptionPageProps;
