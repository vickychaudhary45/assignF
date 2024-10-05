import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { UsersPageProps } from "../../components/Props/UsersPageProps";
import CommonAddUserForm from './CommonAddUserForm';
import "./AddUsersModal.scss"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
  maxHeight: '97vh',
};

export default function AddUsersModal({ showModal, setShowModal }) {
  const handleClose = () => setShowModal(false);

  return (
    <div>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className='modal-box'>
          <CommonAddUserForm {...UsersPageProps.add_user_page} setShowModal={setShowModal} />
        </Box>
      </Modal>
    </div>
  );
}