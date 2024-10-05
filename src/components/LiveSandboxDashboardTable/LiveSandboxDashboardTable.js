import { useEffect, useState } from "react";
import { Table, AccordionDetails, Accordion, Paper, TableBody, TableContainer, TableHead, TableRow, TableCell } from "@material-ui/core";
import { useForm } from "react-hook-form";
import moment from "moment";
import { PulseLoader } from "../Loader/Loader";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getLiveSandboxDashboard } from "src/services/Lab-services/services";
import ModalLab from "../ModalLab/ModalLab";
import "./LiveSandboxDashboardTable.scss";

const LiveSandboxDashboardTable = () => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState({});
  const [category_names, setCategory_names] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [open, setOpen] = useState(false);
  const [apiData, setApiData] = useState({
    type: "sandbox",
    user_quest_id: null,
    lab_type: null,
  });

  const caty_names = [
    { id: 1, name: "AWS Sandbox" },
    { id: 2, name: "Azure Sandbox" },
    { id: 3, name: "Google Cloud Sandbox" },
    { id: 5, name: "Power BI Sandbox" },
  ];

  const liveDashboardAPICall = async () => {
    setLoading(true);
    const data1 = {
      platform_id: process.env.REACT_APP_PLATFORM_ID_LABS,
      category_id: selectedCategory === null || selectedCategory === "ALL" ? "" : selectedCategory,
    };
    const res = await getLiveSandboxDashboard(data1);
    if (res?.data?.status === true) {
      setReports(res.data.data);
      setLoading(false);
    }
  }

  const LiveLabData = async () => {
    setOpen(false);
    setCategory_names(caty_names);
    liveDashboardAPICall();
  }

  useEffect(() => {
    setOpen(false);
    LiveLabData();
  }, []);

  const handleClickOpen = (user_quest_id, lab_type) => {
    setApiData({
      ...apiData,
      user_quest_id: user_quest_id,
      lab_type: lab_type,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    setLoading(true);
    setValue("page", 0);
    liveDashboardAPICall();
  };

  const handleClear = () => {
    setValue("page", 0);
    setSelectedCategory(null);
    reset({
      category_id: "",
      category_name: "",
    })
  }

  const handleClick = () => {
    liveDashboardAPICall();
  };

  return (
    <div className="live-sandbox-report-block">
      {/* research-report */}
      <div className="research-report">
        <Accordion expanded={true}>
          <div className="course-heading-block">
            <div className="title">Live Sandbox Dashboard</div>
            <button className="refresh-btn" onClick={handleClick}>
              Refresh List <RefreshIcon size="0.8rem" />
            </button>
          </div>
          <AccordionDetails>
            {/* filter-block */}
            <form className="filter-block" action="#" onSubmit={handleSubmit(onSubmit)}>
              <div className="input-box-group">
                <div className="box select-box">
                  <div className="head">
                    <label>Category Name</label>
                  </div>
                  <div className="select-box">
                    <i className="icon icon-dropdown"></i>
                    <select {...register("category_name")} defaultValue=""
                      onChange={e => { setSelectedCategory(e.target.value) }}
                    >
                      <option value={null}>ALL</option>
                      {category_names &&
                        category_names.map((row, index) => {
                          return (
                            <option key={index} value={row.id} selected={selectedCategory === row.id ? true : false}>
                              {row.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-box-group mt-5"></div>
              <div className="btn-group mt-5">
                <button className={`btn btnMain btn-rounded`}>Search</button>
                <button className={`btn btnMain btn-rounded btn-clr`} onClick={handleClear}>Clear</button>
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
                  <TableCell align="center" className="table-heading">S.No</TableCell>
                  <TableCell align="left" className="table-heading">Email</TableCell>
                  <TableCell align="center" className="table-heading">Category</TableCell>
                  <TableCell align="left" className="table-heading">Sandbox Name</TableCell>
                  <TableCell align="center" className="table-heading">Start Time(UTC)</TableCell>
                  <TableCell align="center" className="table-heading">End Time(UTC)</TableCell>
                  <TableCell align="center" className="table-heading">Remaining Time</TableCell>
                  <TableCell align="center" className="table-heading">Account Credentials </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports?.length > 0 ?
                  reports?.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="content-box">
                        <div>{i + 1}</div>
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
                        <div>{moment(row.start_time).format("DD MMM, YYYY HH:mm:ss")}</div>
                      </TableCell>
                      <TableCell className="content-box" align="center">
                        <div>{moment(row.end_time).format("DD MMM, YYYY HH:mm:ss")}</div>
                      </TableCell>
                      <TableCell className="content-box" align="center">
                        <div>{moment.utc(row.remainingDuration * 1 * 1000).format("HH:mm:ss")}</div>
                      </TableCell>
                      <TableCell className="content-box view-cred-box" align="center">
                        <div onClick={() => handleClickOpen(row.fk_user_quest_id, row.fk_lab_type)}>View Credentials</div>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow >
                      <TableCell className="tab-no-content" colSpan={10}>
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
      {open && <ModalLab open={open} handleClose={handleClose} apiData={apiData} />}
    </div>
  );
};

export default LiveSandboxDashboardTable;
