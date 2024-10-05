import { useState } from 'react';
import { Table, TableContainer, TableCell, TableRow, TableHead, Paper, TableBody, CircularProgress, } from '@material-ui/core';
import './VirtualMachinesTable.scss';
import VirtualMachineCredentialsModal from './VirtualMachineCredentialsModal';

function VmTable({finalData, terminate, loading, type}) {
  const [viewModal, setViewModal] = useState(false);

  const [credentials, setCredentials] = useState({});
  const handleTerminateVm  = (item) => {
    // console.log("terminate")
    const data = {
      role_id: item.role_id,
      user_email: item.user_email
    }
    terminate(data);
  }

  return (
    <>
      <TableContainer component={Paper} className="table-content">
        <Table className="workspaces-table">
          <TableHead>
            <TableRow>
              <TableCell align="center" className="table-heading">
                S.No
              </TableCell>
              <TableCell className="course-name table-heading" align="center">
                User Email
              </TableCell>
              <TableCell className="workspace-name table-heading" style={{minWidth: "250px"}} align="center">
                VM Name
              </TableCell>
              <TableCell align="center" style={{minWidth: "125px"}} className="table-heading">
                {type===1 ? "Start Time (UTC)" : "Enrolled On"}
              </TableCell>
              <TableCell align="center" style={{minWidth: "125px"}} className="table-heading">
                {type === 1 ? "End Time (UTC)" : "Expires On"}
              </TableCell>
              {type === 1 && (<>
                <TableCell align="center" className="table-heading">
                VM Credentials
                </TableCell>
                <TableCell align="center" className="table-heading">
                  Actions
                </TableCell>
                </>
              )}
              
            </TableRow>
          </TableHead>
          <TableBody>
          {finalData?.length > 0  && finalData?.map((Vm, index) => (
            <TableRow>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{Vm.user_email}</TableCell>
              <TableCell align="center">{Vm.task_name}</TableCell>
              <TableCell align="center" style={{minWidth: "135px"}}>{Vm.start_time}</TableCell>
              <TableCell align="center" style={{minWidth: "135px"}}>{Vm.end_time}</TableCell>
              {type === 1 && (
              <>
              <TableCell align="center">
                <button className='btn' onClick={() => { setCredentials(Vm); setViewModal((prev) => !prev);}} style={{borderRadius:'5px'}}>
                  View
                </button>
              </TableCell>
              <TableCell align="center">
                {loading ? 
                <button className='btn-disabled' style={{minWidth: '100px'}}>
                  <CircularProgress style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '15px', width: '15px', margin: 'auto' }} color="inherit" size={15} />
                </button> : 
                <button className={'btn'} 
                  onClick={() => handleTerminateVm(Vm)} style={{borderRadius:'5px'}} >
                  Terminate
                </button>}
              </TableCell>
              </>
              )}
            </TableRow>
          ))}
          {finalData?.length === 0 && (
            <TableRow>
              <TableCell align="center" colSpan={9}>No Record(s) Found</TableCell>
            </TableRow>)}
          </TableBody>
        </Table>
      </TableContainer>
      {viewModal && (
        <VirtualMachineCredentialsModal
          viewModal={viewModal}
          setViewModal={setViewModal}
          data={credentials}
        />
      )}
    </>
  );
}

export default VmTable;
