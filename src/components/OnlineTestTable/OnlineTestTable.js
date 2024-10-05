import { useEffect, useState } from "react";
import {
  Table,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Paper,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
} from "@material-ui/core";
import {
  getOCReportCourses,
  getOnlineTest,
  getTeamValues,
  getCategory,
} from "src/services/reports/services";
import Slider from "@mui/material/Slider";
import { useForm } from "react-hook-form";
import moment from "moment";
import { Button } from "@material-ui/core";
import Select from "react-select";
import { Download } from "@mui/icons-material";
import { CSVLink } from "react-csv";
import { PulseLoader } from "../Loader/Loader";
import TablePaginationActions from "../Pagination/Pagination";
import "./OnlineTestTable.scss";

const OnlineTestTable = (props) => {
  const {
    register,
    formState: { errors },
  } = useForm();
  const [reports, setReports] = useState([]);
  const [reportCourses, setReportCourses] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [teamsInfo, setTeams] = useState(false);
  const [categorys, setCategorys] = useState([]);
  const [betweenValue, setBetweenValue] = useState([10, 50]);
  const [reqData, setReqData] = useState({
    course_ids: [],
    category_ids: [],
    team_id: "",
    email: "",
    startdate: "",
    enddate: "",
    percent: "",
    video_value: "",
  });

  const formData = {
    email: reqData.email,
    enddate: reqData.enddate,
    page: page,
    rows: rowsPerPage,
    startdate: reqData.startdate,
    teamId: reqData.team_id,
    percent: reqData.percent,
    greater_percent: betweenValue[0],
    less_percent: betweenValue[1],
    vid_percent_value: reqData?.video_value,
  };

  const onlineTestReports = async (formData) => {
    setLoading(true);
    const response = await getOnlineTest(formData);
    if (response?.status === "success") {
      setLoading(false);
      setReports(response?.data);
      setTotalRows(response?.pagination.total);
    }
  };
  const listReportCourses = async () => {
    const response = await getOCReportCourses();
    if (response?.status === "success") {
      setReportCourses(response?.data);
    }
  };
  const listTeamsValues = async () => {
    const response = await getTeamValues();
    if (response.status === "success") {
      setTeams(response?.data);
    }
  };
  const getCategorys = async () => {
    const response = await getCategory();
    if (response.status === "success") {
      setCategorys(response.data);
    }
  };

  useEffect(() => {
    if (!reportCourses) {
      listReportCourses();
      listTeamsValues();
      getCategorys();
    }
  }, [reportCourses]);

  useEffect(() => {
    onlineTestReports(formData);
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
      course_ids: [],
      category_ids: [],
      team_id: "",
      email: "",
      startdate: "",
      enddate: "",
      percent: "",
      video_value: "",
    };

    const newFormData = {
      email: "",
      enddate: "",
      page: "",
      rows: "",
      startdate: "",
      teamId: "",
      percent: "",
      greater_percent: betweenValue[0],
      less_percent: betweenValue[1],
      vid_percent_value: reqData?.video_value,
    };
    setPage(0);
    setReqData(clearRecord);
    const payload = { ...newFormData, course: [], category: [] };
    onlineTestReports(payload);
    setRowsPerPage(10);
    setBetweenValue([10, 50]);
  };
  const handleSliderChange = (event, newValue) => {
    setReqData((prev) => ({
      ...prev,
      percent: newValue,
    }));
    // setRowsPerPage(10);
    setPage(0);
  };
  const handleSliderChangeBetween = (event, newValue) => {
    setBetweenValue(newValue);
    // setRowsPerPage(10);
    setPage(0);
  };

  let courIds = [];
  let cateIds = [];
  const handleAdvfilter = async () => {
    if (reqData.course_ids) {
      reqData.course_ids.map((el) => {
        // console.log(el.value);
        courIds.push(el.value);
      });
    }
    if (reqData.category_ids) {
      reqData.category_ids.map((el) => {
        cateIds.push(el.value);
      });
    }
    setPage(0);
    const payload = { ...formData, course: courIds, category: cateIds };
    // console.log(payload);
    // console.log(formData);
    onlineTestReports(payload);
  };

  const percentage = (row) => {
    if (row.total_video_count == 0) return 0;
    const result = (row.completed_videos / row.total_video_count) * 100;
    return Math.round(result);
  };
  const headers = [
    { label: "S.No", key: "no" },
    { label: "Course Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Total Videos", key: "total_video_count" },
    { label: "Completed Videos", key: "completed_videos" },
    { label: "Completed Percentage", key: "completed_percentage" },
    { label: "Start Date", key: "start_date" },
    { label: "Last Accessed Date", key: "last_date" },
  ];

  let exportData = reports?.map((value, i) => {
    return value;
  });
  exportData = reports?.map((itm, i) => ({
    ...itm,
    no: i + 1,
    start_date: itm.created_at
      ? moment(itm.created_at).format("DD MMM, YYYY")
      : "",
    last_date: itm.DATE ? moment(itm.DATE).format("DD MMM, YYYY") : "",
    completed_percentage: `${percentage(itm)}%`
  }));
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - reports.length) : 0;

  const vidPercent = [
    { value: "", label: "None" },
    { value: 0, label: "Equals" },
    { value: 3, label: "Greater Than" },
    { value: 1, label: "Less Than" },
    { value: 2, label: "Between" },
  ];
  return (
    <>
      {/* research-report */}
      <div className="research-report">
        <Accordion expanded={expanded}>
          <div className="course-heading-block">
            <div className="title">Video Course Reports</div>
            <div
              className="research-report excel-download"
              style={{ margin: "0 8px 0 5px" }}
            >
              <Button className="btn-report btn-user">
                <CSVLink
                  className="csv-link"
                  headers={headers}
                  data={exportData ? exportData : ""}
                  filename={`Online Videos Report_${new Date().toLocaleDateString()}`}
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
              <div
                className="input-box-group"
                style={{ marginBottom: "10px", gap: "10px" }}
              >
                <div className="box select-box">
                  <div className="head">
                    <label>Course Name</label>
                  </div>
                  <div className="select-box">
                    <Select
                      value={reqData.course_ids}
                      onChange={(e) => {
                        setReqData((prev) => ({
                          ...prev,
                          course_ids: e,
                        }));
                      }}
                      options={reportCourses}
                      isMulti={true}
                    />
                  </div>
                </div>
                <div className="box select-box">
                  <div className="head">
                    <label>Category</label>
                  </div>
                  <div className="select-box">
                    <Select
                      value={reqData.category_ids}
                      onChange={(e) => {
                        setReqData((prev) => ({
                          ...prev,
                          category_ids: e,
                        }));
                      }}
                      options={categorys}
                      isMulti={true}
                    />
                  </div>
                </div>
                <div className="box select-box">
                  <div className="head">
                    <label>Completed Percentage</label>
                  </div>
                  <div className="select-box vid-box">
                    <Select
                      className="vid-percent"
                      value={reqData.video_value}
                      onChange={(e) => {
                        setReqData((prev) => ({
                          ...prev,
                          video_value: e,
                        }));
                      }}
                      options={vidPercent}
                    />
                    {reqData.video_value === 2 ? (
                      <Slider
                        aria-label="Temperature"
                        value={betweenValue}
                        onChange={handleSliderChangeBetween}
                        valueLabelDisplay="auto"
                      />
                    ) : reqData.video_value === 0 || 1 || 3 ? (
                      <Slider
                        aria-label="Temperature"
                        defaultValue={30}
                        value={
                          typeof reqData.percent === "number"
                            ? reqData.percent
                            : ""
                        }
                        onChange={handleSliderChange}
                        valueLabelDisplay="auto"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div
                className="input-box-group"
                style={{ marginBottom: "10px", gap: "10px" }}
              >
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
                        setReqData((prev) => ({
                          ...prev,
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
                      id="to_date"
                      value={reqData.enddate}
                      min={reqData.startdate}
                      max={new Date().toISOString().split("T")[0]}
                      placeholder="E.g. dd/mm/yyyy"
                      onChange={(e) => {
                        setReqData((prev) => ({
                          ...prev,
                          enddate: e.target.value,
                        }));
                      }}
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
                    <select
                      {...register("team_id")}
                      onChange={(e) => {
                        setReqData((prev) => ({
                          ...prev,
                          team_id: e.target.value,
                        }));
                      }}
                    >
                      <option value="">Select Team</option>
                      {teamsInfo ? (
                        teamsInfo.map((row, index) => {
                          return (
                            <option
                              {...(reqData.team_id === row.id
                                ? "selected"
                                : "")}
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
              <div className="input-box-group" style={{ marginBottom: "10px" }}>
                <div className="box select-box">
                  <div className="head">
                    <label>Email</label>
                  </div>
                  <div className="input-box custom-input-box">
                    <input
                      type="email"
                      id="email"
                      placeholder="E.g. abc@gmail.com"
                      onChange={(e) => {
                        setReqData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }));
                      }}
                      value={reqData.email}
                    />
                  </div>
                </div>
              </div>
              <div className="box select-box">
                  <div className="btn-group mt-5">
                    <button className={`btn btnMain btn-rounded`} onClick={handleAdvfilter}>Search</button>
                    <button className={`btn btnMain btn-rounded`} onClick={handleClear}>Clear</button>
                  </div>
                </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      {/* table */}
      <TableContainer component={Paper} className="table-content">
        {!loading ? (
          <Table className="online-report-table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className="table-heading">
                  S.No
                </TableCell>
                <TableCell className="course-name table-heading" align="center">
                  Course Name
                </TableCell>
                <TableCell align="center" className="table-heading">
                  Email
                </TableCell>
                <TableCell align="center" className="table-heading">
                  Total Videos
                </TableCell>
                <TableCell align="center" className="table-heading">
                  Completed Videos
                </TableCell>
                <TableCell align="center" className="table-heading">
                  Completed Percentage
                </TableCell>
                <TableCell align="center" className="table-heading">
                  Start Date
                </TableCell>
                <TableCell align="center" className="table-heading">
                  Last Accessed Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports?.length > 0 &&
                reports?.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="content-box">
                      <div>{i + 1 + page * rowsPerPage}</div>
                    </TableCell>
                    <TableCell className="course-name" align="center">
                      <div>{row.name}</div>
                    </TableCell>
                    <TableCell className="content-box" align="center">
                      <div>{row.email}</div>
                    </TableCell>
                    <TableCell className="content-box" align="center">
                      <div>{row.total_video_count}</div>
                    </TableCell>
                    <TableCell className="content-box" align="center">
                      <div>{row.completed_videos}</div>
                    </TableCell>
                    <TableCell className="content-box" align="center">
                      <div>{percentage(row)}%</div>
                    </TableCell>
                    <TableCell className="date" align="center">
                      {moment.utc(row.created_at).format("DD MMM, YYYY ")}
                    </TableCell>
                    <TableCell className="date" align="center">
                      {moment.utc(row.DATE).format("DD MMM, YYYY ")}
                    </TableCell>
                  </TableRow>
                ))}
              {!reports.length && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell style={{ textAlign: "center" }} colSpan={10}>
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
      {reports?.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: totalRows }]}
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
      )}
    </>
  );
};
export default OnlineTestTable;
