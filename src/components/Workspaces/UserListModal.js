import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import SelectedUsersModal from './SelectedUsersModal';
import './UserListModal.scss';

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

export default function UserListModal({ setViewModal, setCheckedUsersModal, usersArray, chkdUsers }) {
  const handleClose = () => {
    setViewModal((prev) => !prev);
    setCheckedUsersModal(checkedUsers);
  }
  const [checkedUsers, setCheckedUsers] = React.useState(chkdUsers);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);    // Show/Hide Selected users Modal
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };
  const filteredUsers = usersArray?.filter(
    (user) =>
      user.firstname.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
  );
  const handleCheckbox = (item) => {
    setCheckedUsers((prevCheckedUsers) => {
      if (prevCheckedUsers.length >= 5 && !prevCheckedUsers.includes(item)) {
        return prevCheckedUsers; // Don't update the state if trying to check more than 5
      } else {
        if (prevCheckedUsers.includes(item)) {
          return prevCheckedUsers.filter((itm) => itm !== item);
        } else {
          return [...prevCheckedUsers, item];
        }
      }
    });
    setCheckedUsersModal(checkedUsers);
  };

  //Logic to show recentaly selected users at the top of list.
  const checkedUserSet = new Set(checkedUsers.map(user => user.id));
  const sortedFilteredUsers = [
    ...checkedUsers,
    ...filteredUsers.filter(user => !checkedUserSet.has(user.id))
  ];

  const handleOpenModal = () => {
    if (checkedUsers?.length > 0) {
      setShowModal(true);
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={showModal ? "workspace-modal-dual" : "workspace-sand-modal"}
        open={true}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={true} className='user-list-modal-workspaces'>
          <Box sx={style}>
            <h6 style={{ textAlign: 'center' }}>
              Select Users From The Below List
            </h6>
            <button className="users-btn" onClick={handleOpenModal}>Users Selected : {checkedUsers.length}/5</button>
            <div className="list-container">
              <input
                type="search"
                placeholder="Search User"
                autoFocus
                onChange={handleSearchChange}
              />
              <ul>
                {sortedFilteredUsers?.map((item) => (
                  <li key={item.id} onClick={() => handleCheckbox(item)}>
                    <div className="custom-checkbox">
                      <input type="checkbox" checked={checkedUsers?.includes(item)}></input>
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
            <p>Note: Maximum 5 users can be selected</p>
            <div className="modal-buttons">
              <button className="btn close-btn" onClick={() => { setViewModal((prev) => !prev); setCheckedUsersModal([]); }} >
                Close
              </button>
              <button onClick={handleClose} className="btn"> Proceed </button>
            </div>
          </Box>
        </Fade>
      </Modal>
      {showModal && (
        <SelectedUsersModal
          setShowModal={setShowModal}
          checkedUsers={checkedUsers}
        />
      )}
    </div>
  );
}
