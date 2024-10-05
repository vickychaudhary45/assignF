import React, { useEffect, useRef } from "react";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import "../GlobelSection/VideoPopUp.css";

export const VideoPop = ({ videoURL, modal, setModal }) => {
  const inputRef = useRef(null);
  useEffect(() => {
    const closeVid = (e) => {
      if (modal && inputRef.current && !inputRef.current.contains(e.target)) {
        setModal(false);
      }
    }
    document.body.addEventListener("click", closeVid);
    return () => {
      document.body.removeEventListener("click", closeVid)
    }
  }, [modal])

  return (
    <div>
      {modal ? (
        <section className="modal__bg">
          <div className="modal__align">
            <div className="modal__content" modal={modal}>
              <div className="modal__video-align">
                <HighlightOffIcon
                  className="modal__close"
                  arial-label="Close modal"
                  onClick={setModal}
                />
                <iframe
                  ref={inputRef}
                  className="modal__video-style"
                  // onLoad={spinner}
                  loading="lazy"
                  width="800"
                  height="500"
                  src={videoURL}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
};
