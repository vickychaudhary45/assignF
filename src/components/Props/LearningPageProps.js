import { images } from '../../config/images';

export const LearningPageProps = {
  learning_Page: {
    heading_block: {
      title: 'Learning Paths',
      placeholder: 'Search Learning Path…',
      btn_filter: 'Create Learning Path',
    },
    modal_delete: {
      title: 'Please Confirm',
      id: null,
      para: (
        <>
          Are you sure you want to delete <span>“AWS Solution Architect”</span>{' '}
          Learning Path?
        </>
      ),
      btn_delete: 'Yes, Delete',
      path_delete: '/',
      btn_cancel: 'Cancel',
      path_cancel: '/',
    },
    modal_quick: {
      title: 'Quick View of Learning Path',
      subtitle: 'AWS Certified Cloud Practitioner',
      img: images.learning_img,
      btn_learning: 'Edit Learning Path',
      path_learning: '/',
      btn_cancel: 'Cancel',
      path_cancel: '/',
      courses_block: {
        title: ' Assign Courses',
        label: '10 Courses',
        list_item: [
          {
            src: images.awl,
            id: '',
            title_txt: 'AWS Certified Cloud Practitioner',
          },
          {
            src: images.java,
            id: '',
            title_txt: 'Java Spring Framework basics course',
          },
          {
            src: images.ansible,
            id: '',
            title_txt: 'Ansible Basics',
          },
          {
            src: images.lambda,
            id: '',
            title_txt: 'AWS Lambda and API Gateway',
          },
          {
            src: images.google,
            id: '',
            title_txt: 'Google Cloud Certified Associate Cloud Engineer',
          },
          {
            src: images.awl,
            id: '',
            title_txt: 'AWS Certified Cloud Practitioner',
          },
          {
            src: images.java,
            id: '',
            title_txt: 'Java Spring Framework basics course',
          },
          {
            src: images.ansible,
            id: '',
            title_txt: 'Ansible Basics',
          },
          {
            src: images.lambda,
            id: '',
            title_txt: 'AWS Lambda and API Gateway',
          },
          {
            src: images.google,
            id: '',
            title_txt: 'Google Cloud Certified Associate Cloud Engineer',
          },
        ],
      },
      learning_block: {
        title: 'Assign Learning Paths',
        label: '3 Learning Paths',
        list_item: [
          {
            id: '',
            title_txt: 'AWS Certified Cloud Practitioner',
            img: images.team_img,
          },
          {
            id: '',
            title_txt: 'Java Spring Framework basics course',
            img: images.team_img,
          },
          {
            id: '',
            title_txt: 'Ansible Basics',
            img: images.team_img,
          },
        ],
      },
    },
    modal_default: {
      title: 'AWS Certified Cloud Practitioner',
      subtitle: 'Assign this Learning Path to teams/users',
      img: images.learning_img,
      btn_complete: 'Assign Complete',
      path_complete: '/',
      btn_cancel: 'Cancel',
      path_cancel: '/',
      assign_block: {
        title: 'Team Name',
        title_type: 'Assign Type',
        star: '*',
        checkbox: [
          {
            txt: 'Users',
          },
          {
            txt: 'Teams',
          },
        ],
      },
      manager_block: {
        title: 'Assign to User',
        star: '*',
        placeholder: 'Search User and add',
        label: '3 Users',
        list_item: [
          {
            src: images.activities4,
            name: (
              <>
                Tomas Lonsetteig <span>(tomas@internia.com)</span>
              </>
            ),
            iconclose: 'icon-cross',
          },
          {
            src: images.activities3,
            name: (
              <>
                Ingrid Oline <span>(ingrid@internia.com)</span>
              </>
            ),
            iconclose: 'icon-cross',
          },
          {
            src: images.activities6,
            name: (
              <>
                Arne Opheim <span>(arne@internia.com)</span>
              </>
            ),
            iconclose: 'icon-cross',
          },
        ],
      },
      learning_block: {
        title: 'Assign to Team',
        star: '*',
        placeholder: 'Search Team and add',
        label: '3 Teams',
        list_item: [
          {
            id: '',
            title_txt: 'AWS Certified Cloud Practitioner',
            img: images.team_img,
            iconclose: 'icon-cross',
          },
          {
            id: '',
            title_txt: 'Azure Network Engineer',
            img: images.team_img,
            iconclose: 'icon-cross',
          },
          {
            id: '',
            title_txt: 'Salesforce Certifications Learner',
            img: images.team_img,
            iconclose: 'icon-cross',
          },
        ],
      },
    },
  },
  learning_select_page: {
    heading_block: {
      title: 'Learning Paths',
      placeholder: 'Search Learning Path…',
      btn_filter: 'Create Learning Path',
      btn_assign: 'Assign to teams/users',
    },
    modal_default: {
      title: 'You have selected a 5 learning paths',
      subtitle: 'Assign this Learning Path to teams/users',
      img: images.learning_img,
      btn_complete: 'Assign Learning Path',
      path_complete: '/',
      btn_cancel: 'Cancel',
      path_cancel: '/',
      assign_block: {
        title: 'Team Name',
        title_type: 'Assign Type',
        star: '*',
        checkbox: [
          {
            txt: 'Users',
          },
          {
            txt: 'Teams',
          },
        ],
      },
      manager_block: {
        title: 'Assign to User',
        star: '*',
        placeholder: 'Search User and add',
        label: ' Users',
        list_item: [
          {
            src: images.activities4,
            name: (
              <>
                Tomas Lonsetteig <span>(tomas@internia.com)</span>
              </>
            ),
            iconclose: 'icon-cross',
          },
          {
            src: images.activities3,
            name: (
              <>
                Ingrid Oline <span>(ingrid@internia.com)</span>
              </>
            ),
            iconclose: 'icon-cross',
          },
          {
            src: images.activities6,
            name: (
              <>
                Arne Opheim <span>(arne@internia.com)</span>
              </>
            ),
            iconclose: 'icon-cross',
          },
        ],
      },
      learning_block: {
        title: 'Assign to Team',
        star: '*',
        placeholder: 'Search Team and add',
        label: ' Teams',
        list_item: [
          {
            id: '',
            title_txt: 'AWS Certified Cloud Practitioner',
            img: images.team_img,
            iconclose: 'icon-cross',
          },
          {
            id: '',
            title_txt: 'Azure Network Engineer',
            img: images.team_img,
            iconclose: 'icon-cross',
          },
          {
            id: '',
            title_txt: 'Salesforce Certifications Learner',
            img: images.team_img,
            iconclose: 'icon-cross',
          },
        ],
      },
    },
    modal_delete: {
      title: 'Please Confirm',
      id: null,
      para: (
        <>
          Are you sure you want to delete <span>“AWS Solution Architect”</span>{' '}
          Learning Path?
        </>
      ),
      btn_delete: 'Yes, Delete',
      path_delete: '/',
      btn_cancel: 'Cancel',
      path_cancel: '/',
    },
    modal_quick: {
      title: 'Quick View of Learning Path',
      subtitle: 'AWS Certified Cloud Practitioner',
      img: images.learning_img,
      btn_learning: 'Edit Learning Path',
      path_learning: '/edit-learning/',
      btn_cancel: 'Cancel',
      path_cancel: '/',
      courses_block: {
        title: ' Assigned Courses',
        label: ' Courses',
        list_item: [
          {
            src: images.awl,
            id: '',
            title_txt: 'AWS Certified Cloud Practitioner',
          },
          {
            src: images.java,
            id: '',
            title_txt: 'Java Spring Framework basics course',
          },
          {
            src: images.ansible,
            id: '',
            title_txt: 'Ansible Basics',
          },
          {
            src: images.lambda,
            id: '',
            title_txt: 'AWS Lambda and API Gateway',
          },
          {
            src: images.google,
            id: '',
            title_txt: 'Google Cloud Certified Associate Cloud Engineer',
          },
          {
            src: images.awl,
            id: '',
            title_txt: 'AWS Certified Cloud Practitioner',
          },
          {
            src: images.java,
            id: '',
            title_txt: 'Java Spring Framework basics course',
          },
          {
            src: images.ansible,
            id: '',
            title_txt: 'Ansible Basics',
          },
          {
            src: images.lambda,
            id: '',
            title_txt: 'AWS Lambda and API Gateway',
          },
          {
            src: images.google,
            id: '',
            title_txt: 'Google Cloud Certified Associate Cloud Engineer',
          },
        ],
      },
      learning_block: {
        title: 'Assigned Subscription',
        label: ' Bundles',
        list_item: [
          {
            id: '',
            title_txt: 'AWS Certified Cloud Practitioner',
            img: images.team_img,
          },
          {
            id: '',
            title_txt: 'Java Spring Framework basics course',
            img: images.team_img,
          },
          {
            id: '',
            title_txt: 'Ansible Basics',
            img: images.team_img,
          },
        ],
      },
    },
  },
  create_learning_page: {
    title: 'Learning Path Name',
    title_type: 'Plan Type',
    star: '*',
    team_name_placeholder: 'E.g. AWS Solution Architect',
    checkbox: [
      {
        txt: 'Courses',
      },
      {
        txt: 'Subscriptions',
      }
    ],
    checkbox_add_bulk_user: [
      {
        txt: 'Courses',
      },
      {
        txt: 'Subscriptions',
      },
      {
        txt: 'Learning Paths'
      }
    ],
    courses_block: {
      title: ' Assign Courses',
      star: '*',
      placeholder: 'Search course and add',
      label: '10 Courses',
      list_item: [
        {
          src: images.awl,
          id: '',
          title_txt: 'AWS Certified Cloud Practitioner',
          iconclose: 'icon-cross',
        },
        {
          src: images.java,
          id: '',
          title_txt: 'Java Spring Framework basics course',
          iconclose: 'icon-cross',
        },
        {
          src: images.ansible,
          id: '',
          title_txt: 'Ansible Basics',
          iconclose: 'icon-cross',
        },
        {
          src: images.lambda,
          id: '',
          title_txt: 'AWS Lambda and API Gateway',
          iconclose: 'icon-cross',
        },
        {
          src: images.google,
          id: '',
          title_txt: 'Google Cloud Certified Associate Cloud Engineer',
          iconclose: 'icon-cross',
        },
        {
          src: images.awl,
          id: '',
          title_txt: 'AWS Certified Cloud Practitioner Second12',
          iconclose: 'icon-cross',
        },
        {
          src: images.java,
          id: '',
          title_txt: 'Java Spring Framework basics course 243275',
          iconclose: 'icon-cross',
        },
        {
          src: images.ansible,
          id: '',
          title_txt: 'Ansible Basics 589',
          iconclose: 'icon-cross',
        },
        {
          src: images.lambda,
          id: '',
          title_txt: 'API Gateway and AWS Lambda 1258',
          iconclose: 'icon-cross',
        },
        {
          src: images.google,
          id: '',
          title_txt: 'Google Cloud Certified Associate Cloud Engineer 235',
          iconclose: 'icon-cross',
        },
      ],
    },
    sequalize_block: {
      title: 'Course Sequence in the Learning Path',
      star: '*',
      list_item: [
        {
          src: images.awl,
          id: '',
          title_txt: 'AWS Certified Cloud Practitioner',
          iconclose: 'icon-cross',
        },
        {
          src: images.java,
          id: '',
          title_txt: 'Java Spring Framework basics course',
          iconclose: 'icon-cross',
        },
        {
          src: images.ansible,
          id: '',
          title_txt: 'Ansible Basics',
          iconclose: 'icon-cross',
        },
        {
          src: images.lambda,
          id: '',
          title_txt: 'AWS Lambda and API Gateway',
          iconclose: 'icon-cross',
        },
        {
          src: images.google,
          id: '',
          title_txt: 'Google Cloud Certified Associate Cloud Engineer',
          iconclose: 'icon-cross',
        },
        {
          src: images.awl,
          id: '',
          title_txt: 'AWS Certified Cloud Practitioner Second12',
          iconclose: 'icon-cross',
        },
        {
          src: images.java,
          id: '',
          title_txt: 'Java Spring Framework basics course 243275',
          iconclose: 'icon-cross',
        },
        {
          src: images.ansible,
          id: '',
          title_txt: 'Ansible Basics 589',
          iconclose: 'icon-cross',
        },
        {
          src: images.lambda,
          id: '',
          title_txt: 'API Gateway and AWS Lambda 1258',
          iconclose: 'icon-cross',
        },
        {
          src: images.google,
          id: '',
          title_txt: 'Google Cloud Certified Associate Cloud Engineer 235',
          iconclose: 'icon-cross',
        },
      ],
    },
    learning_block: {
      title: 'Add Subscription',
      star: '*',
      placeholder: 'Search Subscription and add',
      label: '3 Subscrip.',
      list_item: [
        {
          id: '',
          title_txt: 'AWS Certified Cloud Practitioner Subscription',
          iconlear: images.bundle_img,
          iconclose: 'icon-cross',
        },
        {
          id: '',
          title_txt: 'Java Spring Framework Subscription',
          iconlear: images.bundle_img,
          iconclose: 'icon-cross',
        },
        {
          id: '',
          title_txt: 'Ansible Basics Subscription',
          iconlear: images.bundle_img,
          iconclose: 'icon-cross',
        },
      ],
    },
  },
};
export default LearningPageProps;
