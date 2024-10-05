import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { images } from '../../config/images';
import { Link, useHistory } from 'react-router-dom';
import enterprise from 'src/assets/images/enterprise.svg';
import TextsmsIcon from '@mui/icons-material/Textsms';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import './HeaderDashboard.scss';

const useHeader = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const HeaderDashboard = ({ privileges, setFeedbackModal }) => {
  const history = useHistory();
  const classesheader = useHeader();
  const anchorRef = React.useRef(null);
  const [open, dropOpen] = React.useState(false);
  const user_data = JSON.parse(localStorage.getItem('user_data'));
  const showFeedbackFormButton = JSON.parse(localStorage.getItem("feedback_form"));
  const userToken = user_data?.data.token;
  let profileImg = `${process.env.REACT_APP_B2B_MEDIA_URL}user-profile-uploads/${user_data?.data?.profile_img}`;
  let profile_image = user_data?.data?.profile_img !== null ? profileImg : images.user_img;
 
  const dropToggle = () => {
    dropOpen((prevOpen) => !prevOpen);
  };

  const dropClose = (event, href = null) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    if (href) {
      history.push(href);
    }
    dropOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      dropOpen(false);
    }
  }

  const logout = (event) => {
    const user_Info = JSON.parse(localStorage.getItem('user_data')).data;
    const custom_login_enabled = user_Info?.custom_login_enabled
    const login_page_slug = user_Info?.login_page_slug

    localStorage.removeItem('user_data');
    localStorage.removeItem('custom_login');
    let user_login_url = localStorage.getItem('user_login_url');
    if (user_login_url) {
      localStorage.clear();
      window.location.href = user_login_url;
    }
    else if (custom_login_enabled === 1 && login_page_slug != null) {
      setTimeout(() => { window.location.href = `/login/${login_page_slug}`
      }, 1000);
    }
    else {
      window.location.href = `/login`;
    }
  };

  const openFeedbackModal = () => {
    setFeedbackModal(true);
  }
  function hasPrivilege(privilege) {
    if (user_data?.data?.is_owner) {
      return true;
    }
    return privileges?.privileges.includes(privilege);
  }
  

  return (
    <header className="header-dashboard">
      <div className="container">
        <div className="header-left cobranding-text">
          {privileges?.allow_whitelabeling ? (
            <span className="logo">
              <img className="img-full img-branding-whitelabeling"
                src={process.env.REACT_APP_B2B_MEDIA_URL + 'company-logos/' + privileges?.profile_pic} alt="logo" />
            </span>
          ) : privileges?.allow_cobranding ? (
            <>
              <span className="logo">
                <img className="img-full img-full-logo" src={images.logo_small} alt="" />
              </span>
              <span className="branding-span">+</span>
              <span className="logo">
                <img className="img-full img-full-branding"
                  src={process.env.REACT_APP_B2B_MEDIA_URL + 'company-logos/' + privileges?.profile_pic} alt="logo" />
              </span>
            </>
          ) : (
            <a className="logo" href="/">
              <img className="img-full" src={images.logo_busi} alt="logo" />
            </a>
          )}
          {privileges?.cobranding_text && privileges?.allow_cobranding ? (
            <span className="branding-text-span">
              {privileges?.cobranding_text}
            </span>
          ) : ('')}
        </div>
        <div className="header-right">
          <div className="user-login-block">
            {showFeedbackFormButton ?
              <div onClick={openFeedbackModal}>
                <Tooltip title="Fill Feedback Form">
                  <IconButton className='feedback-form-btn'>
                    <TextsmsIcon className='feedback_icon' />
                  </IconButton>
                </Tooltip>
              </div>
              : ""}
            {privileges?.allow_whitelabeling === 0 ?
              <div className='support_icon'>
                <IconButton className='support_btn'>
                  <Tooltip title="Support">
                    <img src={images.support_img} alt='Support' width={"32px"} height={"30px"}
                      onClick={(e) => dropClose(e, '/support-page')} ></img>
                  </Tooltip>
                </IconButton>
              </div>
              : ""}
            {(privileges.portal_switch || privileges.is_owner === 1) && (
              <button className="btn-switch-lms"
                onClick={() => { window.location.href = `${process.env.REACT_APP_LEARN_URL}/my-training/?token=${userToken}` }}
              >
                My Trainings
              </button>
            )}
            <div className="user-block">
              <div className="admin-name">
                <label>
                  {user_data?.data?.is_owner ? 'Admin' : privileges?.default_role ? privileges.default_role : 'Employee'}
                </label>
                <span>{user_data?.data?.name?.first}</span>
              </div>
              <Button
                className="header-dropdown"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={dropToggle}
              >
                <figure>
                  <img className="img-full" style={{ borderRadius: '50%' }} src={profile_image} alt="" />
                </figure>
                <i className="icon icon-dropdown"></i>
              </Button>
            </div>
            <div className={classesheader.root}>
              <Paper className={classesheader.paper}></Paper>
              <div>
                <Popper
                  className="drop-down"
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow {...TransitionProps}
                      style={{
                        transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={dropClose}>
                          <MenuList
                            className="drop-down-list"
                            autoFocusItem={open}
                            id="menu-list-grow"
                            onKeyDown={handleListKeyDown}
                          >
                            <div className="title">
                              Hello, <span>{user_data?.data?.name?.first}</span>
                              <div className="enterprise">
                                <figure>
                                  <img className="img-full" src={enterprise} alt="" />
                                </figure>
                                <span className="enterprise-text">
                                  Enterprise
                                </span>
                              </div>
                            </div>
                            <MenuItem onClick={(e) => dropClose(e, '/dashboard')}>
                              Dashboard
                            </MenuItem>
                            {hasPrivilege("Enrollments") && (
                            <MenuItem onClick={(e) => dropClose(e, '/enroll-users')}>
                              Enrollments
                            </MenuItem>
                            )}
                            {hasPrivilege("Requested Courses") && (
                            <MenuItem onClick={(e) => dropClose(e, '/requested-courses')}>
                              Requested Courses
                              {privileges.totalUserRequestCourses && privileges.totalUserRequestCourses > 0 ?
                                (<span className="notification-badge">{privileges.totalUserRequestCourses}</span>) : null}
                            </MenuItem>
                            )}
                            <MenuItem onClick={(e) => dropClose(e, '/setting-page')}>
                              Account Settings
                            </MenuItem>
                            {hasPrivilege("Roles/Privileges") && (
                            <MenuItem onClick={(e) => dropClose(e, '/roles-privileges')}>
                              Roles / Privileges
                            </MenuItem>
                            )}
                            <div className="logout-link" style={{ margin: '0px' }}>
                              <Link onClick={logout}>Logout</Link>
                            </div>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderDashboard;
