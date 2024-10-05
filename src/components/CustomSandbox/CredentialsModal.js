import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { ContentCopy } from '@mui/icons-material';
import './CustomSandbox.scss';

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


export default function CredentialsModal({ viewModal, setViewModal, data }) {
  const [open, setOpen] = React.useState(true);
  const [copied, setCopied] = React.useState({});

  const handleClose = () => setViewModal((prev) => !prev);

  const handleCopy = async (key, text) => {
    await navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => setCopied((prev) => ({ ...prev, [key]: false })), 2000);
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
                    <input type="text" className='input-field' value={data.username} disabled />
                    {copied['username'] ? (<span> Copied! </span>)
                      : (
                        <ContentCopy className='copy-btn' onClick={() => handleCopy('username', data.username)} />
                      )}
                  </div>
                  <label>User Password</label>
                  <div className='input-div'>
                    <input type="text" className='input-field' value={data.password} disabled />
                    {copied['password'] ? (<span> Copied! </span>)
                      : (
                        <ContentCopy className='copy-btn' onClick={() => handleCopy('password', data.password)} />
                      )}
                  </div>
                  <label>{data.project_id ? "Project ID" : "Access Key"}</label>
                  <div className='input-div'>
                    <input type="text" className='input-field' value={data.project_id ? data.project_id : data.accesskey} disabled />
                    {copied['project_id_accesskey'] ? (<span> Copied! </span>)
                      : (
                        <ContentCopy className='copy-btn' onClick={() => handleCopy('project_id_accesskey', data.project_id ? data.project_id : data.accesskey)} />
                      )}
                  </div>
                  <label>{data.project_name ? "Project Name": "Secret Key"}</label>
                  <div className='input-div'>
                    <input type="text" className='input-field' value={data.project_name ? data.project_name : data.secretkey} disabled />
                    {copied['project_name_secretkey'] ? (<span> Copied! </span>)
                      : (
                        <ContentCopy className='copy-btn' onClick={() => handleCopy('project_name_secretkey', data.project_name ? data.project_name : data.secretkey)} />
                      )}
                  </div>
                  <label>Login Link</label>
                  <div className='input-div'>
                    <input type="text" className='input-field' value={data.login_link} disabled />
                    {copied['login_link'] ? (<span> Copied! </span>)
                      : (
                        <ContentCopy className='copy-btn' onClick={() => handleCopy('login_link', data.login_link)} />
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
