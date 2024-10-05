import { useEffect, useState } from "react";
import { sd } from "../CustomCode/CustomCode";
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
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  getCertificateReport,
  getTeamValues,
} from "src/services/reports/services";
import { Button } from "@material-ui/core";
import { jsPDF } from "jspdf";
import ModalPreview from "../ModalPreview/ModalPreview";
import { Download } from "@mui/icons-material";
import { CSVLink } from "react-csv";
import { PulseLoader } from "../Loader/Loader";
import TablePaginationActions from "../Pagination/Pagination";
import "./CertificateReportTable.scss";

const CertificateTable = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [certificateData, setCertificateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [teamsInfo, setTeams] = useState(false);
  const [modal, setModal] = useState(false);
  const [certImg, setCertImg] = useState("");
  const [coursName, setCoursName] = useState("");
  const [reqData, setReqData] = useState({
    team_id: "",
    email: "",
    startdate: "",
    enddate: "",
  });

  const formData = {
    email: reqData.email,
    startdate: reqData.startdate,
    enddate: reqData.enddate,
    teamId: reqData.team_id,
    page: page,
    rows: rowsPerPage,
  };

  const listcertificateReport = async (formData) => {
    setLoading(true);
    const response = await getCertificateReport(formData);
    if (response?.status === true) {
      setLoading(false);
      setCertificateData(response?.data);
      setTotalRows(response?.pagination.total);
    }
  };

  const listTeamsValues = async () => {
    const response = await getTeamValues();
    if (response.status === "success") {
      setTeams(response?.data);
    }
  };

  useEffect(() => {
    listcertificateReport(formData);
    listTeamsValues();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClear = () => {
    setRowsPerPage(10);
    setPage(0);
    if (page === 0) {
      listcertificateReport(formData);
    }
  };

  const handleAdvfilter = (e) => {
    setPage(0);
    if (page === 0) {
      listcertificateReport(formData);
    }
  };

  const previewOpen = (row) => {
    setModal(true);
    setCertImg(row.certificate_image);
    setCoursName(row.course_name);
  };
  const previewClose = () => {
    setModal(false);
  };

  const handleDownload = async (props) => {
    const doc = new jsPDF("l", "mm");
    const WIDTH = doc.internal.pageSize.getWidth();
    const HEIGHT = doc.internal.pageSize.getHeight();
    let url = props.certificate_image.includes("whizlabs-certificate")
      ? process.env.REACT_APP_WEB_MEDIA_URL
      : process.env.REACT_APP_B2B_PROFILE_URL;
    fetch(`${url + props.certificate_image}`, {
      headers: {
        "X-Requested-With": "whizlabs",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.blob())
      .then((imageBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageBlob);
        reader.onloadend = function () {
          const base64data = reader.result;
          doc.addImage(base64data, "PNG", 0, 0, WIDTH, HEIGHT);
          doc.save(`${props.course_name} Certificate.pdf`);
        };
      });
  };
  const headers = [
    { label: "S.No", key: "no" },
    { label: "Username", key: "username" },
    { label: "Email", key: "email" },
    { label: "Course Name", key: "course_name" },
    { label: "Created Date", key: "date" },
  ];

  let exportData =
    certificateData?.length > 0
      ? certificateData?.map((value, i) => {
          return value;
        })
      : [];

  exportData = certificateData?.map((itm, i) => ({
    ...itm,
    no: i + 1,
    username: itm.firstname
      ? itm.firstname
      : "" + itm.lastname
      ? itm.lastname
      : "",
    date: new Date(itm.created_at).toLocaleDateString(),
  }));

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - certificateData.length)
      : 0;
  return (
    <>
      {/*Enrollment-report */}
      <div className="research-report">
        <Accordion expanded={expanded}>
          <div className="course-heading-block">
            <div className="title">Certificate Reports</div>
            <div
              className="research-report excel-download"
              style={{ margin: "0 8px 0 5px" }}
            >
              <Button className="btn-report btn-user">
                <CSVLink
                  className="csv-link"
                  headers={headers}
                  data={exportData ? exportData : ""}
                  filename={`Certificate Report_${new Date().toLocaleDateString()}`}
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
                  </div>
                </div>
                <div className="box select-box">
                  <div className="head">
                    <label>Team Name</label>
                  </div>
                  <div className="select-box">
                    <i className="icon icon-dropdown"></i>
                    <select
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
              <div className="input-box-group">
                <div className="date-box select-box">
                  <div className="head">
                    <label>From</label>
                  </div>
                  <div className="input-box custom-input-box">
                    <input
                      type="date"
                      id="from_date"
                      max={new Date().toISOString().split("T")[0]}
                      placeholder="E.g. dd/mm/yyyy"
                      value={reqData.startdate}
                      onChange={(e) => {
                        setReqData((prev_value) => ({
                          ...prev_value,
                          startdate: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className="date-box select-box">
                  <div className="head">
                    <label>To</label>
                  </div>
                  <div className="input-box custom-input-box">
                    <input
                      type="date"
                      id="to_date"
                      min={reqData.startdate}
                      max={new Date().toISOString().split("T")[0]}
                      placeholder="E.g. dd/mm/yyyy"
                      value={reqData.enddate}
                      onChange={(e) => {
                        setReqData((prev_value) => ({
                          ...prev_value,
                          enddate: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="btn-group mt-5">
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
          <Table className="certificate-report-table">
            <TableHead>
              <TableRow>
                <TableCell align="left" className="table-heading">
                  S.No
                </TableCell>
                <TableCell className="course-name table-heading" align="left">
                  User Name
                </TableCell>
                <TableCell align="left" className="table-heading">
                  Email
                </TableCell>
                <TableCell align="left" className="table-heading">
                  Course Name
                </TableCell>
                <TableCell align="center" className="table-heading">
                  Created At
                </TableCell>
                <TableCell align="center" className="table-heading">
                  Download
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {certificateData?.length > 0 &&
                certificateData?.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="content-box">
                      <div>{i + 1 + rowsPerPage * page}</div>
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
                      <div>{row.course_name}</div>
                    </TableCell>
                    <TableCell className="content-box" align="center">
                      <div>{sd(row.created_at)}</div>
                    </TableCell>
                    <TableCell className="content-box download" align="center">
                      <div onClick={() => handleDownload(row)}>
                        <DownloadIcon />
                      </div>
                      <div onClick={() => previewOpen(row)}>
                        <VisibilityIcon />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              {!certificateData.length && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell style={{ textAlign: "center" }} colSpan={8}>
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
      {certificateData?.length > 0 && (
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
      {/* Certificate Preview */}
      <ModalPreview
        open={modal}
        handleClose={previewClose}
        certImg={certImg}
        course_name={coursName}
      />
    </>
  );
};
export default CertificateTable;
