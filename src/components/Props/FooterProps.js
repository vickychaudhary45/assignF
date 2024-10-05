import { images } from "../../config/images";

export const FooterProps = {
  footer_logo: images.logo_footer,
  txt: `${new Date().getFullYear()},Whizlabs Education INC.`,
  social_links: [
    {
      link: "https://www.facebook.com/whizlabs.software/",
      icon: "icon-facebook",
    },
    {
      link: "https://twitter.com/whizlabs/",
      icon: "icon-tweeter",
    },
    {
      link: "https://www.linkedin.com/company/whizlabs-software/",
      icon: "icon-linkedin",
    },
  ],
  block: [
    {
      title: "Teaching & Company",
      list: [
        {
          link: "Become Our Instructor",
          wlink:  "/become-an-instructor/",
        },
        {
          link: "Become an Affiliate",
          wlink:  "/whizlabs-affiliate-program/",
        },
        {
          link: "AWS Consulting Services",
          wlink:  "/aws-consulting-services/",
        },
        {
          link: "Blog",
          wlink:  "/blog/",
        },
        {
          link: "Reviews",
          wlink:  "/reviews/",
        },
        {
          link: "About Us",
          wlink:  "/about-us/",
        },
      ],
    },
    {
      title: "Legal",
      list: [
        {
          link: "Privacy Policy",
          wlink:  "/privacy-policy/",
        },
        {
          link: "Terms of Use",
          wlink:  "/terms-of-use/",
        },
        {
          link: "Refund Policy",
          wlink:  "/refund-policy/",
        },
        {
          link: "Programs Guarantee",
          wlink:  "/our-learning-programs-guarantee/",
        },
      ],
    },
    {
      title: "Support",
      list: [
        {
          link: "Contact Us",
          wlink:  "/contact-us/",
        },
        {
          link: "Discussions",
          wlink:  "/forums/",

        },
      ],
    },
  ],
  join_slack: {
    img: images.slack,
    title: "Join us on Slack!",
    para: (
      <>
        Join our open{" "}
        <a href="https://whizlabseducationinc.slack.com/join/shared_invite/zt-ukg8ddl3-CCojZoWS57nVEyErUbQdSA#/shared-invite/email">
          Slack community
        </a>{" "}
        and get your queries answered instantly! Our experts are online to
        answer your questions!
      </>
    ),
  },
  footer_bottom: {
    title: "Disclaimer",
    para: "PMI®, Project Management Body of Knowledge (PMBOK® Guide), PMP®, PMI-RMP®, PMI-PBA®, CAPM®, PMI-ACP® and PMI Registered Education Provider Logo are registered marks of the Project Management Institute, Inc. PRINCE2® is a [registered] mark of AXELOS Limited, used under permission of AXELOS Limited. All rights reserved.",
  },
};
