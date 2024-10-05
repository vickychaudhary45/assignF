import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab } from '@material-ui/core';
// import CourseUserBlock from '../CourseUserBlock/CourseUserBlock';
// import LearningPathUserBlock from '../LearningPathUserBlock/LearningPathUserBlock';
import { images } from 'src/config/images';
import { useParams } from 'react-router-dom';
import AssignRoleBlock from '../AssignRoleBlock/AssignRole';
import { useForm } from 'react-hook-form';
import { getRoles } from 'src/services/role-privileges/services';
// import TimelineFrame from '../Timeline/Timeline';
import { sd } from "../CustomCode/CustomCode";
import { TabPanel, a11yProps } from "../MUIComponents/MUIComponents";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const QuickUserViewForm = (props) => {
  const { register, setValue, getValues } = useForm();
  const classes = useStyles();
  const [value, setValues] = React.useState(0);
  const [profileimg, setProfileimg] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [lastlogin, setLastlogin] = React.useState('');
  const [enrollDate, setEnrollDate] = React.useState('');
  const [roles, setROles] = React.useState('');
  const [userRole, setUserRoles] = React.useState([]);
  const [mailStatus, setMailStatus] = React.useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await getRoles(0, 100, '');
      if (response.status === 'success') {
        setROles(response?.data);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setProfileimg(props?.userInfo?.userData.profile_picture);
    setUsername(props.userInfo.userData.name);
    setEmail(props.userInfo.userData.email);
    setLastlogin(props.userInfo.userData.last_login);
    setEnrollDate(props.userInfo.userData.created_at);
    setUserRoles(props.userInfo.userData.role);
    setMailStatus(props.userInfo.userData.mail_status);
  }, [props.userInfo]);

  const { id } = useParams();
  const handleAction = (e) => {
    e.preventDefault();
    window.location.href = `/edit-user/${id}`;
  };

  const handleChange = (event, newValue) => {
    setValues(newValue);
  };

  return (
    <form>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="User Details" {...a11yProps(0)} />
            <Tab label="Assigned items" {...a11yProps(1)} />
            <Tab label="Part of teams" {...a11yProps(2)} />
            <Tab label="Timeline" {...a11yProps(3)} />
          </Tabs>
        </AppBar>

        {/* ---------- tab-1 -------- */}
        <TabPanel value={value} index={0} className="tab-content">
          <div className="profile-block">
            <div className="profile">
              <figure>
                <img className="img-full" style={{ borderRadius: '50%' }} alt="/"
                  src={profileimg !== null && profileimg !== undefined && profileimg !== ''
                    ? `${process.env.REACT_APP_B2B_MEDIA_URL}user-profile-uploads/${profileimg}` : images.user_img}
                />
              </figure>
              <div className="detail">
                <div className="user-name">{username}</div>
                <div className="user-id">{email}</div>
              </div>
            </div>
            <div className="date-block">
              <div className="block">
                <div className="date">
                  {props.userInfo.userData.last_login != null ? sd(lastlogin) : '-'}
                </div>
                <div className="status">Last Login</div>
              </div>
              <div className="block">
                <div className="date">{sd(enrollDate)}</div>
                <div className="status">Added On</div>
              </div>
            </div>
          </div>
          <div className="user-email-block">
            <div className="email-status">
              <span>Welcome Email Status</span>
              {mailStatus ? <i className="icon icon-assign"></i> : <i className="icon icon-ios-close-outline"></i>}
            </div>
          </div>
          <AssignRoleBlock
            setValue={setValue}
            getValues={getValues}
            register={register}
            roles={roles}
            userRole={userRole}
            quickView={true}
          />
          <div className="btn-group">
            {props.userInfo.userData.deleted_at === null && (
              <button className="btn" onClick={handleAction}>
                Edit User Details
              </button>
            )}
          </div>
        </TabPanel>

        {/* -------- tab-2 --------- */}
        <TabPanel value={value} index={1} className="tab-content">
          <div className="item-block">
            {/* <CourseUserBlock {...props.userInfo} /> */}
            {/* <LearningPathUserBlock {...props.userInfo} /> */}
            <div className="learning-user-block">
              <div className="list-group">
                <div className="head-block">
                  <div className="title">Subscriptions</div>
                  <label>{`${props.userInfo.subscriptionDataCount}`} Subscriptions</label>
                </div>
                {props.userInfo.subscriptionData.map((item, index) => {
                  return (
                    <div className="list-item" key={index}>
                      <div className="course-img">
                        <figure>
                          <img className="img-full" src={images.bundle_img} alt="" />
                        </figure>
                        <div className="course-title">{item.name}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="learning-user-block">
              <div className="list-group">
                <div className="head-block">
                  <div className="title">Sandbox</div>
                  <label>{`${props.userInfo.enrolledSandBoxCount}`} Sandbox</label>
                </div>
                {props.userInfo.enrolledSandBox.map((item, index) => {
                  return (
                    <div className="list-item" key={index}>
                      <div className="course-img">
                        <figure>
                          <img className="img-full" src={images.bundle_img} alt="" />
                        </figure>
                        <div className="course-title">{item.sandbox_title}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </TabPanel>
        {/* -------- tab-3 ---------- */}
        <TabPanel value={value} index={2} className="tab-content">
          <div className="item-block">
            <div className="learning-user-block">
              <div className="list-group">
                <div className="head-block">
                  <div className="title">Teams</div>
                  <label>{`${props.userInfo.teamsDataCount}`} Teams</label>
                </div>
                {props.userInfo.teamsData.map((item, index) => {
                  return (
                    <div className="list-item" key={index}>
                      <div className="course-img">
                        <figure>
                          <img className="img-full" src={images.team_img} alt="" />
                        </figure>
                        <div className="course-title">{item.team_name}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </TabPanel>
        {/* -------- tab-4 ---------- */}
        <TabPanel value={value} index={3} className="tab-content">
          <div className="item-block">
            <div className="learning-user-block">
              <div className="list-group" style={{ maxHeight: 'calc(100vh - 268px)' }}>
                {/* <TimelineFrame timelineInfo={props.timelineInfo} profileImg={profileimg} /> */}
              </div>
            </div>
          </div>
        </TabPanel>
      </div>
    </form>
  );
}

export default QuickUserViewForm;
