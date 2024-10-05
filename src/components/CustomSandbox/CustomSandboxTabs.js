import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Box } from '@mui/material'
import LiveDashboardTable from './LiveDashboardTable'
import CustomSandboxEnrollmentTable from './CustomSandboxEnrollmentTable';
import './CustomSandboxTabs.scss';

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function CustomSandboxTabs() {
  const [value, setValue] = React.useState(0);

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="custom-sandbox-tab-main-div">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className="tabs">
          <Tab label="Enrollment Reports" {...a11yProps(0)} className="tab" />
          <Tab label="Live Dashboard" {...a11yProps(1)} className="tab" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CustomSandboxEnrollmentTable />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <LiveDashboardTable />
      </CustomTabPanel>
    </Box>
  );
}
