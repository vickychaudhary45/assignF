import release_notes_ss_users from '../../assets/images/release_notes_ss_users.png';
import release_notes_ss_teams from '../../assets/images/release_notes_ss_teams.png';
import release_notes_ss_learning_path from '../../assets/images/release_notes_ss_learning_path.png';
import release_notes_ss_sidebar_menu_update from '../../assets/images/release_notes_ss_sidebar_menu_update.png';
import release_notes_ss_new_menu from '../../assets/images/release_notes_ss_new_menu.png';
import release_notes_ss_end_user_changes from '../../assets/images/release_notes_ss_end_user_changes.png';
import release_notes_ss_my_training from '../../assets/images/release_notes_ss_my_training.png';
import release_notes_ss_library from '../../assets/images/release_notes_ss_library.png';
import release_notes_ss_analytics from '../../assets/images/release_notes_ss_analytics.png';
import release_notes_ss_whats_new from '../../assets/images/release_notes_ss_whats_new.png';
import release_notes_ss_setting_menu from '../../assets/images/release_notes_ss_setting_menu.png';
import release_notes_ss_settings from '../../assets/images/release_notes_ss_settings.png';
import release_notes_ss_improved_dark_mode from '../../assets/images/release_notes_ss_improved_dark_mode.png';

export const releaseNotesHeading = [
  {
    name: 'Admin Changes',
  },
  {
    name: 'End User Changes',
  },
  {
    name: "What's New",
  },
  {
    name: 'Settings Menu',
  },
];
export const releaseNotesModalData = [
  {
    Heading: 'Admin Changes:',
    list: [
      {
        listHeading: 'Enabled Hyperlinks to Table Records:',
        listBody: [
          { name: 'Users List', image: release_notes_ss_users },
          { name: 'Teams List', image: release_notes_ss_teams },
          { name: 'Learning Paths', image: release_notes_ss_learning_path },
        ],
      },
      {
        listHeading: 'Sidebar Menu Update:',
        listBody: [
          {
            name: 'Removed "My Trainings" from the sidebar menu',
          },
          {
            image: release_notes_ss_sidebar_menu_update,

            name: 'Access content in the LMS is now available via the "My Trainings" button in the Header',
          },
        ],
      },
      {
        listHeading: 'New Menu: "New Updates"',
        listBody: [
          {
            image: release_notes_ss_new_menu,

            name: 'Stay informed about new updates, bug fixes, and improvements in one centralized location',
          },
        ],
      },
    ],
  },
  {
    Heading: 'End User Changes:',
    list: [
      {
        listHeading: 'Improved Learning Management System:',
        listBody: [
          {
            image: release_notes_ss_end_user_changes,

            name: 'After login, users will now experience a newly improved LMS interface',
          },
        ],
      },
      {
        listHeading: 'New Header Menus:',
        listBody: [
          {
            name: 'My Trainings:',
            subList: [
              {
                name: 'Displays content assigned to the end user by the admin',
                image: release_notes_ss_my_training,
              },
            ],
          },
          {
            name: 'Library:',
            subList: [
              {
                image: release_notes_ss_library,

                name: 'Allows users to view the Course Library and request enrollment in listed courses.',
              },
            ],
          },
          {
            name: 'Analytics:',
            subList: [
              {
                image: release_notes_ss_analytics,

                name: 'Content reports are now under the Analytics section, where users can check their progress and related data',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    Heading: "What's New:",
    list: [
      {
        listBody: [
          {
            name: 'After login, users will now experience a newly improved LMS interface',
          },
          {
            name: 'Stay up-to-date with new content releases and request enrollment',
            image: release_notes_ss_whats_new,
          },
        ],
      },
    ],
  },
  {
    Heading: 'Settings Menu:',
    list: [
      {
        listBody: [
          {
            name: 'Accessible from the Header menu dropdown as "Account Settings"',
            image: release_notes_ss_setting_menu,
          },
          {
            name: 'Users can update their profile or change passwords conveniently',
            image: release_notes_ss_settings,
          },
        ],
      },
    ],
  },
  {
    Heading: 'Improved Dark Mode:',
    list: [
      {
        listBody: [
          {
            name: 'Accessible from the Header menu dropdown as "Account Settings"',
            image: release_notes_ss_improved_dark_mode,
          },
        ],
      },
    ],
  },
];

export const adminUpdateProps = [
  {
    name: 'Improved Sidebar navigation',
  },
  {
    name: 'Added new menus to Profile Menu dropdown',
  },
  {
    name: 'Improved Support Tickets Generation For Non-Whitelabelled Portals highlighting detailed information',
  },
  {
    name: 'Added New Menu “Enrollments” to Sidebar for Learning Paths, Courses and Subscriptions',
  },
];
