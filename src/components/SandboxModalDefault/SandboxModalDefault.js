import { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { PulseLoader } from "../Loader/Loader";
import { useForm } from "react-hook-form";
import moment from "moment";
import { Table, Paper, TableBody, TableContainer, TableHead, TableRow, TableCell, TablePagination } from "@material-ui/core";
import { images } from "src/config/images";
import { getUserSandboxReports } from "src/services/Lab-services/services";
import { parseJwt } from "src/config/utils";
import { DialogTitle } from "../MUIComponents/MUIComponents";
import TablePaginationActions from "../Pagination/Pagination";
import "./SandboxModalDefault.scss";

const SandboxModalDefault = props => {
  const { apiData } = props;
  const { setValue } = useForm();
  const [reports, setReports] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);

  const emptyRows = page > 0 ? Math.max(0, (1 + page + 1) * rowsPerPage - reports.length) : 0;

  async function LabReportData() {
    const user_data = JSON.parse(localStorage.getItem("user_data"));
    const userInfo = parseJwt(user_data?.data.token);
    let user_id = userInfo.userId;
    let access = false;
    const data1 = {
      fk_user_id: apiData?.fk_user_id,
      sandbox_id: apiData?.fk_sandbox_id,
      current_page_number: page + 1,
      rows_per_page: rowsPerPage,
      start_date: apiData?.start_date,
      end_date: apiData?.end_date,
    };
    setLoading(true);
    getUserSandboxReports(data1).then(res => {
      if (res?.data?.status === true) {
        setReports(res.data.data.data);
        setTotalRows(res.data.data.pagination.total * 1);
        setLoading(false);
      }
    });
  }
  useEffect(() => {
    if (!reports) {
      LabReportData();
    }
  }, [reports]);

  useEffect(() => {
    // const formData = getValues();
    let formData1 = {
      page: page,
      rowPerPage: rowsPerPage,
    };
    LabReportData(formData1);
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setValue("page", newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setValue("page", 0);
    setValue("rows", parseInt(event.target.value, 10));
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {props.open && (
        <Dialog className="modal-default" onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
          <div className="modal">
            <div className="modal-head">
              <figure>
                <img className="img-full" src={images.subs_color} alt="" />
              </figure>
              <div className="caption">
                <span>{apiData?.user_email}</span>
              </div>
              <DialogTitle id="customized-dialog-title" onClose={props.handleClose}></DialogTitle>
            </div>
            <div className="modal-container">
              <TableContainer component={Paper} className="table-content">
                <Table className="practice-report-table">
                  {!loading ? (
                    <>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">SNo</TableCell>
                          <TableCell align="left">Start Time</TableCell>
                          <TableCell align="center">End Time</TableCell>
                          <TableCell align="center">User End Time</TableCell>
                          <TableCell align="center">Total Duration(HH:MM:SS)</TableCell>
                          <TableCell align="center">Total Consumed Duration(HH:MM:SS)</TableCell>
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
                                <div>{moment(row.start_time).format("DD MMM, YYYY HH:mm:ss")}</div>
                              </TableCell>
                              <TableCell className="content-box" align="center">
                                <div>{moment(row.end_time).format("DD MMM, YYYY HH:mm:ss")}</div>
                              </TableCell>
                              <TableCell className="content-box" align="center">
                                <div>{moment(row.user_end_time).format("DD MMM, YYYY HH:mm:ss")}</div>
                              </TableCell>
                              <TableCell className="content-box" align="center">
                                <div>{moment.utc(row.given_time * 1000).format("HH:mm:ss")}</div>
                              </TableCell>
                              <TableCell className="content-box" align="center">
                                <div>{moment.utc(row.time_taken * 1000).format("HH:mm:ss")}</div>
                              </TableCell>
                            </TableRow>
                          ))}
                        {!reports.length && (
                          <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell style={{ textAlign: "center" }} colSpan={6}>
                              No Result Found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </>
                  ) : (
                    <div style={{ display: "flex", alignSelf: "center" }}>
                      <PulseLoader />
                    </div>
                  )}
                </Table>
              </TableContainer>
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
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default SandboxModalDefault;
