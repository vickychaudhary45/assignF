import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from "@material-ui/core";
import {
  ScienceOutlined, PrivacyTipOutlined, BugReportOutlined, FiberManualRecord, CheckCircleOutlined,
  InfoOutlined, AddModeratorOutlined, CachedOutlined, SupportAgentOutlined
} from '@mui/icons-material';
import moment from 'moment';
import { getQueries } from 'src/services/query-services/services';
import TicketIDModal from './TicketIDModal';
import skeleton from "./SupportSkeleton";
import TablePaginationActions from "../Pagination/Pagination";
import './SupportTable.scss';


const type = (type) => {
  return (
    <div className="bug">
      <span>
        {type === 'Support' ? (
          <SupportAgentOutlined className='support-icon' />
        ) : type === 'Business' ? (
          <AddModeratorOutlined className='add-moderate-icon' />
        ) : type === 'Products' ? (
          <PrivacyTipOutlined />
        ) : type === 'Labs' ? (
          <ScienceOutlined />
        ) : (
          <BugReportOutlined />
        )}
      </span>
    </div>
  );
};
const priority = (num) => {
  return (
    <div className="priority">
      <span>
        {num == 1 ? (
          <> <FiberManualRecord color="secondary" className='fiber-icon' /> &nbsp;Medium</>
        ) : num == 2 ? (
          <><FiberManualRecord color="warning" className='fiber-icon' /> &nbsp;Urgent</>
        ) : (
          <><FiberManualRecord color="primary" className='fiber-icon' /> &nbsp;Low</>
        )}
      </span>
    </div>
  );
};
const date = (date) => {
  return (
    <div className='date'>
      <span>{!date ? '-' : moment(date).format('DD MMM, YYYY')}</span>
    </div>
  );
};

const SupportTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = React.useState(0);
  const [per_page, setPer_page] = React.useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const fetchData = async () => {
    const user_data = JSON.parse(localStorage.getItem('user_data'));
    const company_id = user_data?.data.company_id;
    setLoading(true);
    const response = await getQueries(page, per_page, company_id);
    if(response.status === true){
      setQueries(response?.data?.data);
      setTotalRows(response?.data.pagination?.total);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [page, per_page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPer_page(parseInt(event.target.value, 10));
    setPage(0);
  };
  // logic to send data to the modal and toggle the modal
  const handleModal = (id) => {
    const data = [queries?.find((e) => e.id === id)];
    setModalData(data);
    setShowModal((prev) => !prev);
  };
  return (
    <>
      <div className='table-wrapper'>
        <TableContainer component={Paper} className="table-content" >
          {!loading && queries ? (
            <>
              <Table className="teams-table" stickyHeader={true}>
                <TableHead>
                  <TableRow>
                    <TableCell className="tabletop">S.No</TableCell>
                    <TableCell className="tabletop" align="center"> Ticket ID </TableCell>
                    <TableCell className="tabletop">Title</TableCell>
                    <TableCell className="tabletop">Priority</TableCell>
                    <TableCell className="tabletop">Type</TableCell>
                    <TableCell className="tabletop">Issue Type</TableCell>
                    <TableCell className="tabletop t-center"> Status </TableCell>
                    <TableCell className="tabletop t-center"> Raised On</TableCell>
                    <TableCell className="tabletop t-center"> Date of Resolution </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {queries?.length > 0 ? (
                    queries?.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell className='t-grey' component="th" scope="row"> {i + page * per_page + 1} </TableCell>
                        <TableCell align="center">
                          {<div className="team ticket-id" onClick={() => handleModal(row.id)}> {row.id}</div>}
                        </TableCell>
                        <TableCell> {<div className="team">{row.title}</div>} </TableCell>
                        <TableCell> {<div className="team">{priority(row.priority)}</div>} </TableCell>
                        <TableCell> {<div className="team">{type(row.type)}</div>} </TableCell>
                        <TableCell> {<div className="team">{row.type}</div>} </TableCell>
                        <TableCell>
                          {row.status === 1 ? (
                            <div className="status classprogress">
                              <span> Inprogress &nbsp; <CachedOutlined className='font-16' /> </span>
                            </div>
                          ) : row.status === 2 ? (
                            <div className="status classonboarded">
                              <span> Resolved &nbsp; <CheckCircleOutlined className='font-16' /> </span>
                            </div>
                          ) : (
                            <div className="status classwaiting">
                              <span> Pending &nbsp;{' '} <InfoOutlined className='font-16' /> </span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className='t-grey'> {date(row.created_at)} </TableCell>
                        <TableCell className='t-grey'> {date(row.resolved_at)} </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={50}> <div className="no-data"> <span>No ticket found</span></div></TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {showModal && (<TicketIDModal setShowModal={setShowModal} modalData={modalData} />)}
            </>
          ) : (
            <Table className="teams-table">
              <TableBody> <TableRow>{skeleton(per_page)}</TableRow> </TableBody>
            </Table>
          )}
        </TableContainer>
        {queries?.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
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
          />)}
      </div>
    </>
  );
};
export default SupportTable;
