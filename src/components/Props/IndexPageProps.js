import { images } from "../../config/images";


const answer = <p>Send us a <a href="https://business.whizlabs.com/request-demo-page">request here</a> to gain access to your admin account</p>

export const IndexPageProps = {
  banner: {
    title: "A technology playground to bring people together",
    subtitle:
      "We offer affordable world-class online certification training courses and practice tests for your teams.",
    btn_txt: "Learning Platform Overview",
    img: images.banner_img,
  },
  brandsection: {
    title: "We help grow these great brands",
    brands: [
      {
        img: images.accenture,
      },
      {
        img: images.infosys,
      },
      {
        img: images.campgemni,
      },
      {
        img: images.deloitte,
      },
      {
        img: images.fidelity,
      },
      {
        img: images.sopra,
      },
      {
        img: images.globel,
      },
      {
        img: images.airforce,
      },
      {
        img: images.wave,
      },
      {
        img: images.miami,
      },
      {
        img: images.pwc,
      },
      {
        img: images.parker,
      },
    ],
  },
  coursessection: {
    block: [
      {
        img: images.practice,
        title: "Practice Tests",
        para: "Practice tests are designed by experts to simulate the real exam scenario. Whizlabs prac-tice tests are based on the real exam objectives to check your preparation level, and get you ready for the certification exam.",
      },
      {
        img: images.console,
        title: "Online Courses",
        para: " Online courses are created by industry experts to help candidates enhance their skills and prepare them for the certification exams. Whizlabs online course covers all the exam ob-jectives, thus helps you pass the exam.",
      },
      {
        img: images.hand,
        title: "Hands-on Labs",
        para: "Hands-on labs provide learners with an opportunity to get hands-on with different cloud technologies and platforms. Whizlabs Hands-on labs offer a platform to have practical knowledge and gain real-time experience",
      },
    ],
  },
  globel_group: {
    title: "An authentic learning experience for your global employees",
    img: images.globelemp,
  },
  explore_group: {
    title: "Explore by Category",
    link: "Browse All",
    block: [
      {
        img: images.cloud,
        txt: "Cloud Computing",
        wlink: "/cloud-certification-training-courses/",
      },
      {
        img: images.devops,
        txt: "DevOps",
        wlink:"/devops-certifications/",
      },
      {
        img: images.javaimg,
        txt: "Java",
        wlink: "/oracle-java-certifications/",
      },
      {
        img: images.bigdata,
        txt: "Big Data",
        wlink: "/big-data-certifications/",
      },
      {
        img: images.chain,
        txt: "Blockchain",
        wlink: "/blockchain-certifications/",
      },
      {
        img: images.mngement,
        txt: "Project Management",
        wlink: "/project-management-certifications/",
      },
    ],
  },
  feature_group: {
    box: [
      {
        class_img: "image",
        class_cap: "caption",
        img: images.feature1,
        title: (
          <>
            More than <strong>1 Million +</strong> Satisfied learners
          </>
        ),
      },
      {
        class_cap: "caption",
        class_img: "image",
        title: (
          <>
            More than <strong>500+</strong> Companies trust us!
          </>
        ),
        img: images.feature2,
      },
    ],
  },
  faq_block: {
    title: "Frequently Asked Questions",
    accordion: [
      {
        head: "1. How much does Whizlabs complete access (site-wide) cost?",
        para: "Currently priced at $249 for a single user per year.",
      },
      {
        head: "2. What is the use/benefit of this platform?",
        para: "With Whizlabs Business Portal, admin can manage the users, host technology training courses, and reap the benefits of powerful analytics, enabling managers to know whether their personnel are making progress and performing well.",
      },
      {
        head: "3. How to get a Whizlabs Business account admin access?",
        // para: "Send us a" + <b>request here</b> + "to gain access to your admin account",
        para: <p>{answer}</p>,
      },
      
      {
        head: "4. Can I exchange the user account?",
        para: "It is possible to reassign unused subscriptions to another user account",
      },
      {
        head: "5. Can I add more users during my subscription?",
        para: "Yes, the portal gives you the flexibility and a complete freedom to add new users and assign them different courses as per your requirements. ",
      },
      {
        head: "6. How is the team plan different from my personal account on Whizlabs.com?",
        para: "Whizlabs Business Portal facilitates a learning environment for your team. The HR managers, Project Managers, Senior Managers, or an Administrator can now manage the learning requirements of a team under a single roof (Our Corporate Portal).",
      },
      {
        head: "7. What if some members of my team members are already a customer with Whizlabs?",
        para: "You can import the individual users into Business Portal, and now they will be visible to you with other new users as a single team.",
      },
      {
        head:"8. Do I have to pay for the corporate portal?",
        para:"Absolutely Not, we only charge for the subscriptions and the courses assigned to the users/team members.",
      },
      {
        head:"9. Can I deactivate any user?",
        para:"Yes, in case any user leaves the organization in the middle of the course program, you can deactivate the users and we won’t charge you.",
      },
      {
        head: "10. How do I make the payment?",
        para: "You can pay via credit card, debit card or wire transfer.",
      },
    ],
  },
};
