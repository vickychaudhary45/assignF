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
import { useForm } from "react-hook-form";
import moment from "moment";
import { getUserSandboxAttempts } from "src/services/Lab-services/services";
import SandboxModalDefault from "../SandboxModalDefault/SandboxModalDefault";
import { getTeamValues } from "src/services/reports/services";
import { Button } from "@material-ui/core";
import { Download } from "@mui/icons-material";
import { CSVLink } from "react-csv";
import { PulseLoader } from "../Loader/Loader";
import TablePaginationActions from "../Pagination/Pagination";
import "./SandboxReportTable.scss";

const SandboxReportTable = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const startDate = moment().subtract(1, "months").format("YYYY-MM-DD");
  const endDate = moment().format("YYYY-MM-DD");
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [page, setPage] = useState(0);
  const [category_names, setCategory_names] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const [open, setOpen] = useState(false);
  const [teamsInfo, setTeamsInfo] = useState(null);
  const [teamId, setTeamId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [search, setSearch] = useState({
    start_date: startDate,
    end_date: endDate,
  });
  const [apiData, setApiData] = useState({
    fk_user_id: null,
    fk_sandbox_id: null,
    start_date: null,
    end_date: null,
    user_email: null,
  });
  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const caty_names = [
    { id: 1, name: "AWS" },
    { id: 2, name: "Azure" },
    { id: 3, name: "Google Cloud" },
    { id: 5, name: "Power BI Sandbox" },
  ];

  async function LabReportData() {
    setOpen(false);
    setCategory_names(caty_names);

    setLoading(true);
    const data1 = {
      platform_id: process.env.REACT_APP_PLATFORM_ID_LABS,
      email: userEmail,
      category_id:
        selectedCategory === null || selectedCategory === "ALL"
          ? ""
          : selectedCategory,
      current_page_number: page + 1,
      team_id: teamId === "ALL" ? "" : teamId,
      rows_per_page: rowsPerPage,
      start_date: search?.start_date,
      end_date: search?.end_date,
    };

    getUserSandboxAttempts(data1).then((res) => {
      if (res?.data?.status === true) {
        let data = res?.data?.data?.data;
        data.map((row, index) => {
          row.sno = index + 1;
          return row;
        });
        setReports(data);
        setTotalRows(res.data.data.pagination.total * 1);
        setLoading(false);
      }
    });
  }
  useEffect(() => {
    if (!reports) {
      setOpen(false);
      LabReportData();
    }
  }, [reports]);

  async function listTeamsValues() {
    const response = await getTeamValues();
    if (response.status === "success") {
      setTeamsInfo(response?.data);
    }
  }

  useEffect(() => {
    // const formData = getValues();
    let formData1 = {
      page: page,
      rowPerPage: rowsPerPage,
    };
    setOpen(false);
    LabReportData(formData1);
    listTeamsValues();
  }, [page, rowsPerPage]);

  const handleClickOpen = (fkUserId, fkSandboxId, userEmail) => {
    setApiData({
      ...apiData,
      fk_user_id: fkUserId,
      fk_sandbox_id: fkSandboxId,
      start_date: search?.start_date,
      end_date: search?.end_date,
      user_email: userEmail,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const onSubmit = async (formData, e) => {
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
      task_slug: "",
      team_id: teamId === "ALL" ? "" : teamId,
      start_date: search?.start_date,
      end_date: search?.end_date,
      email: userEmail,
    };

    getUserSandboxAttempts(requestData).then((res) => {
      if (res?.data?.status === true) {
        let data = res.data.data.data;
        data.map((row, index) => {
          row.sno = index + 1;
          return row;
        });
        setReports(data);
        setTotalRows(res.data.data.pagination.total * 1);
        setLoading(false);
      }
    });
  };

  const handleClear = () => {
    setValue("page", 0);
    setPage(0);
    setRowsPerPage(10);
    setUserEmail("");
    setTeamId("");
    setSearch({
      start_date: startDate,
      end_date: endDate,
    });
    setSelectedCategory(null);
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
  const headers = [
    { label: "S.No", key: "no" },
    { label: "Email", key: "email" },
    { label: "Category Name", key: "category_name" },
    { label: "Sandbox Name", key: "sandbox_title" },
    { label: "Total Attempts", key: "eachusercount" },
    { label: "Total Allocated Duration", key: "total_time" },
    { label: "Total Consumed Duration", key: "used_time" },
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
    total_time: moment
      .utc(itm.totalAllocatedDurationUser * 1000)
      .format("HH:mm:ss"),
    used_time: moment.utc(itm.totaluserduration * 1000).format("HH:mm:ss"),
  }));

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page + 1) * rowsPerPage - reports.length) : 0;
  return (
    <>
      {/* research-report */}
      <div className="research-report">
        <Accordion expanded={expanded}>
          <div className="course-heading-block">
            <div className="title">Sandbox Reports</div>
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
            <form
              className="filter-block"
              action="#"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="input-box-group">
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
                    <label>Category Name</label>
                  </div>
                  <div className="select-box">
                    <i className="icon icon-dropdown"></i>
                    <select
                      {...register("category_name")}
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
              <div className="input-box-group ">
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
              <div className="input-box-group mt-5"></div>
              <div className="btn-group mt-5">
                <button className={`btn btnMain btn-rounded`}>Search</button>
                <button
                  className={`btn btnMain btn-rounded`}
                  style={{ marginLeft: "10px" }}
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
        <Table className="sandbox-report-table">
          {!loading ? (
            <>
              <TableHead>
                <TableRow>
                  <TableCell align="center" className="table-heading">
                    SNo
                  </TableCell>
                  <TableCell align="left" className="table-heading">
                    Email
                  </TableCell>
                  <TableCell align="center" className="table-heading">
                    Category
                  </TableCell>
                  <TableCell align="left" className="table-heading" width={200}>
                    Sandbox Name
                  </TableCell>
                  <TableCell align="center" className="table-heading">
                    Total Attempts
                  </TableCell>
                  <TableCell align="center" className="table-heading">
                    Total Allocated Duration
                  </TableCell>
                  <TableCell align="center" className="table-heading">
                    Total Consumed Duration
                  </TableCell>
                  <TableCell align="center" className="table-heading">
                    Detail{" "}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports?.length > 0 &&
                  reports?.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="content-box">
                        <div>{i + 1 + rowsPerPage * page}</div>
                      </TableCell>
                      <TableCell className="content-box" align="left">
                        <div>{row.email}</div>
                      </TableCell>
                      <TableCell className="content-box" align="center">
                        <div>{row.category_name}</div>
                      </TableCell>
                      <TableCell className="content-box" align="left">
                        <div>{row.sandbox_title}</div>
                      </TableCell>
                      <TableCell className="content-box" align="center">
                        <div>{row.eachusercount}</div>
                      </TableCell>
                      <TableCell className="content-box" align="center">
                        <div>
                          {moment
                            .utc(row.totalAllocatedDurationUser * 1000)
                            .format("HH:mm:ss")}
                        </div>
                      </TableCell>
                      <TableCell className="content-box" align="center">
                        <div>
                          {moment
                            .utc(row.totaluserduration * 1000)
                            .format("HH:mm:ss")}
                        </div>
                      </TableCell>
                      <TableCell
                        className="content-box"
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                          color: "#0066ff",
                        }}
                        align="center"
                      >
                        <div
                          onClick={() =>
                            handleClickOpen(
                              row.fk_user_id,
                              row.fk_sandbox_id,
                              row.email
                            )
                          }
                        >
                          Detail
                        </div>
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
            </>
          ) : (
            <div className="loader-div">
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
      {open && (
        <SandboxModalDefault
          open={open}
          handleClose={handleClose}
          apiData={apiData}
        />
      )}
    </>
  );
};
export default SandboxReportTable;
