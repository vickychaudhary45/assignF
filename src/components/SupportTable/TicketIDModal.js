import { useState } from 'react';
import { Backdrop, Box, Modal, Fade } from '@mui/material';
import './TicketIDModal.scss';

const TicketIDModal = ({ setShowModal, modalData }) => {
  const handleClose = () => setShowModal(false);
  const [showImage, setShowImage] = useState(false);
  const profileImg = `${process.env.REACT_APP_B2B_MEDIA_URL}support-query-uploads/${modalData[0]?.attachment_path}`;

  return (
    <div>
      <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={true}
        onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500, }, }} className='ticket-modal-block'>
        <Fade in={true}>
          <Box className="box-container">
            <form className="form-default">
              <div className="input-group">
                <div className="input-box">
                  <label>Title of Query</label>
                  <input type="text" value={modalData[0]?.title} disabled className="title-input" />
                </div>
              </div>

              {/* {dropdown} */}
              <div className="select-block">
                <div className="input-box">
                  <label>Type of query</label>
                  <div className="input-style">
                    <select name="type" value={modalData[0]?.type} disabled >
                      <option value="">Select Type</option>
                      <option value="Support">Support Request</option>
                      <option value="Labs">Labs/Sandbox Issue</option>
                      <option value="Products">Products Issue</option>
                      <option value="Technical">Technical Issue</option>
                      <option value="Business">New Feature</option>
                    </select>
                  </div>
                </div>
                <div className="input-box">
                  <label>Priority</label>
                  <div className="input-style">
                    <select name="priority" value={modalData[0]?.priority} disabled>
                      <option value="">Select Priority</option>
                      <option value="0">Low</option>
                      <option value="1">Medium</option>
                      <option value="2">Urgent</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* description */}
              <div>
                <label>Description of the queries</label>
                <div className="support-modal-description" dangerouslySetInnerHTML={{ __html: modalData[0]?.description, }} />
              </div>
              {/* Current Status */}
              <div className="textarea-block">
                <div className="input-box">
                  <label>Current Status</label>
                  <textarea
                    rows="10"
                    cols="250"
                    name="comment"
                    className="text-area"
                    value={modalData[0].status === 0 ? 'Pending' : modalData[0].status === 1 ? 'Inprogress' : 'Resolved'}
                    disabled>
                  </textarea>
                </div>
              </div>
              {/* attachments */}
              {modalData[0]?.attachment_path && (
                <div className={showImage ? 'view-attachment show-img' : 'view-attachment'}>
                  <label>
                    Attachments{' '}
                    <button onClick={(e) => { e.preventDefault(); setShowImage((prev) => !prev); }}> View Image</button>
                  </label>
                  {showImage && <img alt="screen_shot" src={profileImg} />}
                </div>
              )}
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
export default TicketIDModal;
