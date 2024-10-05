import React from 'react';

const Trigger = ({ triggerText, buttonRef, showModal }) => {
  return (
    <a className="link" ref={buttonRef} onClick={showModal}>
      {triggerText}
    </a>
  );
};
export default Trigger;