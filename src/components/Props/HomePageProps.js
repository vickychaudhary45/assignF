import { images } from "../../config/images";

export const HomePageProps = {
  title: (
    <>
      Welcome Back, <span>John</span>
    </>
  ),
  left_column: {
    user_box: {
      user: [
        { nub: "741", txt: "Total Enrolled Users" },
        { nub: "12", txt: "Active Users" },
        { nub: "32", txt: "Idle Users" },
      ],
    },
    report_group: {
      report: [
        { txt: "Practice Test Report", icon: 'icon icon-quiz', link: '/reports/practice-test'},
        { txt: "Video Course Report", icon: 'icon icon-play',  link: '/reports/video-course' },
        { txt: "Hands-on labs Report", icon: 'icon icon-lab',link: '/reports/hands-on-labs'},
        { txt: "Sandbox Report", icon: 'icon icon-inbox-nav',link: '/reports/sandbox'},
      ],
    },
    view_block: {
      box: [
        {
          avatar1: images.learners11,
          avatar2: images.learners12,
          avatar3: images.learners13,
          label: "Top learners",
          link: "View all",
        },
        {
          avatar1: images.learners11,
          avatar2: images.learners12,
          avatar3: images.learners13,
          label: "Top learners",
          link: "View all",
        },
      ],
    },
    activity: {
      heading: "Recent Activities",
      list: [
        {
          img: images.activities1,
          name: "user-detail",
          txt: "Getting Familiar with AWS Console…",
          attempt: "Attempt 01",
          result: "60% Failed",
          date: "4 Min. ago",
          status: "failblock",
        },
        {
          img: images.activities2,
          name: "Kathrine Lonsetteig",
          txt: "Setting up free-tier AWS account…",
          attempt: "Attempt 01",
          result: "In Progress",
          date: "2 Hours ago",
          status: "Progressblock",
        },
        {
          img: images.activities3,
          name: "Arne Opheim",
          txt: "Why Cloud Computing?…",
          attempt: "Attempt 02",
          result: "80% Pass",
          date: "1 Day ago",
          status: "passblock",
        },
        {
          img: images.activities4,
          name: "Ingrid Oline",
          txt: "Setting up free-tier AWS account…",
          attempt: "Attempt 03",
          result: "90% Pass",
          date: "2 Days ago",
          status: "passblock",
        },
        {
          img: images.activities5,
          name: "Simong Ng",
          txt: "AWS Certified Solutions Architect…",
          attempt: "Attempt 01",
          result: "30% Failed",
          date: "1 Week ago",
          status: "failblock",
        },
        {
          img: images.activities6,
          name: "John Smith",
          txt: "Getting Familiar with AWS Console…",
          attempt: "Attempt 01",
          result: "In Progress",
          date: "2 Months ago",
          status: "Progressblock",
        },
      ],
    },
  },
  right_column: {
    course: {
      title: "Top 5 Online Courses",
      link: "View all",
      online_courses: [
        {
          nub: "01",
          team: "AWS Solution Architect",
        },
        {
          nub: "02",
          team: "Google Cloud Certified Assoc…",
        },
        {
          nub: "03",
          team: "Apache Kafka Fundamentals…",
        },
        {
          nub: "04",
          team: "AWS Certified Cloud Practiti…",
        },
        {
          nub: "05",
          team: "Snowflake SnowPro Core Cert…",
        },
      ],
    },
    practice: {
      title: "Top 5 Practice Tests",
      link: "View all",
      online_Practice: [
        {
          nub: "01",
          team: "AWS Solution Architect",
        },
        {
          nub: "02",
          team: "Google Cloud Certified Assoc…",
        },
        {
          nub: "03",
          team: "Apache Kafka Fundamentals…",
        },
        {
          nub: "04",
          team: "AWS Certified Cloud Practiti…",
        },
        {
          nub: "05",
          team: "Snowflake SnowPro Core Cert…",
        },
      ],
    },
    payments: {
      title: "Due payments",
      price: "$300",
      label: "Total payable amount",
      btn: "Pay Now",
    },
  },
};
