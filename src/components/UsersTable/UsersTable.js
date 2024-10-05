import React, { useState, useEffect } from "react";
import { Table, Paper, TableBody, TableContainer, TableHead, TableRow, TableCell, TablePagination } from "@material-ui/core";
import { sd } from "../CustomCode/CustomCode";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import moment from "moment";
import { Download } from '@mui/icons-material';
import { CSVLink } from "react-csv";
import { getUsers, deleteUser } from 'src/services/users-services/services';
import MessageAlert from "../MessageAlert/MessageAlert";
import { PulseLoader } from "../Loader/Loader";
import TablePaginationActions from "../Pagination/Pagination";
import ModalDelete from "../ModalDelete/ModalDelete";
import { useAppState } from "src/stateManagement";
import "./UsersTable.scss";

const members = (num) => {
  return (
    <div className="members">
      <span>{num}</span>
    </div>
  );
};

const team = (num) => {
  return <div className="team">{num}</div>;
};

const managers = (img, user_name, email, id) => {
  return (
    <div className="managers">
      <div className="profile">
        <figure>
          <img className="img-full" src={img} alt="" />
        </figure>
        <div className="detail">
          <div className="user-name">
            <Link className="title-link" to={`/user-quick-view/${id}`}>
              {user_name}
            </Link>
          </div>
          <div className="user-id">{email}</div>
        </div>
      </div>
    </div>
  );
};
const status = (num) => {
  return (
    <div className="status">
      <span>{num}</span>
    </div>
  );
};

const UsersTable = (props) => {
  const { state: App } = useAppState();
  const [open, setOpen] = React.useState(false);
  const [userStatus, setStatus] = React.useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = React.useState(0);
  const [per_page, setPer_page] = React.useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [searched, setSearched] = useState("");
  const [alertbox, setAlertbox] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [btnName, setBtnName] = useState('')
  const [sortingColumn, setSortingColumn] = useState("created_at")
  const [sortDate, setSortDate] = useState('desc')
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateError, setDateError] = useState("");
  const user_data = JSON.parse(localStorage.getItem('user_data'));
  const company_id = user_data.data.company_id;

  const handleClickOpen = (id, title, deactive) => {
    setStatus(deactive)
    if (deactive) {
      setBtnName("Yes, activate")
    }
    else {
      setBtnName("Yes, deactivate")
    }
    setOpen(true);
    props.modal_delete.para = <div className="content" dangerouslySetInnerHTML={{ __html: `Are you sure you want to ${deactive ? 'Activate' : 'Deactivate'} user <b>${title}</b>?` }}></div>;
    props.modal_delete.id = id;
    props.modal_delete.btn_delete = deactive ? "Yes, Activate" : "Yes, Deactivate";
  };

  const bodyData = {
    page: page,
    per_page: per_page,
    search: searched,
    company_id: company_id,
    sortDate: sortDate,
    sortingColumn: sortingColumn,
    startDate: startDate,
    endDate: endDate
  }
  async function fetchData() {
    setLoading(true);
    if (startDate && endDate && startDate > endDate) {
      setDateError("*From date cannot be greater than To date");
      setLoading(false);
      return;
    } else {
      setDateError(""); // Clear the error message
    }
    getUsers(bodyData).then(response => {
      setUsers(response?.data);
      setTotalRows(response?.pagination?.total);
      setLoading(false);
    })
  }

  const clearhandler = () => {
    const bodyData = {
      page: page,
      per_page: per_page,
      search: searched,
      company_id: company_id,
      sortDate: sortDate,
      sortingColumn: sortingColumn,
      startDate: '',
      endDate: ''
    }
    setLoading(true);
    setStartDate('');
    setEndDate('');
    getUsers(bodyData).then(response => {
      setDateError('')
      setUsers(response?.data);
      setTotalRows(response?.pagination?.total);
      setLoading(false);
    })

  }
  const handleDate = (props) => {
    setSortingColumn(props)
    sortDate === "desc" ? setSortDate("asc") : setSortDate("desc");
  }

  useEffect(() => {
    if (searched.length > 2) {
      fetchData();
    }
    else if (searched.length === 0) {
      fetchData();
    }
  }, [searched, page, per_page, sortDate, sortingColumn])

  const requestSearch = (searchedVal) => {
    setSearched(searchedVal.target.value);
    setPage(0);
  };

  const deluser = async (id) => {
    setButtonLoading(true);
    await deleteUser(id, userStatus).then((res) => {
      if (res) {
        setButtonLoading(false);
        setMessage(btnName === 'Yes, activate' ? "User activated Successfully " : "User deactivated Successfully");
        setSeverity("success");
        setAlertbox(true);
        fetchData();
        setTimeout(() => {
          setAlertbox(false);
        }, 3000);
      } else {
        setMessage("Error deleting user");
        setSeverity("error");
        setAlertbox(true);
        setButtonLoading(false);
      }
      setStatus(false);
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

  const actions = (id, is_owner, title, deactive) => {
    return (
      <div className="actions icon icon-action">
        <div className="action-dropdown">
          <ul>
            {!deactive &&
              <li>
                <Link className="link" to={`/edit-user/${id}`}>
                  <i className="icon icon-edit"></i>
                  <span>Edit</span>
                </Link>
              </li>
            }
            {App?.privileges.allow_delete_user === 1 &&
              <li style={{ display: is_owner ? "none" : "block" }}>
                <div className="link" onClick={() => handleClickOpen(id, title, deactive)}>
                  <i className="icon icon-delete"></i>
                  <span>{deactive ? 'Activate' : 'Deactivate'}</span>
                </div>
              </li>
            }
          </ul>
        </div>
      </div>
    );
  };
  const headers = [
    { label: "S.No", key: "no" },
    { label: "Name", key: "firstname" },
    { label: "Email", key: "email" },
    { label: "Role", key: "role" },
    { label: "Created At", key: "date" },
    { label: "Last Login", key: "last_login" },
    { label: "Status", key: "status" },
  ];

  let exportData = users?.length > 0 ? users?.map((value, i) => {
    return value
  }) : [];

  exportData = users?.map((itm, i) => (
    {
      ...itm,
      no: i + 1,
      role: itm.is_owner == 1 ? "Owner" : App.privileges?.default_role ? App.privileges.default_role : "Employee",
      date: moment(itm.created_at).format("YYYY-MM-DD"),
      last_login: itm.last_login !== null ? moment(itm.last_login).format("YYYY-MM-DD") : "Not logged in yet",
      status: itm.deleted_at !== null ? "inactive" : "active",
    }))
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * per_page - users.length) : 0;
  return (
    <>
      <div className="user-heading-block">
        <div className="title">{props.heading_block.title}</div>
        {!loading ? (<div className="user-input-mix">
          <>
            <div>{dateError && (<div className="error-message">{dateError}</div>)}
              <div className="date-input-box">
                <div className="date-box">
                  <div className="head1">
                    <label>From</label>
                  </div>
                  <div className="input-box">
                    <input type="date" id="from_date" placeholder="E.g. dd/mm/yyyy"
                      max={new Date().toISOString().split('T')[0]}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="date-box">
                  <div className="head2">
                    <label>To</label>
                  </div>
                  <div className="input-box">
                    <input type="date" id="from_date" placeholder="E.g. dd/mm/yyyy"
                      max={new Date().toISOString().split('T')[0]}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
          <Button className="btn-user-search" onClick={fetchData}>
            <span>Search</span>
          </Button>
          <Button className="btn-user-search" onClick={clearhandler}>
            <span>Clear</span>
          </Button>
        </div>) : ''}
        <div className="search-bar">
          <input type="text"
            placeholder={props.heading_block.placeholder}
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
          />
        </div>
        <Link className="btn btn-user" to="/add-user">
          <i className="icon icon-pluse"></i>
          <span>{props.heading_block.btn_link}</span>
        </Link>
        {App.privileges.abletodownload_orderreport ?
          <div style={{ margin: '0 0 0 5px' }}>
            <Button className="btn btn-user">
              <CSVLink
                className="csv-link"
                headers={headers}
                data={exportData ? exportData : ""}
                filename={`User Report_${new Date().toLocaleDateString()}`}
              >
                <Download className="icon-download"/>
                <span>{'  '}.CSV</span>
              </CSVLink>
            </Button>
          </div>
          : ''
        }
      </div>
      {/* table-content */}
      <TableContainer component={Paper} className="table-content">
        {!loading ?
          <>
            <Table className="user-table">
              <TableHead>
                <TableRow>
                  <TableCell className="managers table-heading">S No</TableCell>
                  <TableCell className="managers table-heading">Name/Email Address</TableCell>
                  <TableCell className="team table-heading" width={'330px'}>Role’s/User Type</TableCell>
                  <TableCell className="members table-heading" align="center">
                    <span onClick={() => handleDate("created_at")}>Created Date</span>
                  </TableCell>
                  <TableCell className="status table-heading">
                    <span onClick={() => handleDate("login_at")}>Last Login</span>
                  </TableCell>
                  {App?.privileges.allow_delete_user === 1 &&
                    <TableCell className="statusA table-heading">
                      <span onClick={() => handleDate("deleted_at")}>Status</span>
                    </TableCell>
                  }
                  <TableCell className="actions table-heading">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(users?.length > 0) ? users?.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{i + (page * per_page) + 1}</TableCell>
                    <TableCell component="th" scope="row">
                      {managers('', row.firstname + " " + row.lastname, row.email, row.id)}
                    </TableCell>
                    <TableCell>{(row.is_owner === 1) ? "Owner" : team(row.user_roles)}</TableCell>
                    <TableCell align="center">{members(sd(row.created_at))}</TableCell>
                    <TableCell>{status(sd(row.last_login))}</TableCell>
                    {App?.privileges.allow_delete_user === 1 &&
                      <TableCell><div style={{ color: row.deleted_at ? 'red' : 'green' }} className="status classonboarded">
                        <span>{row.deleted_at ? 'Inactive' : 'Active'}</span></div>
                      </TableCell>
                    }
                    <TableCell>{actions(row.id, row.is_owner, row.firstname + " " + row.lastname, row.deleted_at ? true : false)}</TableCell>
                  </TableRow>
                ))
                  :
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell style={{ 'textAlign': 'center' }} colSpan={12} >
                      No User Found.
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
      {users?.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: totalRows }]}
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
        onClick={() => setAlertbox(false)} />
      {/* modal-block */}
      <ModalDelete
        open={open}
        fn={deluser}
        btnloading={buttonLoading}
        handleClose={handleClose}
        btn_value={btnName}
        {...props.modal_delete}
      />
    </>
  );
};
export default UsersTable;
