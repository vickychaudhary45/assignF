import { images } from "../../config/images";

export const RequestDemoPageProps = {
  left_side: {
    img: images.logo_white,
    title:
      " Hear from us why world’s leading organizations choose Whizlabs Business to train their employees.",
    label: "In your demo, learn about:",
    demo_learn: [
      {
        txt: "How our training platform help your team to learn and grow in their career",
      },
      {
        txt: "Quality of the content and how we develop them to meet your needs",
      },
      {
        txt: "Live demo of Video Course, Practice Exams and Hands-on Labs",
      },
      {
        txt: "Live demo of how to use Whizlabs Business to manage and track your employees progress",
      },
    ],
  },

  thankyou: {
    img: images.right_img,
    title: "Thank you for requesting a demo",
    para: "You are very important to us, all information received will always remain confidential. We will contact you in 24hrs.",
    btn_txt: (
      <>
        Back to <strong>Whizlabs Business</strong>
      </>
    ),
  },
  emailverification: {
    img: images.right_img,
    title: "Thank you for verifying your email",
    para: "Please wait we are verifying your email.",
    btn_txt: (
      <>
        Back to <strong>Whizlabs Business</strong>
      </>
    ),
  },
};
