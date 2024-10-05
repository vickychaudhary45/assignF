import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@material-ui/core";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AccordianCourseInner from "./InnerAccordian";

const AccordianCourse = ({ idx, pt, oc, lab, sandbox, enPT, enOC, enLAB, enSANDBOX }) => {
  const [expanded, setExpanded] = useState("");
  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  let pt_count = 0;
  pt.forEach((itm) => {
    pt_count = pt_count + itm.children.length
  })
  let oc_count = 0;
  oc.forEach((itm) => {
    oc_count = oc_count + itm.children.length
  })

  let lab_count = 0
  lab.forEach((itm) => {
    lab_count = lab_count + itm.children.length
  })

  let sandbox_count = 0
  sandbox?.forEach((itm) => {
    sandbox_count = sandbox_count + itm.children.length
  })

  return <>
    {(pt?.length > 0 && enPT) ? <>
      <Accordion
        square
        expanded={expanded === "panel" + 1}
        onChange={handleChangeAccordion("panel" + 1)}
        key={1}
      >
        <AccordionSummary
          expandIcon={expanded == "panel" + 1 ? <RemoveIcon /> : <AddIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="itm-head"
        >
          <div className="accordion-content-title">
            <div className="title icon icon-question">
              <span>Practice Test</span>
            </div>
            <div className="right">
              {pt_count} {pt_count > 1 ? <>Practice Tests</> : <>Practice Test</>}
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="inner-accordion-inner">
            <AccordianCourseInner list={pt}
              type="pt"
              panel="panel0"
              link={""}
              mobile={false}></AccordianCourseInner>
          </div>
        </AccordionDetails>
      </Accordion>
    </> : <></>}
    {(oc?.length > 0 && enOC) ? <>
      <Accordion
        square
        expanded={expanded === "panel" + 2}
        onChange={handleChangeAccordion("panel" + 2)}
        key={2}
      >
        <AccordionSummary
          expandIcon={expanded == "panel" + 2 ? <RemoveIcon /> : <AddIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="itm-head"
        >
          <div className="accordion-content-title">
            <div className="title icon icon-play">
              <span>Video Course</span>
            </div>
            <div className="right">
              {oc_count} {oc_count > 1 ? <>Videos</> : <>Video</>}
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="inner-accordion-inner">
            <AccordianCourseInner list={oc}
              type="oc"
              panel="panel0"
              link={""}
              mobile={false}></AccordianCourseInner>
          </div>
        </AccordionDetails>
      </Accordion>
    </> : <></>}
    {(lab?.length > 0 && enLAB) ? <>
      <Accordion
        square
        expanded={expanded === "panel" + 3}
        onChange={handleChangeAccordion("panel" + 3)}
        key={3}
      >
        <AccordionSummary
          expandIcon={expanded == "panel" + 3 ? <RemoveIcon /> : <AddIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="itm-head"
        >
          <div className="accordion-content-title">
            <div className="title icon icon-lab">
              <span>Hands-on Labs</span>
            </div>
            <div className="right">
              {lab_count} {lab_count > 1 ? <> Labs</> : <> Lab</>}
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="inner-accordion-inner">
            <AccordianCourseInner list={lab}
              type="lab"
              panel="panel0"
              link={""}
              mobile={false}></AccordianCourseInner>
          </div>
        </AccordionDetails>
      </Accordion>
    </> : <></>}
    {(sandbox?.length > 0 && enSANDBOX) ? <>
      <Accordion
        square
        expanded={expanded === "panel" + 6}
        onChange={handleChangeAccordion("panel" + 6)}
        key={3}
      >
        <AccordionSummary
          expandIcon={expanded == "panel" + 6 ? <RemoveIcon /> : <AddIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="itm-head"
        >
          <div className="accordion-content-title">
            <div className="title icon icon-inbox-nav">
              <span>Sandbox</span>
            </div>
            <div className="right">
              {sandbox_count} {sandbox_count > 1 ? <> Sandboxes</> : <> Sandbox</>}
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="inner-accordion-inner">
            <AccordianCourseInner list={sandbox}
              type="sandbox"
              panel="panel0"
              link={""}
              mobile={false}></AccordianCourseInner>
          </div>
        </AccordionDetails>
      </Accordion>
    </> : <></>}
  </>
}

export default AccordianCourse;