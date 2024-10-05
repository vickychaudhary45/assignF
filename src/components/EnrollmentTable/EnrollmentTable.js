import { useLayoutEffect, useState } from "react";
import { sd } from "../CustomCode/CustomCode";
import {
  Table,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";
import {
  getEnrollmentReport,
  getTeamValues,
} from "src/services/reports/services";
import { useForm } from "react-hook-form";
import moment from "moment";
import { Button } from "@material-ui/core";
import { Download } from "@mui/icons-material";
import { CSVLink } from "react-csv";
import { PulseLoader } from "../Loader/Loader";
import { useAppState } from "src/stateManagement";
import "./EnrollmentTable.scss";

const EnrollmentTable = (props) => {
  const {
    formState: { errors },
  } = useForm();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [email, setEmail] = useState("");
  const [startdate, setStartdate] = useState("");
  const [teamId, setTeamId] = useState("");
  const [enddate, setEnddate] = useState("");
  const [teamsInfo, setTeams] = useState(false);
  const { state: App, update: AppUpdate } = useAppState();

  const filterData = {
    email: email,
    rows: rowsPerPage,
    page: page,
    startdate: startdate,
    enddate: enddate
      ? moment(enddate).add(1, "day").format("YYYY-MM-DD")
      : moment().add(1, "day").format("YYYY-MM-DD"),
    teamId: teamId,
    subscription: App.subscription,
    course: App.course,
  };
  const listenrollmentReport = async () => {
    setLoading(true);
    const response = await getEnrollmentReport(filterData);
    if (response?.status === true) {
      setEnrollmentData(response?.data);
      setLoading(false);
      setTotalRows(response?.pagination.total);
      AppUpdate("SET_SUBSCRIPTION", 0);
      AppUpdate("SET_COURSE", 0);
    }
  };

  useLayoutEffect(() => {
    listenrollmentReport();
  }, [page, rowsPerPage]);

  const listTeamsValues = async () => {
    const response = await getTeamValues();
    if (response.status === "success") {
      setTeams(response?.data);
    }
  };
  useLayoutEffect(() => {
    listTeamsValues();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleExpand = (e) => {
    setExpanded(!expanded);
  };

  const handleAdvfilter = () => {
    setPage(0);
    if (page === 0) {
      listenrollmentReport();
    }
  };

  const handleClear = () => {
    setEmail("");
    setPage(0);
    setRowsPerPage(10);
    setTeamId("");
    setStartdate("");
    setEnddate("");
    listTeamsValues();
    if (page === 0) {
      listenrollmentReport();
    }
  };

  const headers = [
    { label: "S.No", key: "no" },
    { label: "Name", key: "firstname" },
    { label: "Email", key: "email" },
    { label: "Enrollment Date", key: "date" },
    { label: "Product Name", key: "enrollments" },
  ];
  let exportData = enrollmentData?.map((value, i) => {
    value.date = value.enrollment_date
      ? sd(value.enrollment_date)
      : sd(value.enrollment_date);
    value.enrollments = value.subscription_name
      ? value.subscription_name
      : `${value.course_name}-${value.enrollment_type}`;

    return value;
  });
  exportData = enrollmentData?.map((row, i) => ({
    ...row,
    no: i + 1,
  }));

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - enrollmentData.length)
      : 0;

  return (
    <>
      <div className="research-report">
        <Accordion expanded={expanded}>
          <div className="course-heading-block">
            <div className="title">Enrollment Reports</div>
            <AccordionSummary>
              <div className="research-report excel-download">
                <Button className="btn-report btn-user">
                  <CSVLink
                    className="csv-link"
                    headers={headers}
                    data={exportData ? exportData : ""}
                    filename={`Enrollment Report_${new Date().toLocaleDateString()}`}
                  >
                    <Download />
                    <span> .CSV</span>
                  </CSVLink>
                </Button>
              </div>
              <div className="btn btn-filter" onClick={handleExpand}>
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
                    <label>Email</label>
                  </div>
                  <div className="input-box custom-input-box">
                    <input type="hidden" id="page" defaultValue={page} />
                    <input type="hidden" id="rows" defaultValue={rowsPerPage} />
                    <input
                      type="email"
                      id="email"
                      placeholder="E.g. abc@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="errormsg">{errors?.email?.message}</div>
                  </div>
                </div>
                <div className="box select-box">
                  <div className="head">
                    <label>Team Name</label>
                  </div>
                  <div className="select-box">
                    <i className="icon icon-dropdown"></i>
                    <select onChange={(e) => setTeamId(e.target.value)}>
                      <option value="">Select Team</option>
                      {teamsInfo ? (
                        teamsInfo.map((row, index) => {
                          return (
                            <option
                              {...(teamId === row.id ? "selected" : "")}
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
                      value={startdate}
                      onChange={(e) => setStartdate(e.target.value)}
                    />
                    <div className="errormsg">{errors?.email?.message}</div>
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
                      value={enddate}
                      onChange={(e) => setEnddate(e.target.value)}
                    />
                    <div className="errormsg">{errors?.email?.message}</div>
                  </div>
                </div>
              </div>
              <div className="btn-group" style={{ marginTop: "20px" }}>
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
          <Table className="enrollment-report-table">
            <TableHead>
              <TableRow>
                <TableCell align="left" className="table-heading">
                  S.No
                </TableCell>
                <TableCell className="course-name table-heading" align="left">
                  Name
                </TableCell>
                <TableCell align="left" className="table-heading">
                  Email
                </TableCell>
                <TableCell align="left" className="table-heading">
                  Enrollment Date
                </TableCell>
                <TableCell align="center" className="table-heading">
                  Product Name
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enrollmentData?.length > 0 &&
                enrollmentData?.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="content-box">
                      <div>{page * rowsPerPage + i + 1}</div>
                    </TableCell>
                    <TableCell className="course-name" align="left">
                      <div>
                        {row.firstname} {row.lastname}
                      </div>
                    </TableCell>
                    <TableCell className="content-box" align="left">
                      <div>{row.email}</div>
                    </TableCell>
                    <TableCell className="content-box" align="left">
                      <div>
                        {row.plan_id && row.plan_id !== 0
                          ? sd(row.enrollment_date)
                          : ""}
                        {row.course_id && row.course_id !== 0
                          ? sd(row.enrollment_date)
                          : ""}
                      </div>
                    </TableCell>
                    {row.plan_id !== 0 && (
                      <TableCell className="content-box" align="center">
                        <div>{row.subscription_name}</div>
                      </TableCell>
                    )}
                    {row.course_id !== 0 && (
                      <TableCell className="content-box" align="center">
                        <div>
                          {row.course_name}-{row.enrollment_type}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              {!enrollmentData.length && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell style={{ textAlign: "center" }} colSpan={6}>
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
    </>
  );
};
export default EnrollmentTable;
