import { useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import "./AcoordianCourse.scss";

const AccordianCourseInner = ({ list, type, panel, mobile }) => {
  const [expanded, setExpanded] = useState(panel);
  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return <>
    <div className="item">
      {list && list.length > 0 && list.map((data, idx) => {
        let video_count = data.children?.filter((val) => val.activity_id == 2).length;
        let lab_count = data.children?.filter((val) => val.activity_id == 6).length;
        let sandbox_count = data.children?.filter((val) => val.activity_id == 7).length;
        if (data.children.length > 0) {
          return <>
            <Accordion
              square
              TransitionProps={{ unmountOnExit: true }}
              expanded={expanded === "panel" + idx}
              onChange={handleChangeAccordion("panel" + idx)}
              key={idx}
            >
              <AccordionSummary
                aria-controls={"panel1d-content" + idx}
                id={"panel1d-header" + idx}
                className="itm-head"
                expandIcon={expanded === "panel" + idx ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineRoundedIcon />}
              >
                <div className="left">
                  <samp></samp>
                  <span>{data.section_heading}</span>
                </div>
                <div className="right">
                  <div className="total-test">
                    {type === "pt" && !mobile &&
                      <>{data.children?.length + (data.children?.length > 1 ? " Practice Tests" : " Practice Test")}</>
                    }
                    {type === "oc" && !mobile && <>
                      <div style={{ display: "flex" }}>
                        {lab_count > 0 && <>
                          <div className="total-test labs-count">
                            {(lab_count > 1 ? <>{lab_count} Labs</> : <>{lab_count} Lab</>)}
                          </div>
                        </>}
                        <div>
                          {video_count > 1 && !mobile ? <>{video_count} Videos</> : <>{video_count} Video</>}
                        </div>
                      </div>
                    </>}
                    {type === "lab" && !mobile &&
                      <>{data.children?.length + (data.children?.length > 1 ? " Labs" : " Lab")}</>
                    }
                    {type === "sandbox" && !mobile &&
                      <>{data.children?.length + (data.children?.length > 1 ? " Sandboxes" : " Sandbox")}</>
                    }
                    {type == "provider" &&
                      <>{data.children.length > 1 ? <>{data.children.length} Courses</> : <>{data.children.length} Course</>}</>
                    }
                    {type == "file" &&
                      <>{data.children.length > 1 ? <>{data.children.length} Courses</> : <>{data.children.length} Course</>}</>
                    }
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails className="item-content">
                <ul>
                  {data.children.map((itm, idxx) => {
                    if (itm.id) {
                      return <>
                        <li key={idxx}>
                          <div className="title">
                            {type === "pt" &&
                              <><i className="icon icon-question"></i><span>{itm.quiz_name}</span></>
                            }
                            {type === "oc" && <>
                              {itm.activity_id === 2 && (
                                <><i className="icon-play icon-font-play-btn-filled"></i><span>{itm.video_name}</span></>
                              )}
                              {itm.activity_id === 6 && (
                                <><i className="icon icon-lab"></i><span>{itm.lab_name}</span></>
                              )}
                            </>}
                            {type === "lab" &&
                              <><i className="icon icon-lab"></i><span>{itm.lab_name}</span></>
                            }
                            {type === "sandbox" &&
                              <><i className="icon icon-lab"></i><span>{itm.sandbox_name}</span></>
                            }
                            {type === "provider" &&
                              <><i className="icon icon-bundle-card"></i><span>{itm.display_name}</span></>
                            }
                            {type === "file" &&
                              <><i className="icon icon-quiz"></i><span>{itm.title}</span></>
                            }
                          </div>
                          <div className="right">
                            <div className="total-que">
                              {type === "pt" &&
                                <>{itm.questions_count} questions</>
                              }
                              {type === "oc" && <>
                                {itm.activity_id === 2 && (
                                  <>
                                    {itm.time_hour > 0 && itm.time_hour + "h "}
                                    {itm.time_minute > 0 && itm.time_minute + "m "}
                                    {itm.time_second > 0 && itm.time_second + "s "}
                                  </>
                                )}
                                {itm.activity_id === 6 && (
                                  <>
                                    {itm.duration_hour > 0 && itm.duration_hour + "h "}
                                    {itm.duration_minutes > 0 && itm.duration_minutes + "m "}
                                  </>
                                )}
                              </>
                              }
                              {type === "lab" && <>
                                {itm?.duration_hour > 0 && `${itm?.duration_hour}h `}
                                {itm?.duration_minutes > 0 && `${itm?.duration_minutes}m`}
                              </>
                              }
                            </div>
                          </div>
                        </li>
                      </>
                    }
                  }
                  )}
                </ul>
              </AccordionDetails>
            </Accordion>
          </>
        }
      })}
    </div>
  </>
}

export default AccordianCourseInner;