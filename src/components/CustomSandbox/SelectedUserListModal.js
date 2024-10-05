import React from 'react';
import { Backdrop, Box, Modal, Fade } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import './SelectedUserListModal.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  outline: 'none',
  borderRadius: '8px',
  width: '450px'
};

export default function SelectedUserListModal({ setShowModal, checkedUsers }) {
  const handleClose = () => {
    setShowModal((prev) => !prev);
  }
  const [searchTerm, setSearchTerm] = React.useState('');
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredUsers = checkedUsers?.filter((user) => user.email.toLowerCase().includes(searchTerm));

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={true}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            style: { backgroundColor: 'transparent' },
            onClick: (event) => event.stopPropagation()
          },
        }}
      >
        <Fade in={true} className='selected-user-list-modal-custom-sandbox'>
          <Box sx={style}>
            <>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                className='close-icon'
              >
                <CancelIcon/>
              </IconButton>
              <h6>{`Selected Users - ${checkedUsers?.length}`}</h6>
              <div className="list-container">
                <input
                  type="search"
                  placeholder="Search User"
                  autoFocus
                  onChange={handleSearchChange}
                />
                <ul>
                  {filteredUsers?.map((item) => (
                    <li key={item.id}
                    >
                      <div className="custom-checkbox">
                        <input type="checkbox" defaultChecked={checkedUsers?.includes(item)} readOnly onClick={(e) => e.preventDefault()}></input>
                        <div className="custom-checkbox-outer">
                          <div className="custom-checkbox-inner">
                            <span>{item.firstname}</span>
                            <span>{item.email}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}