import React from "react";
import { useState, useEffect } from "react";
import { images } from "../../config/images";
import { Link } from "react-router-dom";
import { Table, Paper, TableBody, TableContainer, TableHead, TableRow, TableCell, TablePagination } from "@material-ui/core";
import ModalDelete from "../ModalDelete/ModalDelete";
import { getTeams, deleteTeam } from 'src/services/teams-services/services';
import { PulseLoader } from "../Loader/Loader";
import MessageAlert from "../MessageAlert/MessageAlert";
import TablePaginationActions from "../Pagination/Pagination";
import "./TeamsTable.scss";

const TeamsTable = (props) => {
  const [open, setOpen] = React.useState(false);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = React.useState(0);
  const [per_page, setPer_page] = React.useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [searched, setSearched] = useState("");
  const [alertbox, setAlertbox] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');
  const [buttonLoading, setButtonLoading] = useState(false);

  const fetchData = async () => {
    const user_data = JSON.parse(localStorage.getItem('user_data'));
    const company_id = user_data.data.company_id;
    setLoading(true);
    getTeams(page, per_page, searched, company_id).then(response => {
      if (response.data === null) {
        setLoading(false);
        setTeams([]);
        setTotalRows(0);
      }
      else {
        setTeams(response?.data);
        setTotalRows(response?.pagination?.total);
        setLoading(false);
      }
    })
  };

  useEffect(() => {
    if (searched.length > 2) {
      setTimeout(() => {
        fetchData();
      }, 1000);
    }
    else if (searched.length === 0) {
      fetchData();
    }
  }, [page, per_page, searched]);

  const requestSearch = (searchedVal) => {
    setSearched(searchedVal.target.value);
    setPage(0);
  };

  const cancelSearch = () => {
    setSearched("");
  };

  const delTeam = async (id) => {
    setButtonLoading(true);
    await deleteTeam(id).then((res) => {
      if (res.status === "success") {
        setLoading(true);
        setButtonLoading(false);
        setMessage("Team deleted successfully");
        setSeverity("success");
        setAlertbox(true);
        setOpen(false);
        setTimeout(() => {
          setAlertbox(false);
          fetchData();
          setLoading(false);
        }, 3000)
      } else if (res.status === "error") {
        setMessage("Selected Team already in use");
        setSeverity("error");
        setAlertbox(true);
        // setTimeout(()=>{
        //   setAlertbox(false);
        // },3000)
      }
      else {
        setMessage("Something went wrong");
        setSeverity("error");
        setAlertbox(true);
        setOpen(false);
        // setTimeout(()=>{
        //   setAlertbox(false);
        // },3000)
      }
      setOpen(false);
    })
  }
  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPer_page(parseInt(event.target.value, 10));
    setPage(0);
  };

  const actions = (id, title) => {
    return (
      <div className="actions icon icon-action">
        <div className="action-dropdown">
          <ul>
            <li>
              <Link className="link" to={`/edit-team/${id}`}>
                <i className="icon icon-edit"></i>
                <span>Edit</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="team-table-heading">
        <div className="title">{props.heading_block.title}</div>
        <div className="search-bar">
          <input type="text"
            placeholder="Search Team"
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onAbort={cancelSearch}
          />
        </div>
        <Link className="btn create-team" to="/create-team">
          <i className="icon icon-pluse"></i>
          <span>{props.heading_block.btn_link}</span>
        </Link>
      </div>
      <TableContainer component={Paper} className="table-content">
        {!loading ?
          <>
            <Table className="teams-table">
              <TableHead>
                <TableRow>
                  <TableCell className="table-heading">S.No</TableCell>
                  <TableCell className="table-heading">Team</TableCell>
                  <TableCell className="table-heading">Managers</TableCell>
                  <TableCell className="table-heading">Members</TableCell>
                  <TableCell className="table-heading">Status</TableCell>
                  <TableCell className="table-heading">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(teams?.length > 0) ? teams?.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{i + (page * per_page) + 1}</TableCell>
                    <TableCell>{
                      <div className="team">
                        <Link className="title-link" to={`/team-report/${row.id}`}> {row.team_name} </Link>
                      </div>
                    }</TableCell>
                    <TableCell>{
                      <div className="managers">
                        <div className="profile">
                          <figure>
                            <img className="img-full" src={(row.manager_pic === null || row.manager_pic === undefined || row.manager_pic === "") ? images.user_img : `${process.env.REACT_APP_B2B_MEDIA_URL}${row.manager_pic}`} alt="" />
                          </figure>
                          <div className="detail">
                            <div className="user-name">{row.manager_name}</div>
                            <div className="user-id">{row.manager_email}</div>
                          </div>
                        </div>
                      </div>}</TableCell>
                    <TableCell component="th" scope="row">
                      {<div className="members"><span>{row.members}</span></div>}
                    </TableCell>
                    <TableCell>
                      {(row.status === "1") ?
                        (<div className="status classonboarded"><span>Onboarded</span></div>)
                        : (<div className="status classwaiting"><span>Waiting for Training Plan</span></div>)
                      }
                    </TableCell>
                    <TableCell>{actions(row.id, row.team_name)}</TableCell>
                  </TableRow>
                )) :
                  <TableRow>
                    <TableCell colSpan={5}>
                      <div className="no-data" style={{ textAlign: "center" }} >
                        <span>No records found</span>
                      </div>
                    </TableCell>
                  </TableRow>
                }
              </TableBody>
            </Table>
          </> :
          <div className="loader-div">
            <PulseLoader />
          </div>
        }
      </TableContainer>
      {teams?.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={totalRows}
          rowsPerPage={per_page}
          page={page}
          SelectProps={{
            inputProps: {
              'aria-label': 'rows per page',
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      )
      }
      <MessageAlert
        severity={severity}
        message={message}
        open={alertbox}
        onClick={() => setOpen(false)}
      />
      <ModalDelete
        open={open}
        fn={delTeam}
        btnloading={buttonLoading}
        handleClose={handleClose}
        {...props.modal_delect}
      />
    </>

  );
};
export default TeamsTable;
