import { useState, useEffect } from 'react';
import { Table, TableContainer, TableCell, TableRow, TableHead, Paper, TableBody, Typography, Tooltip, AccordionDetails, Accordion, AccordionSummary, Button, CircularProgress } from '@material-ui/core';
import './LiveDashboardTable.scss';
import { listSandboxes, isCustomSandboxRunningApi, updateSandboxTermination, endRunningSandbox } from "../../services/custom-sandbox-services/services";
import { login } from "../../services/Lab-services/services";
import CredentialsModal from './CredentialsModal';
import moment from 'moment';
import Swal from "sweetalert2";
import { CSVLink } from "react-csv";
import { Visibility, Download, Refresh } from '@mui/icons-material';
import { PulseLoader } from "../Loader/Loader";



const ToastAlert = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3500,
  timerProgressBar: true,
});



const headers = [
  { label: 'S.No', key: 'sno' },
  { label: 'User Email', key: 'email' },
  { label: 'Sandbox Name', key: 'sandbox_name' },
  { label: 'Enrolled Date', key: 'start_date' },
  { label: 'Enrolled End Date', key: 'end_date' },
];


function LiveDashboardTable() {
  const [viewModal, setViewModal] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [sandboxes, setSandbox] = useState([]);
  const [liveCustomSandboxData, setLiveCustomSandboxData] = useState([]);
  const [credentials, setCredentials] = useState({});
  const [selectedSandboxSlug, setSelectedSandboxSlug] = useState("");
  const [labAccessToken, setLabAccessToken] = useState("");   // Token got from user-authentication API of Lab side.
  const [sandLoading, setSandLoading] = useState(false);
  const [sandboxSlugs, setSandboxSlugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSandIdx, setLoadingSandIdx] = useState(""); // Row id of the sandbox that is being terminated.
  const user_data = JSON.parse(localStorage.getItem('user_data'));
  const company_id = user_data?.data?.company_id;
  const handleExpand = (e) => {
    setExpanded(!expanded);
  };
  let sandbox_slugs;

  useEffect(() => {
    const fetchData = async () => {
      const res = await listSandboxes(company_id, "");
      if (res?.status === "success") {
        setSandbox(res?.data);
        sandbox_slugs = res?.data?.map(data => data.sandbox_slug);
        setSandboxSlugs(sandbox_slugs);
        login().then((res) => {
          if (res?.status === true) {
            setLabAccessToken(res?.data?.auth_token);
            fetchRunningSandbox(res?.data?.auth_token);
          }
        })
      }
    }
    fetchData();
  }, []);

  const fetchRunningSandbox = async (labAccessToken) => {
    setLoading(true);
    const data = {
      company_id: company_id,
      lab_token: labAccessToken,
      slug: selectedSandboxSlug ? [selectedSandboxSlug] : sandbox_slugs ? sandbox_slugs : sandboxSlugs
    }
    const res = await isCustomSandboxRunningApi(data);
    if (res?.status === "success") {
      setLiveCustomSandboxData( res?.data?.sort((a, b) => new Date(b.start_date) - new Date(a.start_date)) );
      setLoading(false);
    }
  }

  const handleSearch = () => {
    fetchRunningSandbox(labAccessToken);
  };
  const handleClear = async () => {
    setSelectedSandboxSlug("");
    setLoading(true);
    const data = {
      company_id: company_id,
      lab_token: labAccessToken,
      slug: sandbox_slugs ? sandbox_slugs : sandboxSlugs
    }
    const res = await isCustomSandboxRunningApi(data);
    if (res?.status === "success") {
      setLiveCustomSandboxData(res?.data);
      setLoading(false);
    }
  };

  const handleRefresh = async (labAccessToken, sandbox_slugs) => {
    setLoading(true);
    const data = {
      company_id: company_id,
      lab_token: labAccessToken,
      slug: sandbox_slugs
    }
    const res = await isCustomSandboxRunningApi(data);
    if (res?.status === "success") {
      setLiveCustomSandboxData(res?.data);
      setLoading(false);
    }
  };

  const handleSandboxTermination = async (sandbox_slug, email, roleId, idx) => {
    setSandLoading(true);
    setLoadingSandIdx(idx);
    const data = {
      role_id: roleId,
      error_id: "0"
    }
    const res = await endRunningSandbox(data, labAccessToken);
    if (res?.status === true) {
      const sandboxUpdationData = {
        sandbox_termination_date: res?.data?.user_end_time,
        sandbox_slug: sandbox_slug,
        email: email,
        company_id: company_id
      }
      await updateSandboxTermination(sandboxUpdationData);
      setSandLoading(false);
      ToastAlert.fire({
        icon: "success",
        title: "Sandbox Terminated Successfully!",
      });
      fetchRunningSandbox(labAccessToken);
    } else {
      ToastAlert.fire({
        icon: "error",
        title: "Error in Sandbox Termination.",
      });
    }
    setSandLoading(false);
    setLoadingSandIdx("");
  };

  const exportData = liveCustomSandboxData?.map((itm, i) => ({
    ...itm,
    sno: i + 1,
    start_date: itm?.start_date ? moment.utc(itm.start_date).format("DD MMM YYYY, HH:mm:ss") : "-",
    end_date: itm?.end_date ? moment.utc(itm.end_date).format("DD MMM YYYY, HH:mm:ss") : "-",
  }));

  return (
    <>
      <div className="research-report">
        <Accordion expanded={expanded}>
          <div className="course-heading-block">
            <AccordionSummary>
              <div className='btn-refresh'>
                {!loading && (
                  <button className="btn-report btn-user"
                    onClick={() => handleRefresh(labAccessToken, sandboxSlugs)}
                  >
                    <Refresh className="icon-refresh" fontSize="small" />
                    <Typography className="refresh-text">
                      Refresh / Update
                    </Typography>
                  </button>
                )}
              </div>
              <div className="research-report excel-download">
                {!loading ? <Button className="btn-report btn-user">
                  <CSVLink
                    className="csv-link"
                    headers={headers}
                    data={exportData}
                    filename={`Live Custom Sandbox Report_${new Date().toLocaleDateString()}`}
                  >
                    <Download />
                    <span> .CSV</span>
                  </CSVLink>
                </Button> : null}
              </div>
              <div className="btn btn-filter" onClick={handleExpand}>
                <i className="icon icon-humburger"></i>
              </div>
            </AccordionSummary>
          </div>
          <AccordionDetails>
            <div className="filter-block">
              <div className="input-box-group">
                <div className="box-1 select-box">
                  <div className="head">
                    <label>Sandbox Name</label>
                  </div>
                  <div className="select-box">
                    <i className="icon icon-dropdown"></i>
                    <select value={selectedSandboxSlug} onChange={(e) => setSelectedSandboxSlug(e.target.value)}>
                      <option value="">Select Sandbox</option>
                      {sandboxes && sandboxes.map((sandbox, index) => {
                        return (
                          <option key={index} value={sandbox?.sandbox_slug}>
                            {sandbox?.sandbox_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="btn-group" style={{ marginTop: "20px" }}>
                  <button className={`btn btnMain btn-rounded`} onClick={handleSearch}>Search</button>
                  <button className={`btn btnMain btn-rounded`} onClick={handleClear}> Clear</button>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>

      <TableContainer component={Paper} className="table-content">
        {!loading ? (
          <Table className="live-sandbox-table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className="table-heading">
                  S.No
                </TableCell>
                <TableCell className="course-name table-heading" align="center">
                  User Email
                </TableCell>
                <TableCell className="workspace-name table-heading" style={{ minWidth: "250px" }} align="center">
                  Sandbox Name
                </TableCell>
                <TableCell align="center" className="table-heading">
                  Enrolled Date
                </TableCell>
                <TableCell align="center" style={{ minWidth: "125px" }} className="table-heading">
                  Enrollment End Time
                </TableCell>
                <TableCell align="center" style={{ minWidth: "125px" }} className="table-heading">
                  View Credentials
                </TableCell>
                <TableCell align="center" className="table-heading">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {liveCustomSandboxData?.length > 0 && liveCustomSandboxData?.map((data, index) => (
                <TableRow>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{data.email}</TableCell>
                  <TableCell align="center">{data.sandbox_name}</TableCell>
                  <TableCell align="center">{moment.utc(data.start_date).format("DD MMM YYYY, HH:mm:ss")}</TableCell>
                  <TableCell align="center" style={{ minWidth: "135px" }}>{moment.utc(data.end_date).format("DD MMM YYYY, HH:mm:ss")}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="View Credentials">
                      <span className='icon-btn' onClick={() => { setCredentials(data); setViewModal((prev) => !prev); }}>
                        <Visibility className='icon' />
                      </span>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    {sandLoading && index === loadingSandIdx ?
                      <button className='btn-disabled mw-100'>
                        <CircularProgress className="circular-progress-live-custom" color="inherit" size={15} />
                      </button> :
                      <button className={'btn'} onClick={() => handleSandboxTermination(data?.sandbox_slug, data?.email, data?.role_id, index)} >
                        Terminate
                      </button>
                    }
                  </TableCell>
                </TableRow>
              ))}
              {liveCustomSandboxData?.length === 0 && (
                <TableRow>
                  <TableCell align="center" colSpan={9}>No Record(s) Found</TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        ) : (
          <div className="custom-sandbox-div">
            <PulseLoader />
          </div>
        )}
      </TableContainer>
      {viewModal && (
        <CredentialsModal
          viewModal={viewModal}
          setViewModal={setViewModal}
          data={credentials}
        />
      )}
    </>
  );
};

export default LiveDashboardTable;
