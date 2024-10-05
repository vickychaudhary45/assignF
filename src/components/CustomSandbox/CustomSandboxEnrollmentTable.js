import { useState, useEffect } from 'react';
import { Table, TableContainer, TableCell, TableRow, TableHead, Paper, TableBody, TablePagination, Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import Select from "react-select";
import './CustomSandboxEnrollmentTable.scss';
import moment from 'moment';
import { listEnrollmentReport, listSandboxes } from 'src/services/custom-sandbox-services/services';
import { PulseLoader } from "../Loader/Loader";
import TablePaginationActions from "../Pagination/Pagination";

const calculateSandboxStatus = (sandboxTerminationDate, endDate, sandboxStartDate) => {
  if (!sandboxStartDate) {
    return "Assigned";
  }
  else if (!sandboxTerminationDate && sandboxStartDate) {
    return "Running";
  }
  const terminationDate = new Date(sandboxTerminationDate);
  const end = new Date(endDate);

  if (terminationDate > end) {
    return "Terminated after the specified time";
  } else if (terminationDate <= end) {
    return "Terminated on time";
  } else {
    return "Running";
  }
};

function CustomSandboxEnrollmentTable() {
  const [expanded, setExpanded] = useState(true);
  const [sandboxEnrollmentData, setSandboxEnrollmentData] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [email, setEmail] = useState('');
  const [sandboxName, setSandboxName] = useState([]);
  const [termination_status, set_termination_status] = useState('');
  const [fromdDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState(moment().format('YYYY-MM-DD'));
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [sandboxes, setSandboxes] = useState([]);
  const user_data = JSON.parse(localStorage.getItem('user_data'));
  const company_id = user_data?.data?.company_id;

  const handleExpand = () => {
    setExpanded(!expanded);
  };
  const terminationStatus = [
    { label: "Termainated - On time", value: "1" },
    { label: "Terminated - After time", value: "2" },
    { label: " Currently running", value: "3" },
    { label: "Assigned", value: "4" },
  ]

  const filterData = {
    page: page + 1,
    limit: limit,
    from_date: fromdDate,
    to_date: toDate,
    company_id: company_id,
    email: email,
    sandbox_name: sandboxName,
    termination_status: termination_status
  };

  const fetchReportData = async (filterData) => {
    setLoading(true);
    const res = await listEnrollmentReport(filterData);
    if (res?.status === "success") {
      setLoading(false);
      setSandboxEnrollmentData(res?.data?.data);
      setTotalRows(res?.data?.pagination?.total);
    }
  };
  useEffect(() => {
    fetchReportData(filterData);
  }, [page, limit]);

  useEffect(() => {
    const fetchSandbox = async () => {
      const res = await listSandboxes(company_id, "");
      if (res?.status === "success") {
        setSandboxes(
          res?.data?.map((sandbox) => ({
            value: sandbox?.sandbox_slug,
            label: sandbox?.sandbox_name,
          }))
        );
      }
    }
    fetchSandbox();
  }, []);

  const handleSearch = () => {
    setPage(0);
    if (page === 0) {
      fetchReportData(filterData);
    }
  };

  const handleClear = () => {
    setEmail("");
    setPage(0);
    setLimit(10);
    setSandboxName([]);
    setFromDate("");
    setToDate(moment().format('YYYY-MM-DD'));
    set_termination_status("");
    const filterData = {
      page: page + 1,
      limit: 10,
      from_date: "",
      to_date: moment().format('YYYY-MM-DD'),
      company_id: company_id,
      email: "",
      sandbox_name: [],
      termination_status: ""
    };
    if (page === 0) {
      fetchReportData(filterData);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {/* Filter */}
      <div className="research-report">
        <Accordion expanded={expanded}>
          <div className='course-heading-block'>
            <AccordionSummary>
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
                    <label>Email</label>
                  </div>
                  <div className="input-box custom-input-box">
                    <input
                      type="email"
                      id="email"
                      placeholder="E.g. abc@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="box-1 select-box custom-select-box">
                  <div className="head">
                    <label>Sandbox Name</label>
                  </div>
                  <div className="select-box">
                    <Select
                      value={sandboxName}
                      onChange={(e) => setSandboxName(e)}
                      options={sandboxes}
                      isMulti={true}
                      placeholder="Search Sandbox"
                    />
                  </div>
                </div>
                <div className="box-1 select-box">
                  <div className="head">
                    <label>Termination Status</label>
                  </div>
                  <div className="select-box">
                    <i className="icon icon-dropdown"></i>
                    <select value={termination_status} onChange={(e) => set_termination_status(e.target.value)}>
                      <option value="">Select Termination Status</option>
                      {
                        terminationStatus.map((row) => {
                          return (<option key={row.value} value={row.value}>
                            {row.label}
                          </option>
                          );
                        })
                      }
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-box-group">
                <div className="date-box select-box">
                  <div className="head">
                    <label>From</label>
                  </div>
                  <div className="input-box custom-input-box">
                    <input
                      type="date"
                      id="from_date"
                      placeholder="E.g. dd/mm/yyyy"
                      max={new Date().toISOString().split("T")[0]}
                      value={fromdDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>
                </div>
                <div
                  className="date-box select-box"
                  style={{ marginTop: "200px" }}
                >
                  <div className="head">
                    <label>To</label>
                  </div>
                  <div className="input-box custom-input-box">
                    <input
                      type="date"
                      id="to_date"
                      placeholder="E.g. dd/mm/yyyy"
                      max={new Date().toISOString().split("T")[0]}
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="btn-group" style={{ marginTop: "20px" }}>
                  <button
                    className={`btn btnMain btn-rounded`}
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                  <button
                    className={`btn btnMain btn-rounded`}
                    onClick={handleClear}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <TableContainer component={Paper} className="table-content">
        {!loading ? <Table className="custom-sandbox-table">
          <TableHead>
            <TableRow>
              <TableCell align="center" className="table-heading">
                S.No
              </TableCell>
              <TableCell className="course-name table-heading" align="center">
                User Name
              </TableCell>
              <TableCell className="workspace-name table-heading mw-250" align="center">
                Sandbox Name
              </TableCell>
              <TableCell className="workspace-name table-heading mw-250" align="center">
                Enrollment Period
              </TableCell>
              <TableCell align="center" className="table-heading mw-125">
                Enrolled Date
              </TableCell>
              <TableCell align="center" className="table-heading mw-125">
                Enrollment End Date
              </TableCell>
              <TableCell align="center" className="table-heading mw-125">
                Sandbox Termination Date
              </TableCell>
              <TableCell align="center" className="table-heading mw-125">
                Sandbox Usage (In Weeks)
              </TableCell>
              <TableCell align="center" className="table-heading">
                Sandbox Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sandboxEnrollmentData?.length > 0 ? sandboxEnrollmentData?.map((data, index) => (
              <TableRow key={index}>
                <TableCell align="center">{page * limit + index + 1}</TableCell>
                <TableCell align="center">{data.user_email}</TableCell>
                <TableCell align="center">{data.sandbox_name}</TableCell>
                <TableCell align="center">{`${data?.enrollment_period} Week(s)`}</TableCell>
                <TableCell align="center" className='mw-135'>{moment.utc(data.start_date).format("DD MMM YYYY, HH:mm:ss")}</TableCell>
                <TableCell align="center" className='mw-135'>{moment.utc(data.end_date).format("DD MMM YYYY, HH:mm:ss")}</TableCell>
                <TableCell align="center" className='mw-135'>
                  {data.sandbox_termination_date ? moment.utc(data.sandbox_termination_date).format("DD MMM YYYY, HH:mm:ss") : '-'}
                </TableCell>
                <TableCell align="center" className='mw-135'>{`${data?.sandbox_usage} Week(s)`}</TableCell>
                <TableCell align="center"> {calculateSandboxStatus(data.sandbox_termination_date, data.end_date, data.sandbox_start_date)}</TableCell>
              </TableRow>
            ))
              : (
                <TableRow>
                  <TableCell align="center" colSpan={9}>No Record(s) Found</TableCell>
                </TableRow>)}
          </TableBody>
        </Table> : (<div className="custom-sandbox-div">
          <PulseLoader />
        </div>)}
      </TableContainer>
      {sandboxEnrollmentData?.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[2, 5, 10, 25, { label: "All", value: totalRows }]}
          component="div"
          count={totalRows}
          rowsPerPage={limit}
          page={page}
          SelectProps={{
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      )}
    </>
  );
}

export default CustomSandboxEnrollmentTable;
