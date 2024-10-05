import { Dialog, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import CloseIcon from '@mui/icons-material/Close';
import "./TimelineViewMoreModal.scss";

const TimelineViewMore = ({ open, close, selectedTimelineItem, getFormattedDate }) => {

  return (
    <Dialog className="modal-timeline-view" onClose={close} aria-labelledby="customized-dialog-title" open={open}>
      <div className="modal-timeline-container">
        <div className="timeline-heading">
          <h6>{selectedTimelineItem?.title}</h6>
          <div onClick={() => close()}><CloseIcon /></div>
        </div>
        <TableContainer component={Paper} className='timeline-table'>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sr.No</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(selectedTimelineItem?.data || [])?.map((obj, index) =>
                <TableRow key={index}>
                  <TableCell component="th" scope="row">{index + 1}</TableCell>
                  <TableCell align="right">{obj?.name}</TableCell>
                  <TableCell align="right">{getFormattedDate(obj?.created_at)}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Dialog>
  )
}

export default TimelineViewMore