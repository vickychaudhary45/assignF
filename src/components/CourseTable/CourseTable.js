
import React, { useEffect, useState } from 'react';
import { images } from '../../config/images';
import ModalDefault from '../ModalDefault/ModalDefault';
import { PulseLoader } from '../Loader/Loader';
import { Table, Paper, TableBody, TableContainer, TableHead, TableRow, TableCell, Checkbox, TablePagination, } from '@material-ui/core';
import _ from 'lodash';
import { getCourses, assignCourses } from 'src/services/courses/services';
import { searchuser, getCourseTeams } from 'src/services/teams-services/services';
import SearchBar from 'material-ui-search-bar';
import MessageAlert from '../MessageAlert/MessageAlert';
import { useForm } from 'react-hook-form';
import TablePaginationActions from '../Pagination/Pagination';
import './CourseTable.scss';

const course = (course_title, seo_details) => {
  return (
    <div className="course">
      <div className="course-img">
        <figure>
          <img title={seo_details?.title}
            src={process.env.REACT_APP_WEB_MEDIA_URL + seo_details?.featured_image?.replace('media/', '')}
          />
        </figure>
        <div className="course-detail">{course_title}</div>
      </div>
    </div>
  );
};

const content_box = (web_counts, product_type) => {
  return (
    <div className="content-box">
      <div className="icon-block">
        {product_type === 'PT' && web_counts.ques_count > 0 ? (
          <div className="icon icon-question">
            {web_counts.ques_count} Questions
          </div>
        ) : product_type === 'OC' && web_counts.vid_count > 0 ? (
          <div className="icon icon-play">{web_counts.vid_count} Videos</div>
        ) : product_type === 'LAB' && web_counts.lab_count > 0 ? (
          <div className="icon icon-lab">{web_counts.lab_count} Labs</div>
        ) : product_type === 'SANDBOX' && web_counts.sandbox_count > 0 ? (
          <div className="icon icon-inbox-nav">
            {web_counts.sandbox_count} Sandbox
          </div>
        ) : ('')}
      </div>
    </div>
  );
};

const CourseTable = (props) => {
  const { register, handleSubmit, setValue, reset, getValues, formState: { errors } } = useForm();
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState('');
  const [users, setUsers] = useState([]);
  const [searchedUser, setSearchedUser] = useState('');
  const [teams, setTeams] = useState([]);
  const [searchedTeam, setSearchedTeam] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [searched, setSearched] = useState('');
  const [allSelected, setAllSelected] = React.useState(false);
  const [selected, setSelected] = React.useState({});
  const [alert, setAlert] = useState(false);
  const [alertResponse, setAlertResponse] = useState('');
  const [teamsShow, setTeamsShow] = useState(false);
  const [usersShow, setUsersShow] = useState(false);
  const [checkPage, setCheckPage] = useState(0)
  const [loading, setLoading] = useState(true);

  const handleCheckbox = (section) => {
    if (section === 'Users') {
      setSearchedUser('');
      setUsersShow(!usersShow);
    }
    if (section === 'Teams') {
      setSearchedTeam('');
      setTeamsShow(!teamsShow);
    }
  };

  const closeAlert = () => {
    setAlert(false);
  }; // to close the alert
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        closeAlert();
      }, 3000);

      // Clean up the timeout when the component unmounts or the alert is closed manually
      return () => {
        clearTimeout(timer);
      };
    }
  }, [alert]);

  const categoryList = [
    { id: '', categoryName: 'All Categories' },
    { id: 25, categoryName: 'Agile' },
    { id: 15, categoryName: 'Amazon (AWS)' },
    { id: 34, categoryName: 'Alibaba Cloud' },
    { id: 21, categoryName: 'Big Data' },
    { id: 22, categoryName: 'Blockchain' },
    { id: 31, categoryName: 'Blue Prism' },
    { id: 26, categoryName: 'Business Analysis' },
    { id: 20, categoryName: 'Cloud Security' },
    { id: 38, categoryName: 'Cyber Security' },
    { id: 37, categoryName: 'DevOps' },
    { id: 19, categoryName: 'Google Cloud' },
    { id: 39, categoryName: 'IT Ops' },
    { id: 28, categoryName: 'Java' },
    { id: 29, categoryName: 'Linux' },
    { id: 18, categoryName: 'Microsoft Azure' },
    { id: 41, categoryName: 'Microsoft Power Platform' },
    { id: 2, categoryName: 'Microsoft 365 Certifications' },
    { id: 33, categoryName: 'Networking' },
    { id: 24, categoryName: 'Salesforce' },
    { id: 36, categoryName: 'Spring Framework' },
    { id: 40, categoryName: 'Snowflake' },
  ];

  const toggleAllSelected = (e) => {
    const { checked } = e.target;
    setCheckPage(page);
    setAllSelected(checked);
    courses &&
      setSelected(
        courses.reduce(
          (selected, { course_id, product_type }) => ({
            ...selected,
            [course_id + '-' + product_type]: checked,
          }),
          {}
        )
      );
  };

  const toggleSelected = (course_id, product_type = null) => (e) => {
    if (!e.target.checked) {
      setAllSelected(false);
    }
    setSelected((selected) => ({
      ...selected,
      [course_id + '-' + product_type]:
        !selected[course_id + '-' + product_type],
    }));
  };

  useEffect(() => {
    if (selected) {
      const countObj = Object.keys(selected).filter((course_id, i) => {
        if (selected[course_id] === true) {
          return course_id;
        }
      });
      if (countObj.length > 0) {
        if (countObj.length === 1) {
          let course = courses.filter((row) => {
            if (row.course_id + '-' + row.product_type == countObj[0]) {
              return row;
            }
          });
          setSelectedCourse(course[0].title);
        } else {
          setSelectedCourse(`You have selected ${countObj.length} Courses`);
        }
      } else {
        setSelectedCourse(null);
      }
    }
  }, [selected]);

  const selectedCount = Object.values(selected).filter(Boolean).length;

  const isAllSelected = selectedCount === courses?.length && checkPage == page;
  const isIndeterminate = selectedCount && selectedCount !== courses?.length;
  let searchTimeout = () => { };

  const requestSearch = (searchedVal) => {
    if (searchedVal.length > 2) {
      setSearched(searchedVal);
      setPage(0);
    } else if (searchedVal.length == 0) {
      setSearched('');
    }
  };

  const cancelSearch = (type) => {
    if (type == 'courses') {
      setSearched('');
    } else if (type == 'users') {
      setSearchedUser('');
    } else if (type == 'teams') {
      setSearchedTeam('');
    }
  };

  const fetchData = async (formData) => {
    const response = await getCourses(page, rowsPerPage, searched, formData);
    if (response.status === 'success') {
      setCourses(response?.data);
      setLoading(false);
      setTotalRows(response.pagination.total);
    }
  }

  useEffect(() => {
    const formData = getValues();
    fetchData(formData);
    setAllSelected(false);
  }, [page, rowsPerPage, searched]);

  useEffect(async () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
      await searchuser(searchedUser).then((res) => {
        if (res?.data.status === true && res?.data?.users?.length > 0) {
          let finalList = [];
          if (selectedUsers?.length > 0) {
            res.data.users.filter(function (item) {
              let i = selectedUsers.findIndex((user) => user.id == item.id);
              if (i <= -1) {
                let obj = {
                  id: item.id,
                  src: images.activities4,
                  name: (<>{`${item.firstname} ${item.lastname}`}{' '}<span>({item.email})</span></>),
                  iconclose: 'icon-cross',
                };
                finalList.push(obj);
              }
              return null;
            });
          } else {
            res.data.users.filter(function (item) {
              let obj = {
                id: item.id,
                src: images.activities4,
                name: (<>{`${item.firstname} ${item.lastname}`}{' '}<span>({item.email})</span></>),
                iconclose: 'icon-cross',
              };
              finalList.push(obj);
            });
          }
          setUsers(finalList);
        } else {
          setUsers('');
        }
      });
    }, 1000);
  }, [searchedUser]);

  useEffect(async () => {
    await getCourseTeams(searchedTeam).then((res) => {
      if (res?.data?.length > 0) {
        let finalList = [];
        if (selectedTeams?.length > 0) {
          res.data.filter(function (item) {
            let i = selectedTeams.findIndex((team) => team.id == item.id);
            if (i <= -1) {
              let obj = {
                id: item.id,
                title_txt: item.team_name,
                img: images.team_img,
                iconclose: 'icon-cross',
              };
              finalList.push(obj);
            }
            return null;
          });
        } else {
          res.data.filter(function (item) {
            let obj = {
              id: item.id,
              title_txt: item.team_name,
              img: images.team_img,
              iconclose: 'icon-cross',
            };
            finalList.push(obj);
          });
        }
        setTeams(finalList);
      }
    });
  }, [searchedTeam]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpen = (course_id = null, product_type = null) => {
    if (course_id === null &&
      (Object.keys(selected).length === 0 || Object.values(selected).includes(true) === false)) {
      setAlert(true);
      setAlertResponse({
        status: 'error',
        message: 'Please select course first.',
      });
      return false;
    }
    if (course_id != null) {
      let course = courses.filter((row) => {
        if (row.course_id == course_id && row.product_type == product_type) {
          return row;
        }
      });
      setSelectedCourse(course[0].title);
    }
    setOpen(true);
  };

  const handleClear = () => {
    setAllSelected(false);
    setSelected({});
    setValue('page', 0);
    setPage(0);
    setRowsPerPage(10);
    reset({
      category: '',
      content: '',
      sortType: '',
    });
  };

  const handleClose = () => {
    setOpen(false);
    setTeamsShow(false);
    setUsersShow(false);
    let addedUser = [];
    selectedUsers.map((el) => addedUser.push(el));
    setSelectedUsers([]);
    setUsers([...addedUser, ...users]);
    let addedTeams = [];
    selectedTeams.map((el) => addedTeams.push(el));
    setSelectedTeams([]);
    setTeams([...addedTeams, ...teams]);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - courses?.length) : 0;

  const onSubmit = async (formData, e) => {
    setAllSelected(false);
    setSelected({});
    fetchData(formData);
    setPage(0);
  };

  const completeAssignment = async () => {
    let courseList = [];
    if (selected) {
      Object.keys(selected).filter((key, i) => {
        if (selected[key] === true) {
          let course = key.split('-')
          courseList.push({
            id: Number(course[0]),
            product_type: course[1]
          })
        }
      })
    }

    let formData = {
      users: usersShow && selectedUsers?.length > 0 ? _.map(selectedUsers, 'id') : [],
      teams: teamsShow && selectedTeams?.length > 0 ? _.map(selectedTeams, 'id') : [],
      courses: courseList,
    };
    const response = await assignCourses(formData);
    if (response.status === 'success') {
      fetchData();
    }
    setAlertResponse(response);
    setAlert(true);
    setOpen(false);
    setUsersShow(false);
    setTeamsShow(false);
    setSelected({});
    setTimeout(() => {
      setAlert(false);
    }, 3000);
    setSelectedCourse([]);
    setSelectedUsers([]);
    setSelectedTeams([]);
  };
  return (
    <>
      {/* research-report */}
      <div className="research-report">
        {/* <Accordion> */}
        <div className="course-heading-block">
          <div className="title">
          </div>
          <div className="course-search-bar">
            <SearchBar
              placeholder={props.heading_block.placeholder}
              value={searched}
              onChange={(searchVal) => requestSearch(searchVal)}
              onCancelSearch={() => cancelSearch('courses')}
            />
          </div>
          <div className="assign-btn-group group" onClick={() => handleClickOpen()}>
            <div className="btn btn-assign">
              <i className="icon icon-assign-icon-team"></i>
              <span>{props.heading_block.btn_assign}</span>
            </div>
          </div>
        </div>
        <form className="filter-block" action="#" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-box-group">
            <div className="box select-box">
              <div className="head">
                <label>Categories</label>
              </div>
              <div className="select-box">
                <i className="icon icon-dropdown"></i>
                <select {...register('category')}>
                  {categoryList &&
                    categoryList.map((list, i) => {
                      return (
                        <option value={list.id}>{list.categoryName}</option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="box select-box">
              <div className="head">
                <label>Content</label>
              </div>
              <div className="select-box">
                <i className="icon icon-dropdown"></i>
                <select {...register('content')}>
                  <option value="">ALL</option>
                  <option value="OC">Video Courses</option>
                  <option value="PT">Practice Test</option>
                  <option value="LAB">Labs</option>
                  <option value="SANDBOX">Sandbox</option>
                </select>
              </div>
            </div>
            <div className="box select-box">
              <div className="head">
                <label>Sort by</label>
              </div>
              <div className="select-box">
                <i className="icon icon-dropdown"></i>
                <select {...register('sortType')}>
                  <option value="">ALL</option>
                  <option value="ASC">A-Z</option>
                  <option value="DESC">Z-A</option>
                </select>
              </div>
            </div>
          </div>
          <div className="btn-group mt-5">
            <button className={`btn btnMain btn-rounded`} style={{ marginTop: '10px', borderRadius: '5px' }}>
              Search
            </button>
            <button className={`btn btnMain btn-rounded`} style={{ marginTop: '10px', borderRadius: '5px', marginLeft: '10px' }} onClick={handleClear}>
              Clear
            </button>
          </div>
        </form>
      </div>
      {/* table */}
      <TableContainer component={Paper} className="table-content">
        {!loading ? (
          <Table className="course-table">
            <TableHead>
              <TableRow>
                <TableCell className="check_group" padding="checkbox">
                  <Checkbox
                    checked={allSelected || isAllSelected}
                    onChange={toggleAllSelected}
                    indeterminate={!!isIndeterminate}
                    inputProps={{ 'aria-label': 'select all courses' }}
                  />
                </TableCell>
                <TableCell className="table-heading">S.No</TableCell>
                <TableCell className="managers table-heading">Course Name</TableCell>
                <TableCell className="content-box table-heading">Content Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses?.length > 0 &&
                courses.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="check_group" padding="checkbox">
                      <Checkbox onChange={toggleSelected(row.course_id, row.product_type)}
                        checked={
                          selected[row.course_id + '-' + row.product_type] ||
                          allSelected
                        }
                      />
                    </TableCell>
                    <TableCell>{i + (page * rowsPerPage) + 1}</TableCell>
                    <TableCell>{course(row.title, row.seo_details)}</TableCell>
                    <TableCell>
                      {content_box(row.web_counts, row.product_type)}
                    </TableCell>
                  </TableRow>
                ))}
              {!courses?.length && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell className="no-course" colSpan={6}>
                    No Result Found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        ) :
          <div className='loader-div'>
            <PulseLoader />
          </div>}
      </TableContainer>
      {courses?.length > 0 && (
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
      )}
      <MessageAlert
        severity={alertResponse?.status}
        message={alertResponse?.message}
        onClick={() => {
          setAlert(false);
        }}
        open={alert}
      />
      {/* modal-block */}
      <ModalDefault
        open={open}
        handleClose={handleClose}
        searchedUser={searchedUser}
        setSearchedUser={setSearchedUser}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        setUsers={setUsers}
        users={users}
        searchedTeam={searchedTeam}
        setSearchedTeam={setSearchedTeam}
        teams={teams}
        setTeams={setTeams}
        setSelectedTeams={setSelectedTeams}
        selectedTeams={selectedTeams}
        selectedCourse={selectedCourse}
        completeAssignment={completeAssignment}
        teamsShow={teamsShow}
        usersShow={usersShow}
        handleCheckbox={handleCheckbox}
        cancelSearch={cancelSearch}
        {...props.modal_default}
      />
    </>
  );
};
export default CourseTable;
