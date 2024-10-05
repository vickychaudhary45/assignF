import { useState } from 'react';
import { Table, TableContainer, TableCell, TableRow, TableHead, Paper, TableBody, CircularProgress, } from '@material-ui/core';
import './WorkspacesTable.scss';
import WorkspaceCredentialsModal from './WorkspaceCredentialsModal';
import moment from 'moment';

function WorkspacesTable({finalData, terminate, loading}) {
  const [viewModal, setViewModal] = useState(false);

  const [credentials, setCredentials] = useState({});
  const handleTerminateWorkspace  = (item) => {
    const data = {
      workspace_slug: item.workspace_slug,
      user_name: item.user_name,
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
                Workspace Name
              </TableCell>
              <TableCell align="center" className="table-heading">
                Workspace Status
              </TableCell>
              <TableCell align="center" style={{minWidth: "125px"}} className="table-heading">
                Start Date (UTC)
              </TableCell>
              <TableCell align="center" style={{minWidth: "125px"}} className="table-heading">
                End Date (UTC)
              </TableCell>
              <TableCell align="center" style={{minWidth: "125px"}} className="table-heading">
                Total Number of Weeks
              </TableCell>
              <TableCell align="center" style={{minWidth: "125px"}} className="table-heading">
                Workspace Initiation Time (UTC)
              </TableCell>
              {/* <TableCell align="center" style={{minWidth: "125px"}} className="table-heading">
                Workspace Termination Time (UTC)
              </TableCell> */}
              <TableCell align="center" className="table-heading">
                Workspace Credentials
              </TableCell>
              <TableCell align="center" className="table-heading">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {finalData?.length > 0  && finalData?.map((workspace, index) => (
            <TableRow>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{workspace.user_email_id}</TableCell>
              <TableCell align="center">{workspace.workspace_name}</TableCell>
              <TableCell align="center">{workspace.workspace_env_status}</TableCell>
              <TableCell align="center" style={{minWidth: "135px"}}>{workspace.start_date}</TableCell>
              <TableCell align="center" style={{minWidth: "135px"}}>{workspace.end_date}</TableCell>
              <TableCell align="center" style={{minWidth: "135px"}}>
              {workspace.end_date ? workspace.validity : "Invalid" }
              </TableCell>
              <TableCell align="center" style={{minWidth: "135px"}}>{moment(workspace.workspace_initiation_time).format('LLL')}</TableCell>
              {/* <TableCell align="center" style={{minWidth: "135px"}}>{workspace.workspace_terminate_time ? moment(workspace.workspace_terminate_time).format('LLL') : "-"}</TableCell> */}
              <TableCell align="center">
                <button className='btn' onClick={() => { setCredentials(workspace); setViewModal((prev) => !prev);}} style={{borderRadius:'5px'}}>
                  View
                </button>
              </TableCell>
              <TableCell align="center">
                {loading ? 
                <button className='btn-disabled' style={{minWidth: '100px'}}>
                  <CircularProgress style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '15px', width: '15px', margin: 'auto' }} color="inherit" size={15} />
                </button> : 
                <button className={'btn'} 
                  onClick={() => handleTerminateWorkspace(workspace)} style={{borderRadius:'5px'}} >
                  Terminate
                </button>}
              </TableCell>
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
        <WorkspaceCredentialsModal
          viewModal={viewModal}
          setViewModal={setViewModal}
          data={credentials}
        />
      )}
    </>
  );
}

export default WorkspacesTable;
