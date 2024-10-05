import React, { useEffect, useState } from "react";
import "./RolesPrivilegesTable.scss";
import moment from "moment";

// mui imports
import {
  Table,
  Paper,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  TablePagination,
  Collapse,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import SearchBar from "material-ui-search-bar";
import CloseIcon from "@material-ui/icons/Close";

// Custom components
import ModalDelete from "../ModalDelete/ModalDelete";
import MessageAlert from "../MessageAlert/MessageAlert";
import ModalQuickRole from "../ModalQuickRole/ModalQuickRole";
import TablePaginationActions from "../Pagination/Pagination";

// Other imports
import { PulseLoader } from "../Loader/Loader";
import { CheckPrivileges } from "src/config/utils";
import { getRoles, deleteRoles } from "src/services/role-privileges/services";

const roles_name = (name) => {
  return <div className="roles-name">{name}</div>;
};

const members = (permission, dataToRemove) => {
  if (typeof permission === "string") {
    permission = permission
      .replace(/[\[\]]/g, "")
      .split(",")
      .map(Number);
  }
  const filteredPermissions = permission.filter(
    (item) => !dataToRemove.includes(item)
  );
  return <div className="members">{filteredPermissions.length}</div>;
};
const date = (created_at) => {
  return (
    <div className="date">{moment(created_at).format("DD MMM, YYYY")}</div>
  );
};

const RolesPrivilegesTable = (props) => {
  const { privileges } = CheckPrivileges();
  const priv = JSON.parse(localStorage.getItem("privilegesInfo"));

  // Alert state management
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  // Page state management
  const [page, setPage] = React.useState(0);
  const [searched, setSearched] = useState("");
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Role modal state management
  const [open, setOpen] = React.useState(false);
  const [viewId, setViewId] = React.useState(null);
  const [modaldel, setModaldel] = React.useState(false);
  const [modalrol, setModalrole] = React.useState(false);

  // Misc state management
  const [roles, setRoles] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = React.useState(false);
  const [dataToRemove, setDataToRemove] = useState([]);

  // Search function
  const requestSearch = (searchedVal) => {
    setSearched(searchedVal);
    setPage(0);
  };

  const cancelSearch = () => {
    setSearched("");
  };

  let roles_list = [];
  const fetchData = async () => {
    setLoading(true);
    const response = await getRoles(page, rowsPerPage, searched);
    if (response.status === "success") {
      if (response?.data) {
        setDataToRemove(response?.parentMenuIds);
        response?.data.map((item) => {
          if (item.is_global === 1 && item.name === priv.default_role) {
            roles_list.push(item);
          } else if (item.is_global === 0) {
            roles_list.push(item);
          }
        });
        setRoles(roles_list);
      }
      setLoading(false);
      setTotalRows(response?.pagination?.total);
    }
  };

  useEffect(() => {
    const searchData = setTimeout(() => {
      fetchData();
    }, [1000]);
    return () => {
      clearTimeout(searchData);
    };
  }, [page, rowsPerPage, searched]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle row change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Delete role Functions 1
  const deleteClickOpen = (id, title) => {
    props.modal_delete.para = (
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: `Are you sure you want to delete <b>${title}</b> Role?`,
        }}
      ></div>
    );
    props.modal_delete.id = id;
    setModaldel(true);
  };

  // Delete role Functions 2
  const deleteRole = async (id) => {
    const res = await deleteRoles(id);
    setRequest(res);
    setOpen(true);
    if (res.status === "success") {
      fetchData();
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
    setModaldel(false);
  };

  // Delete role Functions 3
  const deleteClose = () => {
    setModaldel(false);
  };

  // Role modal Function
  const roleClickOpen = (id) => {
    if (id) {
      setViewId(id);
      setModalrole(true);
    }
  };
  const roleClose = () => {
    setViewId(null);
    setModalrole(false);
  };

  const actions = (id, title, is_global) => {
    return (
      <div className="actions icon icon-action">
        <div className="action-dropdown">
          <ul>
            <li>
              <div className="link" onClick={() => roleClickOpen(id)}>
                <i className="icon icon-eye-view"></i>
                <span>Quick View</span>
              </div>
            </li>
            {is_global !== 1 ? (
              <li>
                <Link className="link" to={`/edit-roles-privileges/${id}`}>
                  <i className="icon icon-edit"></i>
                  <span>Edit</span>
                </Link>
              </li>
            ) : (
              ""
            )}
            {privileges?.is_owner && is_global !== 1 ? (
              <li>
                <div
                  className="link"
                  onClick={() => deleteClickOpen(id, title)}
                >
                  <i className="icon icon-delete"></i>
                  <span>Delete</span>
                </div>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    );
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - roles.length) : 0;

  return (
    <>
      {/* training-heading-block */}
      <div className="role-heading-block">
        <div className="title">{props.heading_block.title}</div>
        <div className="search-bar">
          <SearchBar
            placeholder="Search role.."
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />
        </div>
        <Link to="/add-roles-privileges" className="btn btn-training">
          <i className="icon icon-pluse"></i>
          <span>{props.heading_block.btn_filter}</span>
        </Link>
      </div>
      <div className="message-alert">
        <Collapse in={alert ? true : false}>
          <Alert
            severity={alert ? alert : "warning"}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlert(null);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {alertMessage}
          </Alert>
        </Collapse>
      </div>
      {/* table-content */}
      <TableContainer component={Paper} className="table-content">
        {!loading ? (
          <Table className="role-table">
            <TableHead>
              <TableRow>
                <TableCell className="roles-name table-heading">
                  Roles Name
                </TableCell>
                <TableCell className="members table-heading">
                  Privileges
                </TableCell>
                <TableCell className="date table-heading">
                  <span>Created on</span>
                </TableCell>
                <TableCell className="actions table-heading">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles?.length > 0 ? (
                roles?.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {roles_name(row.name)}
                    </TableCell>
                    <TableCell>
                      {members(row.permission, dataToRemove)}
                    </TableCell>
                    <TableCell>{date(row.created_at)}</TableCell>
                    <TableCell>
                      {actions(row.id, row.name, row.is_global)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell className="no-result-tbl-cell" colSpan={6}>
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
      {/* Pagination */}
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
      {/* Modal-Delete */}
      <ModalDelete
        open={modaldel}
        fn={deleteRole}
        handleClose={deleteClose}
        {...props.modal_delete}
      />
      {/* Modal-Quick view */}
      <ModalQuickRole
        open={modalrol}
        id={viewId}
        handleClose={roleClose}
        {...props.modal_quick_role}
      />
      {/* Message Alert */}
      <MessageAlert
        severity={request?.status === "success" ? request?.status : "error"}
        message={
          request?.status == "error"
            ? "Role is associated with users, so unable to delete this role"
            : request?.message
        }
        onClick={() => {
          setOpen(false);
        }}
        open={open}
      />
    </>
  );
};
export default RolesPrivilegesTable;
