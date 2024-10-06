import React, { useState, useEffect } from "react";
import {
  Table,
  Paper,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { sd } from "../CustomCode/CustomCode";
import { Link } from "react-router-dom";
import moment from "moment";
import { getUsers } from "src/services/users-services/services";
import MessageAlert from "../MessageAlert/MessageAlert";
import { PulseLoader } from "../Loader/Loader";
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
          <div className="user-name">{user_name}</div>
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
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page] = React.useState(0);
  const [per_page] = React.useState(10);
  const [searched, setSearched] = useState("");
  const [alertbox, setAlertbox] = useState(false);
  const [message] = useState("");
  const [severity] = useState("info");
  const [sortingColumn] = useState("created_at");
  const [sortDate] = useState("desc");
  const [startDate] = useState("");
  const [endDate] = useState("");
  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const company_id = user_data.data.company_id;

  const bodyData = {
    page: page,
    per_page: per_page,
    search: searched,
    company_id: company_id,
    sortDate: sortDate,
    sortingColumn: sortingColumn,
    startDate: startDate,
    endDate: endDate,
  };
  async function fetchData() {
    setLoading(true);
    getUsers(bodyData).then((response) => {
      setUsers(response);
      setLoading(false);
    });
  }

  useEffect(() => {
    if (searched.length > 2) {
      fetchData();
    } else if (searched.length === 0) {
      fetchData();
    }
  }, [searched]);
  useEffect(() => {
    fetchData();
  }, []);

  const requestSearch = (searchedVal) => {
    setSearched(searchedVal.target.value);
  };

  const actions = (id, is_owner, title, deactive) => {
    return (
      <div className="actions icon icon-action">
        <div className="action-dropdown">
          <ul>
            {!deactive && (
              <li>
                <Link className="link" to={`/edit-user/${id}`}>
                  <i className="icon icon-edit"></i>
                  <span>Edit</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  };

  let exportData =
    users?.length > 0
      ? users?.map((value, i) => {
          return value;
        })
      : [];

  exportData = users?.map((itm, i) => ({
    ...itm,
    no: i + 1,
    role:
      itm.is_owner == 1
        ? "Owner"
        : App.privileges?.default_role
        ? App.privileges.default_role
        : "Employee",
    date: moment(itm.created_at).format("YYYY-MM-DD"),
    last_login:
      itm.last_login !== null
        ? moment(itm.last_login).format("YYYY-MM-DD")
        : "Not logged in yet",
    status: itm.deleted_at !== null ? "inactive" : "active",
  }));
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * per_page - users.length) : 0;
  return (
    <>
      <div className="user-heading-block">
        <div className="title">{props.heading_block.title}</div>
        <div className="search-bar">
          <input
            type="text"
            placeholder={props.heading_block.placeholder}
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
          />
        </div>
        <Link className="btn btn-user" to="/add-user">
          <i className="icon icon-pluse"></i>
          <span>{props.heading_block.btn_link}</span>
        </Link>
      </div>
      {/* table-content */}
      <TableContainer component={Paper} className="table-content">
        {!loading ? (
          <>
            <Table className="user-table">
              <TableHead>
                <TableRow>
                  <TableCell className="managers table-heading">S No</TableCell>
                  <TableCell className="managers table-heading">
                    Name/Email Address
                  </TableCell>
                  <TableCell className="team table-heading" width={"330px"}>
                    Role’s/User Type
                  </TableCell>
                  <TableCell className="table-heading" align="center">
                    <span>Created Date</span>
                  </TableCell>
                  <TableCell className="table-heading">
                    <span>Last Login</span>
                  </TableCell>
                  <TableCell className="actions table-heading">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.length > 0 ? (
                  users?.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{i + page * per_page + 1}</TableCell>
                      <TableCell component="th" scope="row">
                        {managers(
                          "",
                          row.firstname + " " + row.lastname,
                          row.email,
                          row.id
                        )}
                      </TableCell>
                      <TableCell>
                        {row.is_owner === 1 ? "Owner" : team(row.user_roles)}
                      </TableCell>
                      <TableCell align="center">
                        {members(sd(row.created_at))}
                      </TableCell>
                      <TableCell>{status(sd(row.last_login))}</TableCell>
                      <TableCell>
                        {actions(
                          row.id,
                          row.is_owner,
                          row.firstname + " " + row.lastname,
                          row.deleted_at ? true : false
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell style={{ textAlign: "center" }} colSpan={12}>
                      No User Found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </>
        ) : (
          <div className="loader-div">
            <PulseLoader />
          </div>
        )}
      </TableContainer>
      <MessageAlert
        severity={severity}
        message={message}
        open={alertbox}
        onClick={() => setAlertbox(false)}
      />
    </>
  );
};
export default UsersTable;
