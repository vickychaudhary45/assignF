import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core"

const createData = (level, definition) => {
  return { level, definition };
}

const threatLevelRows = [
  createData("Extremely Poor", "Less than or equal to 1 Minute"),
  createData("Poor", "1 Minute > consumed time < 3 Minute"),
  createData("Bad", "3 Minute > consumed time < 5 Minute"),
  createData("Moderate", "5 Minute > consumed time < 10 Minute"),
  createData("Good Attempt", "10 Minute > consumed time"),
];

const ThreatLevelDefinitionTable = () => {
  return (
    <TableContainer component={Paper} className="table-content mb-10">
      <Table className="practice-report-table">
        <>
          <TableHead>
            <TableRow>
              <TableCell align="center" className="threat-table-cell">S.No</TableCell>
              <TableCell align="left" className="threat-table-cell">User Lab Attempt Behaviour</TableCell>
              <TableCell align="left" className="threat-table-cell">Lab Attempt Usage Timings</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {threatLevelRows?.map((row, i) => (
              <TableRow key={i}>
                <TableCell className="content-box">
                  <div>{i + 1}</div>
                </TableCell>
                <TableCell className="content-box" align="left">
                  <div>{row.level}</div>
                </TableCell>
                <TableCell className="content-box text-aligin-left" align="center">
                  <div>{row.definition}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </>
      </Table>
    </TableContainer>
  );
}
export default ThreatLevelDefinitionTable;
