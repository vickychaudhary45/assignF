import React, { useEffect, useState } from 'react';
import { Backdrop, Box, Modal, Fade } from '@mui/material';
import { CircularProgress } from '@material-ui/core';
import './UserListModal.scss';
import SelectedUserListModal from './SelectedUserListModal';

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

export default function UserListModal({ setViewModal, setSelectedUsersToEnroll, usersArray, chkdUsers, UserListLoading }) {
  const [showModal, setShowModal] = useState(false);    // Show/Hide Selected users Modal
  const handleClose = () => {
    setViewModal((prev) => !prev);
    setSelectedUsersToEnroll(checkedUsers);
  }
  const [checkedUsers, setCheckedUsers] = React.useState(chkdUsers);
  const [searchTerm, setSearchTerm] = React.useState('');
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };
  const filteredUsers = usersArray?.filter((user) => user.email.toLowerCase().includes(searchTerm));
  const handleCheckbox = (item) => {
    setCheckedUsers((prevCheckedUsers) => {
      if (prevCheckedUsers.includes(item)) {
        return prevCheckedUsers.filter((itm) => itm !== item);
      } else {
        return [...prevCheckedUsers, item];
      }
    });
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

  useEffect(() => {
    setSelectedUsersToEnroll(checkedUsers);
  }, [checkedUsers]);


  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={showModal ? "custom-sand-modal-dual" : "custom-sand-modal"}
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
        <Fade in={true} className='user-list-modal-custom-sandbox'>
          <Box sx={style}>
            {UserListLoading ? <CircularProgress className="circular-progress" color="primary" /> : (
              <>
                <h6>Select Users From The Below List</h6>
                <button className="users-btn" onClick={handleOpenModal}>Users Selected : {checkedUsers.length}</button>
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
                          <input type="checkbox" checked={checkedUsers?.includes(item)} readOnly></input>
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
                <div className="modal-buttons">
                  <button className="btn close-btn" onClick={() => { setViewModal((prev) => !prev); setSelectedUsersToEnroll([]); }} >
                    Close
                  </button>
                  <button onClick={handleClose} className="btn"> Proceed </button>
                </div>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
      {showModal && (
        <SelectedUserListModal
          setShowModal={setShowModal}
          checkedUsers={checkedUsers}
        />
      )}
    </div>
  );
}
