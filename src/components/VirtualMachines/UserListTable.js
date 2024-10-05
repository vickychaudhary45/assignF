import * as React from 'react';
import './UserListTable.scss';
import { Table, TableContainer, TableCell, TableRow, TableHead, Paper, TableBody } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { enrollVM } from "src/services/virtualmachines/services";

const user_data = JSON.parse(localStorage.getItem('user_data'));

export default function UserListTable({ setViewModal, setAlertResponse, setAlert, usersArray, chkdUsers, refreshUsers }) {
  const handleClose = () => {
    setViewModal((prev) => !prev);
    setCheckedUsers([]);
    setSelectedAll(false);
    setSearchTerm('');
    setPage(0);
    setRowsPerPage(25);
  }
  const [checkedUsers, setCheckedUsers] = React.useState(chkdUsers);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [users, setUsers] = React.useState([]);
  const [selectedVM, setSelectedVM] = React.useState("quickstart-sandbox");
  const [selectedAll, setSelectedAll] = React.useState(false);
  const company_id = user_data.data.company_id;


  React.useEffect(() => {
    setUsers(usersArray?.slice(0, 25))
  }, [usersArray])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    setPage(0);
    setUsers(usersArray?.filter(
      (user) =>
        user.firstname.toLowerCase().includes(event.target.value.toLowerCase()) ||
        user.email.toLowerCase().includes(event.target.value.toLowerCase())
    ).slice(0, 25))
    setCheckedUsers([]);
    setSelectedAll(false);

  };

  const handleCheckbox = (item) => {
    setCheckedUsers((prevCheckedUsers) => {
      if (prevCheckedUsers.includes(item)) {
        return prevCheckedUsers.filter((itm) => itm !== item);
      } else {
        return [...prevCheckedUsers, item];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedAll) {
      setCheckedUsers([]);
      setSelectedAll(false);
    } else {
      setCheckedUsers(users);
      setSelectedAll(true);
    }
  }
   

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    let temp = usersArray?.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage)
    setUsers(temp)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setUsers(usersArray?.slice(0, event.target.value))
  };

  const enrollUsers = async () => {
    // console.log(checkedUsers, selectedVM)
    if(checkedUsers.length === 0){
      setAlertResponse({
        status: "error",
        msg: "Please select atleast one user"
      })
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      return;
    }
    let body = {
      "vm_users": checkedUsers,
      "vm_slug": selectedVM,
      "company_id": company_id
    }
    await enrollVM(body).then((res) => {
      if(res.status){
        setAlertResponse({
          status: "success",
          msg: "Enrollment successful"
        });
        setCheckedUsers([]);
        setSelectedAll(false);
        refreshUsers();
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      } else{
        setAlertResponse({
          status: "error",
          msg: "Enrollment failed"
        })
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      }
    })
  }

  return (
    <div className='user-list-table'>
      <div className='title'>
        <h4>Enroll Users</h4>
      </div>
      <div className='select-vm'>
        <label>Select VM</label>
        <select className='select-vm-input' name="vm" value={selectedVM} onChange={(e)=>{setSelectedVM(e.target.value)}}>
            {/* <option value="">Select VM</option> */}
            <option value="quickstart-sandbox">Quickstart-VM</option>
        </select>
      </div>
      <div className='header-menu'>
        <input className='search-input' type="text" placeholder="Search users" value={searchTerm} onChange={handleSearchChange} />
        <div className='actions'>
          <button className="btn" onClick={()=>enrollUsers()}>Enroll</button>
          <button className="btn" onClick={handleClose}>Back</button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table className='table-users'  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width={100}> Select all
              <input className='select-all' type="checkbox" checked={selectedAll} onChange={()=>handleSelectAll()} />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <input
                  type="checkbox"
                  checked={checkedUsers.includes(user)}
                  onChange={() => handleCheckbox(user)}
                />
              </TableCell>
              <TableCell>{user.firstname} {user.lastname}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={usersArray?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
    />  
    </div>
  );
}
