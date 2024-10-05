import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { releaseNotesModalData, adminUpdateProps } from '../Props/ReleaseNotesProps';
import './ReleaseNotes.scss';

const ReleaseNotes = () => {
  return (
    <>
      {/* Header */}
      <div className="what-is-new-header">
        <span className="what-is-new-header-title">What's new on Platform</span>
        <p className="what-is-new-header-sub-title">Release Notes</p>
      </div>
      {/* Body */}
      <div className="what-is-new-body">
        <Accordion className="accordion-before" defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div className="what-is-new-body-heading">
              <div className="what-is-new-body-content-heading">Admin Updates V4.1</div>
              <div>
                <span className="what-is-new-body-heading-button">Major</span>
                <span className="what-is-new-body-heading-date">December 14, 2023</span>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <ul className="admin-updates-list">
              {adminUpdateProps.map((list, index) => (
                <li key={index}>{list.name}</li>
              ))}
            </ul>
          </AccordionDetails>
        </Accordion>
        <Accordion className="accordion-before">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            {/* Body Heading */}
            <div className="what-is-new-body-heading">
              <div className="what-is-new-body-content-heading">Platform Updates V4.0</div>
              <div>
                <span className="what-is-new-body-heading-button">Major</span>
                <span className="what-is-new-body-heading-date">December 7, 2023</span>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {/* Body content */}
            <div className="what-is-new-body-content">
              {releaseNotesModalData.map((item, index) => (
                <div key={index} id={item.Heading}>
                  <h2>{item.Heading}</h2>
                  {item.list.map((listItem, listIndex) => (
                    <React.Fragment key={listIndex}>
                      {listItem.listHeading && (
                        <span>{listItem.listHeading}</span>
                      )}
                      <ul>
                        {listItem.listBody.map((bodyItem, bodyIndex) => (
                          <React.Fragment key={bodyIndex}>
                            <li>{bodyItem.name}</li>
                            {bodyItem.image && (
                              <img alt={bodyItem.image} src={bodyItem.image} width={450} />
                            )}
                            <hr />
                            {bodyItem.subList &&
                              bodyItem.subList.map((subItem, subIndex) => (
                                <ul key={subIndex} className="ul">
                                  <li>{subItem.name}</li>
                                  {subItem.image && (
                                    <img alt={subItem.image} src={subItem.image} width={450} />
                                  )}
                                </ul>
                              ))}
                          </React.Fragment>
                        ))}
                      </ul>
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}

export default ReleaseNotes;
