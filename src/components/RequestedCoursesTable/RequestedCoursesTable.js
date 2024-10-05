import { useEffect, useState } from "react";
import { PulseLoader } from "../Loader/Loader";
import {Table, Accordion, Paper, TableBody, TableContainer, TableHead, TableRow,
  TableCell, TablePagination, Button} from "@material-ui/core";
import { assignRequestedCourses } from "src/services/courses/services";
import { requestedCourses } from 'src/services/browse-courses/services';
import SearchBar from "material-ui-search-bar";
import moment from 'moment';
import Swal from "sweetalert2";
import TablePaginationActions from "../Pagination/Pagination";
import "./RequestedCoursesTable.scss";

const course = (course_title, seo_details) => {
  return (
    <div className="course">
      <div className="course-img">
        <figure>
          <img src={process.env.REACT_APP_WEB_MEDIA_URL + seo_details?.featured_image?.replace("media/", "")}
            alt={seo_details?.title}
            title={seo_details?.title}
          />
        </figure>
        <div className="course-detail">{course_title}</div>
      </div>
    </div>
  );
};

const users = (img, user_name, email) => {
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

const RequestedCoursesTable = () => {
  const [courses, setCourses] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    setSearched(searchedVal);
    setPage(0);
  };

  const cancelSearch = () => {
    setSearched("");
  };

  const fetchCourses = async () => {
    const response = await requestedCourses({ page, rowsPerPage, searched });
    if (response?.status === 'success') {
      setCourses(response?.data);
      setTotalRows(response?.pagination?.total);
      setLoading(false)
    }
  }

  const assignUserCourse = async (course, product_type) => {
    let formData = {
      user_id: course.id,
      product_type: product_type,
      course_id: course.course_id
    }
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Assign the course!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, assign!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    })
    if (result?.value) {
      const response = await assignRequestedCourses(formData);
      if (response) {
        if (response.status === "success") {
          Swal.fire(
            "Assigned!",
            "Course assigned successfully.",
            "success"
          )
          fetchCourses();
        } else if (response.status === "error") {
          Swal.fire(
            "Cancelled!",
            "Course not assigned.",
            "error"
          )
        }
      }
    } else if (result.dismiss === "cancel") {
      Swal.fire(
        "Cancelled",
        "Course not assigned.",
        "error"
      )
    }
  }

  useEffect(() => {
    const searchData = setTimeout(() => {
      fetchCourses();
    }, 2000)
    return () => {
      clearTimeout(searchData);
    }
  }, [page, rowsPerPage, searched])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - courses?.length) : 0;

  return (
    <>
      {/* research-report */}
      <div className="research-report">
        <Accordion>
          <div className="requested-course-heading-block">
            <div className="title">Requested Courses</div>
            <div className="search-bar">
              <SearchBar
                placeholder="search users..."
                value={searched}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
              />
            </div>
          </div>
        </Accordion>
      </div>
      {/* table */}
      <TableContainer component={Paper} className="table-content">
        {!loading ? (
          <Table className="course-table">
            <TableHead>
              <TableRow>
                <TableCell className="managers table-heading">Course Name</TableCell>
                <TableCell className="managers table-heading">Requested By</TableCell>
                <TableCell className="members table-heading"><span>Requested Date</span></TableCell>
                <TableCell className="managers table-heading">Assign Course</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses?.length > 0 ? (courses.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{course(row.title_type, row.course.seo_details)}</TableCell>
                  <TableCell component="th" scope="row">
                    {users('', row.course.firstname + " " + row.course.lastname, row.course.email)}
                  </TableCell>
                  <TableCell>{moment(row.course.created_at).format("DD MMM, YYYY")}</TableCell>
                  <TableCell component="th" scope="row">
                    <Button variant="contained" onClick={() => assignUserCourse(row.course, row.prod_type)}>Assign</Button>
                  </TableCell>
                </TableRow>
              )
              )) : (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell style={{ 'textAlign': 'center' }} colSpan={8} >
                    No requests are available from users
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
      {(courses?.length > 0) &&
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: totalRows }]}
          component="div"
          count={totalRows} // This is what your request should be returning in addition to the current page of rows.
          rowsPerPage={rowsPerPage}
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
        />
      }
    </>
  );
};
export default RequestedCoursesTable;
