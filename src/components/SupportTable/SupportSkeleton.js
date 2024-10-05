import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import Skeleton from '@mui/material/Skeleton';

const skeleton = () => {
  return (
    <>
      <Table className="teams-table">
        <TableBody>
          <TableRow>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default skeleton;