import { useEffect, useLayoutEffect, useState } from "react";
import { Table, AccordionSummary, AccordionDetails, Accordion, Paper, TableBody, TableContainer, TableHead, TableRow, TableCell, TablePagination,} from "@material-ui/core";
import { getPTReportCourses, getCourseQuizes, getPracticeTest, getTeamValues,} from "src/services/reports/services";
import { useForm } from "react-hook-form";
import moment from "moment";
import { Button } from "@material-ui/core";
import Select from "react-select";
import {  Download } from "@mui/icons-material";
import { CSVLink } from "react-csv";
import { PulseLoader } from "../Loader/Loader";
import TablePaginationActions from "../Pagination/Pagination";
import "./PracticeTestTable.scss";

const PracticeTestTable = (props) => {
  const { formState: { errors },} = useForm();
  const [reports, setReports] = useState([]);
  const [reportCourses, setReportCourses] = useState(false);
  const [courseQuizes, setCourseQuizes] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [teamsInfo, setTeams] = useState(false);
  const [reqData, setReqData] = useState({
    course_id: "",
    quiz_id: "",
    team_id: "",
    email: "",
    startdate: "",
    enddate: "",
    attempt: 0,
  });
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const formValues = {
      attempt: reqData.attempt,
      course: reqData.course_id?.value,
      email: reqData.email,
      enddate: reqData.enddate,
      page: page,
      quiz: reqData.quiz_id?.value,
      rows: rowsPerPage,
      startdate: reqData.startdate,
      teamId: reqData.team_id,
    };
    setFormData(formValues);
  }, [reqData, page]);

  const practiceTestReports = async (formData) => {
    setLoading(true);
    const response = await getPracticeTest(formData);
    if (response.status === "success") {
      setLoading(false);
      setReports(response?.data);
      setTotalRows(response?.pagination?.total);
    }
  };

  const listCourseQuizes = async (course_id) => {
    const response = await getCourseQuizes(course_id);
    if (response.status === "success") {
      setCourseQuizes(response?.data);
    }
  };

  useLayoutEffect(() => {
    if (reqData.course_id) {
      listCourseQuizes(reqData.course_id.value);
    }
  }, [reqData.course_id]);

  const listReportCourses = async () => {
    const response = await getPTReportCourses();
    if (response.status === "success") {
      setReportCourses(response?.data);
    }
  };
  const listTeamsValues = async () => {
    const response = await getTeamValues();
    if (response.status === "success") {
      setTeams(response?.data);
    }
  };
  useLayoutEffect(() => {
    if (!reportCourses) {
      listReportCourses();
      listTeamsValues();
    }
  }, [reportCourses]);

  useLayoutEffect(() => {
    const formData = {
      attempt: reqData.attempt,
      course: reqData.course_id?.value,
      email: reqData.email,
      enddate: reqData.enddate,
      page: page,
      quiz: reqData.quiz_id?.value,
      rows: rowsPerPage,
      startdate: reqData.startdate,
      teamId: reqData.team_id,
    };
    practiceTestReports(formData);
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClear = () => {
    const clearRecord = {
      course_id: "",
      quiz_id: "",
      team_id: "",
      email: "",
      startdate: "",
      enddate: "",
      attempt: 0,
      teamId: null,
      page: page,
      rowsPerPage: rowsPerPage
    };
    setReqData(clearRecord);
    setFormData(clearRecord);
    setPage(0);
    setRowsPerPage(10);
    if (page === 0) {
      practiceTestReports(clearRecord);
    }
  };

  const handleAdvfilter = () => {
    setPage(0);
    if (page === 0) {
      practiceTestReports(formData);
    }
  };

  const targetHeight = 30;
  const customStyles = {
    control: (base) => ({
      ...base,
      height: 35,
      minHeight: 35,
    }),
    valueContainer: (base) => ({
      ...base,
      height: `${targetHeight - 1 - 1}px`,
      padding: "0 8px",
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: `${(targetHeight - 20 - 1 - 1) / 2}px`,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: `${(targetHeight - 20 - 1 - 1) / 2}px`,
    }),
    input: (base) => ({
      ...base,
      height: "30px",
    }),
  };
  const headers = [
    { label: "S.No", key: "no" },
    { label: "Course Name", key: "name" },
    { label: "Quiz Name", key: "quiz_name" },
    { label: "Attempt", key: "attempt_count" },
    { label: "Percentage", key: "percentage" },
    { label: "Grade", key: "result" },
    { label: "Time Taken", key: "time" },
    { label: "Mode", key: "mode" },
    { label: "Username", key: "user_name" },
    { label: "Email", key: "email" },
    { label: "Date", key: "date" },
  ];

  let exportData =
    reports?.length > 0
      ? reports?.map((value, i) => {
          return value;
        })
      : [];

  exportData = reports?.map((itm, i) => ({
    ...itm,
    no: i + 1,
    time: itm.duration
      ? moment.utc(itm.duration * 1 * 1000).format("HH:mm:ss")
      : "",
    date: new Date(itm.created_at).toLocaleDateString(),
  }));
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - reports.length) : 0;

  //function to get the max number of attempts
  const getMaxAttemptNumber = () => {
    if (reports) {
      let maxAttempt = 0;
      reports.forEach((entry) => {
        if (entry.attempt_count > maxAttempt) {
          maxAttempt = entry.attempt_count;
        }
      });
      return maxAttempt;
    }
  };

  return (
    <>
      {/* research-report */}
      <div className="research-report">
        <Accordion expanded={expanded}>
          <div className="course-heading-block">
            <div className="title">Practice Test Reports</div>
            <div
              className="research-report excel-download"
              style={{ margin: "0 8px 0 5px" }}
            >
              <Button className="btn-report btn-user">
                <CSVLink
                  className="csv-link"
                  headers={headers}
                  data={exportData ? exportData : ""}
                  filename={`Practice Test Report_${new Date().toLocaleDateString()}`}
                >
                  <Download />
                  <span> .CSV</span>
                </CSVLink>
              </Button>
            </div>
            <AccordionSummary>
              <div
                className="btn btn-filter"
                onClick={(e) => setExpanded(!expanded)}
              >
                <i className="icon icon-humburger"></i>
              </div>
            </AccordionSummary>
          </div>
          <AccordionDetails>
            {/* filter-block */}
            <div className="filter-block">
              <div className="input-box-group">
                <div className="box select-box">
                  <div className="head">
                    <label>Course Name</label>
                  </div>
                  <div className="select-box">
                    <Select
                      // isMulti={true}
                      value={reqData.course_id}
                      options={reportCourses}
                      styles={customStyles}
                      onChange={(e) => {
                        setReqData((prev_value) => ({
                          ...prev_value,
                          course_id: e,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className="box select-box">
                  <div className="head">
                    <label>Quiz Name</label>
                  </div>
                  <div className="select-box">
                    <Select
                      // isMulti={true}
                      value={reqData.quiz_id}
                      options={courseQuizes}
                      styles={customStyles}
                      onChange={(e) => {
                        setReqData((prev_value) => ({
                          ...prev_value,
                          quiz_id: e,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className="box select-box">
                  <div className="head">
                    <label>Email</label>
                  </div>
                  <div className="input-box custom-input-box">
                    <input
                      type="email"
                      id="email"
                      placeholder="E.g. abc@gmail.com"
                      value={reqData.email}
                      onChange={(e) => {
                        setReqData((prev_value) => ({
                          ...prev_value,
                          email: e.target.value,
                        }));
                      }}
                    />
                    <div className="errormsg">{errors?.email?.message}</div>
                  </div>
                </div>
              </div>
              <div className="input-box-group " style={{ marginTop: "10px" }}>
                <div className="box select-box">
                  <div className="head">
                    <label>Attempts</label>
                  </div>
                  <div className="select-box">
                    <i className="icon icon-dropdown"></i>
                    <select
                      id="attempts"
                      value={reqData.attempt}
                      onChange={(e) => {
                        setReqData((prev_value) => ({
                          ...prev_value,
                          attempt: Number(e.target.value),
                        }));
                      }}
                    >
                      <option value="">Select Attempts</option>
                      {[...Array(getMaxAttemptNumber())].map((x, i) => (
                        <option value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="box select-box">
                  <div className="head">
                    <label>From</label>
                  </div>
                  <div className="input-box custom-input-box">
                    <input
                      type="date"
                      id="from_date"
                      value={reqData.startdate}
                      max={new Date().toISOString().split("T")[0]}
                      placeholder="E.g. dd/mm/yyyy"
                      onChange={(e) => {
                        setReqData((prev_value) => ({
                          ...prev_value,
                          startdate: e.target.value,
                        }));
                      }}
                    />
                    <div className="errormsg">{errors?.email?.message}</div>
                  </div>
                </div>
                <div className="box select-box">
                  <div className="head">
                    <label>To</label>
                  </div>
                  <div className="input-box custom-input-box">
                    <input
                      type="date"
                      value={reqData.enddate}
                      id="to_date"
                      min={reqData.startdate}
                      max={new Date().toISOString().split("T")[0]}
                      placeholder="E.g. dd/mm/yyyy"
                      onChange={(e) => {
                        setReqData((prev_value) => ({
                          ...prev_value,
                          enddate: e.target.value,
                        }));
                      }}
                    />
                    <div className="errormsg">{errors?.email?.message}</div>
                  </div>
                </div>
              </div>
              <div className="input-box-group">
                <div className="box select-box">
                  <div className="head">
                    <label>Team Name</label>
                  </div>
                  <div className="select-box">
                    <i className="icon icon-dropdown"></i>
                    <select
                      value={reqData?.team_id}
                      onChange={(e) => {
                        setReqData((prev_value) => ({
                          ...prev_value,
                          team_id: Number(e.target.value),
                        }));
                      }}
                    >
                      <option value="">Select Team</option>
                      {teamsInfo ? (
                        teamsInfo.map((row, index) => {
                          return (
                            <option
                              {...(reqData.teamId === row.id ? "selected" : "")}
                              value={row.id}
                            >
                              {row.team_name}
                            </option>
                          );
                        })
                      ) : (
                        <option value="">Select Team</option>
                      )}
                    </select>
                  </div>
                </div>
              </div>
              <div className="btn-group">
                <button
                  className={`btn btnMain btn-rounded`}
                  onClick={handleAdvfilter}
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
          </AccordionDetails>
        </Accordion>
      </div>
      {/* table */}
      <TableContainer component={Paper} className="table-content">
        {!loading ? (
          <Table className="practice-report-table">
            <TableHead>
              <TableRow>
                <TableCell align="left" className="table-heading">
                  SNo
                </TableCell>
                <TableCell align="center" className="table-heading">
                  Course Name
                </TableCell>
                <TableCell align="left" className="table-heading">
                  Quiz Name
                </TableCell>
                <TableCell align="left" className="table-heading">
                  Attempt{" "}
                </TableCell>
                <TableCell align="center" className="table-heading">
                  Percentage
                </TableCell>
                <TableCell align="center" className="table-heading">
                  {" "}
                  Grade
                </TableCell>
                <TableCell align="center" className="table-heading">
                  Time Taken
                </TableCell>
                <TableCell align="center" className="table-heading">
                  Mode
                </TableCell>
                <TableCell
                  align="center"
                  className="table-heading"
                  style={{ width: "10%" }}
                >
                  Username
                </TableCell>
                <TableCell
                  align="center"
                  className="table-heading"
                  style={{ width: "150px" }}
                >
                  Email
                </TableCell>
                <TableCell align="center" className="table-heading">
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.length > 0 &&
                reports.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="content-box">
                      <div>{i + rowsPerPage * page + 1}</div>
                    </TableCell>
                    <TableCell className="course-name" align="left">
                      <div>{row.name}</div>
                    </TableCell>
                    <TableCell className="content-box" align="center">
                      <div>{row.quiz_name}</div>
                    </TableCell>
                    <TableCell className="content-box" align="center">
                      <div>{row.attempt_count}</div>
                    </TableCell>
                    <TableCell
                      className="content-box"
                      align="center"
                      style={{
                        color: row.result == "PASS" ? "#61D36B" : "#D5562F",
                      }}
                    >
                      <div>{row.percentage}%</div>
                    </TableCell>
                    <TableCell
                      className="content-box"
                      align="center"
                      style={{
                        color: row.result == "PASS" ? "#61D36B" : "#D5562F",
                      }}
                    >
                      <div>{row.result}</div>
                    </TableCell>
                    <TableCell className="content-box" align="center">
                      <div>
                        {moment.utc(row.duration * 1000).format("HH:mm:ss")}
                      </div>
                    </TableCell>
                    <TableCell className="content-box" align="center">
                      <div>{row.mode}</div>
                    </TableCell>
                    <TableCell
                      className="content-box"
                      align="center"
                      style={{ width: "10%" }}
                    >
                      <div>{row.user_name}</div>
                    </TableCell>
                    <TableCell
                      className="content-box"
                      align="center"
                      style={{ width: "150px" }}
                    >
                      <div>{row.email}</div>
                    </TableCell>
                    <TableCell className="date" align="center">
                      {moment(row.created_at).format("DD MMM, YYYY")}
                    </TableCell>
                  </TableRow>
                ))}
              {!reports.length && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell style={{ textAlign: "center" }} colSpan={12}>
                    No Result Found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        ) : (
          <div className="loader-div">
            <PulseLoader />
          </div>
        )}
      </TableContainer>
      {!loading
        ? reports.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[ 5, 10, 25, { label: "All", value: totalRows },]}
              component="div"
              count={totalRows} // This is what your request should be returning in addition to the current page of rows.
              rowsPerPage={rowsPerPage}
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
          )
        : ""}
    </>
  );
};
export default PracticeTestTable;
