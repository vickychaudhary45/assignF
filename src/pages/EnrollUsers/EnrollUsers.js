import React, { useState } from "react";
import Layout from "../../Layout";
import { createPortal } from 'react-dom';
import { Tabs, Box, Tab, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import { images } from "../../config/images";
import SubscriptionPageProps from "../../components/Props/SubscriptionpageProps";
import SubscriptionTable from "src/components/SubscriptionTable/SubscriptionTable";
import CoursePageProps from "../../components/Props/CoursepageProps";
import CourseTable from "src/components/CourseTable/CourseTable";
import LearningPageProps from "../../components/Props/LearningPageProps";
import LearningTable from "../../components/LearningTable/LearningTable";
import AddUsersModal from "src/components/AddUsersModal/AddUsersModal";
import "./EnrollUsers.scss";

const EnrollUsers = () => {
  const [showModal, setShowModal] = useState(false)
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout>
      <div mainClassName="User">
        <div className="main-content course-page">
          <div className="container">
            <div className="details-block">
              <Tabs value={value} className="tabs" onChange={handleChange} aria-label="basic tabs example" >
                <Tab label="Subscriptions" className="tab" icon={<img height={30} src={images.subs_color} alt="" />} iconPosition="start" {...a11yProps(0)} />
                <Tab label="Courses" className="tab" icon={<img height={30} src={images.course_color} alt="" />} iconPosition="start" {...a11yProps(1)} />
                <Tab label="Sandboxes" className="tab" icon={<img height={30} src={images.sandbox_color} alt="" />} iconPosition="start" {...a11yProps(2)} />
                <Tab label="Learning Paths" className="tab" icon={<img height={30} src={images.learning_color} alt="" />} iconPosition="start" {...a11yProps(3)} />
              </Tabs>
              <CustomTabPanel className='tab-subscription' value={value} index={0}>
                <SubscriptionTable {...SubscriptionPageProps.subscription_select_page} />
              </CustomTabPanel>
              <CustomTabPanel className='tab-course' value={value} index={1}>
                <CourseTable {...CoursePageProps.course_select_page} />
              </CustomTabPanel>
              <CustomTabPanel className='tab-sandbox' value={value} index={2}>
                <div className="sandbox-container">
                  <Box className="sandbox-box">
                    <Typography>Contact support to enable custom sandboxes for enrollments </Typography>
                  </Box>
                </div>
              </CustomTabPanel>
              <CustomTabPanel className='tab-learning' value={value} index={3}>
                <LearningTable {...LearningPageProps.learning_select_page} />
              </CustomTabPanel>
              <div className="adduser-button-box">
                <input type='button' value='Add New User(s)' onClick={() => { setShowModal(prev => true) }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && createPortal(
        <AddUsersModal showModal={showModal} setShowModal={setShowModal} />,
        document.getElementById('portal')
      )}
    </Layout>
  );
};

export default EnrollUsers;
