import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { ContentCopy } from '@mui/icons-material';
import './Workspaces.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  outline: 'none',
  borderRadius: '8px',
};


// Component definition
export default function WorkspaceCredentialsModal({ viewModal, setViewModal, data }) {
  // State to manage the modal open state and copied status
  const [open, setOpen] = React.useState(true);
  const [copied, setCopied] = React.useState({});

  // Close modal function
  const handleClose = () => setViewModal((prev) => !prev);

  // Handle copy to clipboard functionality
  const handleCopy = async (text) => {
    // Use Clipboard API to write text to clipboard
    await navigator.clipboard.writeText(text);

    // Set copied status to true and reset after 2 seconds
    setCopied((prev) => ({ ...prev, [text]: true }));
    setTimeout(() => setCopied((prev) => ({ ...prev, [text]: false })), 2000);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form className="form-default">
              <div className="input-group">
                <div className="input-box" key={1}>
                  <label>User Name</label>
                  <div className='input-div'>
                    <input type="text" className='input-field' value={data.user_name} disabled />
                    {copied[data.user_name] ? (<span> Copied! </span>)
                      : (
                        <ContentCopy className='copy-btn' onClick={() => handleCopy(data.user_name)} />
                      )}
                  </div>
                  <label>User Password</label>
                  <div className='input-div'>
                    <input type="text" className='input-field' value={data.user_password} disabled />
                    {copied[data.user_password] ? (<span> Copied! </span>)
                      : (
                        <ContentCopy className='copy-btn' onClick={() => handleCopy(data.user_password)} />
                      )}
                  </div>
                  <label>Download URL</label>
                  <div className='input-div'>
                    <input type="text" className='input-field' value={data.download_url} disabled />
                    {copied[data.download_url] ? (<span> Copied! </span>)
                      : (
                        <ContentCopy className='copy-btn' onClick={() => handleCopy(data.download_url)} />
                      )}
                  </div>
                  <label>Registration Code</label>
                  <div className='input-div'>
                    <input type="text" className='input-field' value={data.registration_code} disabled />
                    {copied[data.registration_code] ? (<span> Copied! </span>)
                      : (
                        <ContentCopy className='copy-btn' onClick={() => handleCopy(data.registration_code)} />
                      )}
                  </div>
                </div>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
