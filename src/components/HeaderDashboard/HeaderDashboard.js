import React from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import { images } from "../../config/images";
import { Link, useHistory } from "react-router-dom";
import TextsmsIcon from "@mui/icons-material/Textsms";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import "./HeaderDashboard.scss";

const useHeader = makeStyles((theme) => ({
  root: {
    display: "flex",
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
  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const showFeedbackFormButton = JSON.parse(
    localStorage.getItem("feedback_form")
  );
  const userToken = user_data?.data.token;
  let profileImg = `${process.env.REACT_APP_B2B_MEDIA_URL}user-profile-uploads/${user_data?.data?.profile_img}`;
  let profile_image =
    user_data?.data?.profile_img !== null ? profileImg : images.user_img;

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
    if (event.key === "Tab") {
      event.preventDefault();
      dropOpen(false);
    }
  }

  const logout = (event) => {
    const user_Info = JSON.parse(localStorage.getItem("user_data")).data;
    const custom_login_enabled = user_Info?.custom_login_enabled;
    const login_page_slug = user_Info?.login_page_slug;

    localStorage.removeItem("user_data");
    localStorage.removeItem("custom_login");
    let user_login_url = localStorage.getItem("user_login_url");
    if (user_login_url) {
      localStorage.clear();
      window.location.href = user_login_url;
    } else if (custom_login_enabled === 1 && login_page_slug != null) {
      setTimeout(() => {
        window.location.href = `/login/${login_page_slug}`;
      }, 1000);
    } else {
      window.location.href = `/login`;
    }
  };

  const openFeedbackModal = () => {
    setFeedbackModal(true);
  };

  return (
    <header className="header-dashboard">
      <div className="container">
        <div className="header-right">
          <div className="user-login-block">
            {/* {showFeedbackFormButton ? */}
            <div onClick={openFeedbackModal}>
              <Tooltip title="Fill Feedback Form">
                <IconButton className="feedback-form-btn">
                  <TextsmsIcon className="feedback_icon" />
                </IconButton>
              </Tooltip>
            </div>
            {/* // : ""} */}
            <div className="user-block">
              <div className="admin-name">
                <label>
                  {user_data?.data?.is_owner
                    ? "Admin"
                    : privileges?.default_role
                    ? privileges.default_role
                    : "Employee"}
                </label>
                <span>{user_data?.data?.name?.first}</span>
              </div>
              <Button
                className="header-dropdown"
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={dropToggle}
              >
                <figure>
                  <img
                    className="img-full"
                    style={{ borderRadius: "50%" }}
                    src={profile_image}
                    alt=""
                  />
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
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom",
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
                            <div
                              className="logout-link"
                              style={{ margin: "0px" }}
                            >
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
};

export default HeaderDashboard;
