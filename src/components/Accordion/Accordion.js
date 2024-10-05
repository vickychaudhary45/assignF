// Need to check IndexPage
import React, { useEffect } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { Link } from "react-router-dom";
import "./Accordion.scss";

const FaqBlock = (props) => {
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const mailsend = (e) => {
    window.location = 'mailto:contact@whizlabs.com'
  }
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      const scrollbtn = document.getElementById("myBtn");
      window.onscroll = function () { scrollFunction() };

      function scrollFunction() {
        if (document.body.scrollTop > 2500 || document.documentElement.scrollTop > 2500) {
          scrollbtn.style.display = "block";
        } else {
          scrollbtn.style.display = "none";
        }
      }
    }
  })

  const handleScroll = () => {
    let s = window.pageYOffset || document.documentElement.scrollTop;
    if (s > 0) {
      window.requestAnimationFrame(handleScroll);
      window.scrollTo(0, s - s / 15)
    }
  }

  return (
    <>
      {/* contact us block */}
      <div className="contactUs-block">
        <div className="container">
          <div className="inner-block">
            <div className="left-block">
              <span>Want to Customize</span>Your Learning Requirements
            </div>
            <div className="right-block">
              <Link to="/request-demo-page?utm_source=customize"><button className="btn btn-contact">Contact Us</button></Link>
              <div className="mail-block">
                <span>Email us at</span>
                <a className="mail-id" onClick={mailsend}>contact@whizlabs.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* // faq  block // */}
      <div id="faqblock" className="faq-block">
        <div className="container">
          <h4 className="title">{props.title}</h4>
          {props.accordion.map((faq, index) => {
            return (
              <Accordion
                className="item"
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                key={index}
              >
                <AccordionSummary
                  className="item-head"
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}content`}
                >
                  {faq.head}
                </AccordionSummary>
                <AccordionDetails>
                  <div className="item-content">{faq.para}</div>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </div>
      <button onClick={handleScroll} id="myBtn" title="Go to top"><i style={{ fontStyle: 'normal' }}>↑</i></button>
    </>
  );
};
export default FaqBlock;