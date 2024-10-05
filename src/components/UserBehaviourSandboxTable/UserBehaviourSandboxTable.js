import { useEffect, useState } from "react";
import "./UserBehaviourSandboxTable.scss";
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
import { useForm } from "react-hook-form";
import moment from "moment";
import { PulseLoader } from "../Loader/Loader";
import { Chart } from "react-google-charts";
import { getUserSandboxBehaviourReport } from "src/services/Lab-services/services";
import { getTeamValues } from "src/services/reports/services";
import ThreatLevelDefinitionTable from "../ThreatLevelDefinitionTable/ThreatLevelDefinitionTable";
import TablePaginationActions from "../Pagination/Pagination";

const UserBehaviourSandboxTable = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const startDate = moment().subtract(1, "months").format("YYYY-MM-DD");
  const endDate = moment().format("YYYY-MM-DD");
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState({});
  const [page, setPage] = useState(0);
  const [category_names, setCategory_names] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [SelectedTask_name, setSelectedTask_name] = useState(null);
  const [expanded, setExpanded] = useState(true);
  const [teamsInfo, setTeamsInfo] = useState(null);
  const [teamId, setTeamId] = useState("");
  const [search, setSearch] = useState({
    start_date: startDate,
    end_date: endDate,
  });
  const [userEmail, setUserEmail] = useState("");

  const caty_names = [
    { id: 1, name: "AWS" },
    { id: 2, name: "Azure" },
    { id: 3, name: "Google Cloud" },
    { id: 5, name: "Power BI Sandbox" },
  ];

  const LabReportData = async () => {
    setLoading(true);
    setCategory_names(caty_names);
    const data1 = {
      platform_id: process.env.REACT_APP_PLATFORM_ID_LABS,
      email: userEmail,
      current_page_number: page + 1,
      category_id:
        selectedCategory === null || selectedCategory === "ALL"
          ? ""
          : selectedCategory,
      rows_per_page: rowsPerPage,
      task_slug:
        SelectedTask_name === null || SelectedTask_name === "ALL"
          ? ""
          : SelectedTask_name,
      team_id: teamId === "ALL" ? "" : teamId,
      start_date: search.start_date,
      end_date: search.end_date,
    };
    const res = await getUserSandboxBehaviourReport(data1);
    if (res?.data?.status === true) {
      setReports(res.data.data.data);
      setTotalRows(res.data.data.pagination.total * 1);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!reports) {
      LabReportData();
    }
  }, [reports]);

  useEffect(() => {
    let formData1 = {
      page: page,
      rowPerPage: rowsPerPage,
    };
    LabReportData(formData1);
    listTeamsValues();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setValue("page", newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setValue("page", 0);
    setValue("rows", parseInt(event.target.value, 10));
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const listTeamsValues = async () => {
    const response = await getTeamValues();
    if (response?.status === "success") {
      setTeamsInfo(response?.data);
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    setValue("page", 0);
    setPage(0);
    const requestData = {
      platform_id: process.env.REACT_APP_PLATFORM_ID_LABS,
      category_id:
        selectedCategory === null || selectedCategory === "ALL"
          ? ""
          : selectedCategory,
      rows_per_page: rowsPerPage,
      current_page_number: page + 1,
      task_slug:
        SelectedTask_name === null || SelectedTask_name === "ALL"
          ? ""
          : SelectedTask_name,
      team_id: teamId === "ALL" ? "" : teamId,
      start_date: search?.start_date,
      end_date: search?.end_date,
      email: userEmail,
    };

    const res = await getUserSandboxBehaviourReport(requestData);
    setReports(res?.data?.data?.data);
    setTotalRows(res?.data?.data?.pagination?.total * 1);
    setLoading(false);
  };

  const handleClear = () => {
    setValue("page", 0);
    setPage(0);
    setRowsPerPage(10);
    setUserEmail("");
    setTeamId("");
    setSearch({ start_date: startDate, end_date: endDate });
    setSelectedCategory(null);
    setSelectedTask_name(null);
    reset({
      category_name: "",
      lab_name: "",
      page: 10,
      rows: 1,
      rows_per_page: 10,
      current_page_number: 1,
      task_slug: "",
      team_id: "",
      start_date: startDate,
      end_date: endDate,
      email: "",
    });
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page + 1) * rowsPerPage - reports.length) : 0;

  const roundToTwo = (num) => {
    return +(Math.round(num + "e+2") + "e-2");
  };

  const totalAttemptsFunc = (arr) => {
    if (Array.isArray(arr)) {
      return arr.reduce((total, ele) => total + Number(ele?.totalcount), 0);
    }
  };
  const extremelyPoorFunc = (arr) => {
    if (Array.isArray(arr)) {
      return arr?.reduce(
        (total, ele) => total + Number(ele?.threat_very_high_count),
        0
      );
    }
  };
  const poorFunc = (arr) => {
    if (Array.isArray(arr)) {
      return arr?.reduce(
        (total, ele) => total + Number(ele?.threat_high_count),
        0
      );
    }
  };

  const badFunc = (arr) => {
    if (Array.isArray(arr)) {
      return arr?.reduce(
        (total, ele) => total + Number(ele?.threat_medium_count),
        0
      );
    }
  };

  const moderateFunc = (arr) => {
    if (Array.isArray(arr)) {
      return arr?.reduce(
        (total, ele) => total + Number(ele?.threat_moderate_count),
        0
      );
    }
  };

  const goodAttemptFunc = (arr) => {
    if (Array.isArray(arr)) {
      return arr?.reduce(
        (total, ele) => total + Number(ele?.threat_neutral_count),
        0
      );
    }
  };

  let totalAttempts = totalAttemptsFunc(reports);
  let extremelyPoorTotal = extremelyPoorFunc(reports);
  let poorTotal = poorFunc(reports);
  let badTotal = badFunc(reports);
  let moderateTotal = moderateFunc(reports);
  let goodTotal = goodAttemptFunc(reports);

  const dataPieGoogle = [
    ["ThreatLevel", "Count"],
    ["Extremely Poor", extremelyPoorTotal],
    ["Poor", poorTotal],
    ["Bad", badTotal],
    ["Moderate", moderateTotal],
    ["Good", goodTotal],
  ];

  const dataBarGoogle = [
    ["Sandbox Attempt Behaviour", "Count", { role: "style" }],
    ["Extremely Poor", extremelyPoorTotal, "#dc3912"],
    ["Poor", poorTotal, "#ff9900"],
    ["Bad", badTotal, "#FFD700"],
    ["Moderate", moderateTotal, "#3366cc"],
    ["Good", goodTotal, "#109618"],
  ];

  const optionsPie = {
    title: "User Behaviour Sandbox Analytics Pie Chart",
    colors: ["#dc3912", "#ff9900", "#FFD700", "#3366cc", "#109618"],
    is3D: true,
  };

  const optionsBar = {
    chart: {
      title: "User Behaviour Sandbox Analytics Bar Chart",
      colors: ["#dc3912", "#ff9900", "#FFD700", "#3366cc", "#109618"],
    },
  };

  return (
    <div className="user-behaviour-sandbox-block">
      <h3>User Behaviour Sandbox Analytics Report</h3>
      {reports?.length > 0 && (
        <div className="pie_bar_chart_section">
          <p>
            Below chart and graph's data are presented based on{" "}
            <strong>{totalAttempts}</strong> total number of attempts:
          </p>
          <div className="pie_bar_chart">
            <Chart
              chartType="Bar"
              data={dataBarGoogle}
              options={optionsBar}
              width={"500px"}
              height={"400px"}
            />
            <Chart
              chartType="PieChart"
              data={dataPieGoogle}
              options={optionsPie}
              width={"100%"}
              height={"400px"}
            />
          </div>
        </div>
      )}
      <ThreatLevelDefinitionTable />
      <div className="research-report">
        <Accordion expanded={expanded}>
          <div className="course-heading-block">
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
            <form
              className="filter-block"
              action="#"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="input-box-group">
                <div className="box select-box">
                  <div className="head">
                    <label>Category Name</label>
                  </div>
                  <div className="select-box">
                    <i className="icon icon-dropdown"></i>
                    <select
                      {...register("category_name")}
                      defaultValue=""
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                      }}
                    >
                      <option value={null}>ALL</option>
                      {category_names &&
                        category_names.map((row, index) => {
                          return (
                            <option
                              key={index}
                              value={row.id}
                              selected={
                                selectedCategory === row.id ? true : false
                              }
                            >
                              {row.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                <div className="box select-box">
                  <div className="head">
                    <label>Email</label>
                  </div>
                  <div className="input-box custom-input-box">
                    <input
                      type="hidden"
                      id="page"
                      defaultValue={page}
                      {...register("page")}
                    />
                    <input
                      type="hidden"
                      id="rows"
                      defaultValue={rowsPerPage}
                      {...register("rows")}
                    />
                    <input
                      type="email"
                      id="email"
                      value={userEmail}
                      placeholder="E.g. abc@gmail.com"
                      onChange={(e) => setUserEmail(e.target.value)}
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
                      onChange={(e) => setTeamId(e.target.value)}
                    >
                      <option value={null}>ALL</option>
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
                <div className="box select-box">
                  <div className="head">
                    <label>Start Date</label>
                  </div>
                  <div className="input-box custom-input-box">
                    <input
                      type="date"
                      id="from_date"
                      value={search?.start_date}
                      placeholder="E.g. dd/mm/yyyy"
                      onChange={(e) =>
                        setSearch({ ...search, start_date: e.target.value })
                      }
                    />
                    <div className="errormsg">{errors?.email?.message}</div>
                  </div>
                </div>
                <div className="box select-box">
                  <div className="head">
                    <label>End Date</label>
                  </div>
                  <div className="input-box custom-input-box">
                    <input
                      type="date"
                      id="to_date"
                      value={search?.end_date}
                      max={new Date().toISOString().split("T")[0]}
                      placeholder="E.g. dd/mm/yyyy"
                      onChange={(e) =>
                        setSearch({ ...search, end_date: e.target.value })
                      }
                    />
                    <div className="errormsg">{errors?.email?.message}</div>
                  </div>
                </div>
              </div>
              <div className="btn-group mt-5">
                <button className={`btn btnMain btn-rounded`}>Search</button>
                <button
                  className={`btn btnMain btn-rounded btn-clr`}
                  onClick={handleClear}
                >
                  Clear
                </button>
              </div>
            </form>
          </AccordionDetails>
        </Accordion>
      </div>

      {/* table */}
      <TableContainer component={Paper} className="table-content">
        <Table className="practice-report-table">
          {!loading ? (
            <>
              <TableHead>
                <TableRow>
                  <TableCell align="center" className="table-heading">
                    S.No
                  </TableCell>
                  <TableCell align="left" className="table-heading">
                    Email
                  </TableCell>
                  <TableCell align="center" className="table-heading">
                    Total Attempts
                  </TableCell>
                  <TableCell align="center" className="table-heading">
                    Total Allocated Time (HH:MM:SS)
                  </TableCell>
                  <TableCell align="center" className="table-heading">
                    Total Utilized Time (HH:MM:SS)
                  </TableCell>
                  <TableCell align="center" className="table-heading">
                    Extremely Poor
                  </TableCell>
                  <TableCell align="center" className="table-heading">
                    Poor
                  </TableCell>
                  <TableCell align="center" className="table-heading">
                    Bad
                  </TableCell>
                  <TableCell align="center" className="table-heading">
                    Moderate
                  </TableCell>
                  <TableCell align="center" className="table-heading">
                    Good Attempt
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports?.length > 0 ? (
                  reports?.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="content-box" align="center">
                        <div>{i + 1 + rowsPerPage * page}</div>
                      </TableCell>
                      <TableCell className="content-box" align="left">
                        <div>{row.email}</div>
                      </TableCell>
                      <TableCell className="content-box" align="center">
                        <div>{row.totalcount}</div>
                      </TableCell>
                      <TableCell className="content-box" align="center">
                        <div>
                          {moment
                            .utc(row.totalAllocatedDuration * 1000)
                            .format("HH:mm:ss")}
                        </div>
                      </TableCell>
                      <TableCell className="content-box" align="center">
                        <div>
                          {moment
                            .utc(row.totalduration * 1000)
                            .format("HH:mm:ss")}
                        </div>
                      </TableCell>
                      <TableCell className="content-box" align="center">
                        <div>
                          {Number(row.threat_very_high_count) === 0
                            ? row.threat_very_high_count
                            : `${row.threat_very_high_count} => (${roundToTwo(
                                (Number(row.threat_very_high_count) /
                                  Number(row.totalcount)) *
                                  100
                              )}%)`}
                        </div>
                      </TableCell>
                      <TableCell className="content-box" align="center">
                        <div>
                          {Number(row.threat_high_count) === 0
                            ? row.threat_high_count
                            : `${row.threat_high_count} => (${roundToTwo(
                                (Number(row.threat_high_count) /
                                  Number(row.totalcount)) *
                                  100
                              )}%)`}
                        </div>
                      </TableCell>
                      <TableCell className="content-box" align="center">
                        <div>
                          {Number(row.threat_medium_count) === 0
                            ? row.threat_medium_count
                            : `${row.threat_medium_count} => (${roundToTwo(
                                (Number(row.threat_medium_count) /
                                  Number(row.totalcount)) *
                                  100
                              )}%)`}
                        </div>
                      </TableCell>
                      <TableCell className="content-box" align="center">
                        <div>{row.threat_moderate_count}</div>
                      </TableCell>
                      <TableCell className="content-box" align="center">
                        <div>{row.threat_neutral_count}</div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell className="tab-no-result" colSpan={10}>
                      No Result Found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </>
          ) : (
            <div className="react-loader">
              <PulseLoader />
            </div>
          )}
        </Table>
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
    </div>
  );
};
export default UserBehaviourSandboxTable;
