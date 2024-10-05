import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, useTheme } from "@material-ui/core"
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from "@material-ui/icons";

export default function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton aria-label="first page" disabled={page === 0} onClick={handleFirstPageButtonClick}>
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton aria-label="previous page" disabled={page === 0} onClick={handleBackButtonClick}>
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton aria-label="next page" disabled={page >= Math.ceil(count / rowsPerPage) - 1} onClick={handleNextButtonClick}>
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton aria-label="last page" disabled={page >= Math.ceil(count / rowsPerPage) - 1} onClick={handleLastPageButtonClick}>
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
