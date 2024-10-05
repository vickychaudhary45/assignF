import React, { useEffect, useState } from 'react';
import { images } from '../../config/images';
import { Link } from 'react-router-dom';
import ModalDelete from '../ModalDelete/ModalDelete';
import ModalDefault from '../ModalDefault/ModalDefault';
import ModalQuick from '../ModalQuick/ModalQuick';
import { Table, Paper, TableBody, TableContainer, TableHead, TableRow, TableCell, Checkbox, TablePagination } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import { getLearningPathById, getLearningPaths, removeLearningPaths, assignLearningPath } from 'src/services/learning-paths/services';
import moment from 'moment';
import MessageAlert from '../MessageAlert/MessageAlert';
import { searchuser, getCourseTeams } from 'src/services/teams-services/services';
import _ from 'lodash';
import TablePaginationActions from '../Pagination/Pagination';
import { PulseLoader } from '../Loader/Loader';
import './LearningTable.scss';

const members = (nub) => {
  return (
    <div className="members">
      <span>{nub}</span>
    </div>
  );
};

const managers = (img, user_name, user_id) => {
  const URL = process.env.REACT_APP_B2B_MEDIA_URL;
  return (
    <div className="managers">
      <div className="profile">
        <figure>
          <img style={{ borderRadius: "50%" }} className="img-full" src={img ? URL + img : images.user} alt="" />
        </figure>
        <div className="detail">
          <div className="user-name">{user_name}</div>
          <div className="user-id">{user_id}</div>
        </div>
      </div>
    </div>
  );
};

const modified = (num) => {
  return (
    <div className="modified">
      <span>{num}</span>
    </div>
  );
};

const LearningTable = (props) => {
  const [open, setOpen] = React.useState(false);
  const [response, setResponse] = React.useState(false);
  const [modaldel, setModaldel] = React.useState(false);
  const [modalqui, setModalqui] = React.useState(false);
  const [learningPaths, setLearningPaths] = React.useState(false);
  const [learningPath, setLearningPath] = React.useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [searched, setSearched] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [allSelected, setAllSelected] = React.useState(false);
  const [selected, setSelected] = React.useState({});
  const [select, setSelect] = React.useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchedUser, setSearchedUser] = useState(null);
  const [teams, setTeams] = useState([]);
  const [searchedTeam, setSearchedTeam] = useState(null);
  const [teamsShow, setTeamsShow] = useState(false);
  const [usersShow, setUsersShow] = useState(false);
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleCheckbox = (section) => {
    if (section === 'Users') {
      setUsersShow(!usersShow);
    }
    if (section === 'Teams') {
      setTeamsShow(!teamsShow);
    }
  };

  const toggleAllSelected = (e) => {
    const { checked } = e.target;
    setAllSelected(checked);
    learningPaths &&
      setSelected(
        learningPaths.reduce(
          (selected, { id }) => ({
            ...selected,
            [id]: checked,
          }),
          {}
        )
      );
  };

  const toggleSelected = (id) => (e) => {
    if (!e.target.checked) {
      setAllSelected(false);
    }
    setSelected((selected) => ({
      ...selected,
      [id]: !selected[id],
    }));
  };

  useEffect(() => {
    if (selected) {
      const countObj = Object.keys(selected).filter((id, i) => {
        if (selected[id] === true) {
          return id;
        }
      });
      if (countObj.length > 0) {
        if (countObj.length === 1) {
          let learningPath = learningPaths.filter((row) => {
            if (row.id == countObj[0]) {
              return row;
            }
          });
          setSelectedCourse(learningPath[0].name);
        } else {
          setSelectedCourse(
            `You have selected ${countObj.length} Learning Paths`
          );
        }
      } else {
        setSelectedCourse(null);
      }
    }
  }, [selected]);

  const selectedCount = Object.values(selected).filter(Boolean).length;

  const isAllSelected = selectedCount === learningPaths?.length;
  const isIndeterminate = selectedCount && selectedCount !== learningPaths?.length;

  const handleClickOpen = (id = null) => {
    if (!id && (Object.keys(selected).length === 0 || Object.values(selected).includes(true) === false)) {
      setAlert(true);
      setResponse({
        status: 'error',
        message: 'Please Select The Learning Path.',
      });
      setTimeout(() => {
        setAlert(false);
      }, 3000)
      return false;
    }
    if (id != null) {
      let learningPath = learningPaths.filter((row) => {
        if (row.id == id) {
          return row;
        }
      });
      setSelectedCourse(learningPath[0].name);
      setSelected((selected) => ({
        ...selected,
        [id]: !selected[id],
      }));
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUsersShow(false);
    setTeamsShow(false);
  };

  const requestSearch = (searchedVal) => {
    setSearched(searchedVal);
    setPage(0);
  };

  const cancelSearch = () => {
    setSearched('');
  };

  const fetchData = async () => {
    const response = await getLearningPaths(page, rowsPerPage, searched);
    if (response.status === 'success') {
      setLearningPaths(response?.data);
      setLoading(false)
      setTotalRows(response.pagination.total);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, searched]);

  useEffect(async () => {
    clearTimeout(searchUserTimeout);
    var searchUserTimeout = setTimeout(async () => {
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

  const deletePath = async (id) => {
    await removeLearningPaths(id).then((res) => {
      setResponse(res);
      setAlert(true);
      if (res.status === 'success') {
        fetchData();
      }
      setModaldel(false);
    });
  };

  const deleteClose = () => {
    setModaldel(false);
  };

  const quickClickOpen = async (id) => {
    await getLearningPathById(id).then((res) => {
      if (res.status === 'success' && res?.data) {
        props.modal_quick.subtitle = res.data.name;
        props.modal_quick.courses_block.courseData = res.data.courses;
        props.modal_quick.learning_block.learningAssginedUser = res.data.assigned_members;
        props.modal_quick.learning_block.learningPathUsers = res.data.assigned_members_name;
        props.modal_quick.learning_block.learningPathData = res.data.subscriptions;
        setLearningPath(res.data);
        setModalqui(true);
      } else {
        setResponse(res);
        setAlert(true);
      }
    });
  };

  const quickClose = () => {
    setLearningPath(false);
    setModalqui(false);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - learningPaths.length) : 0;

  const completeAssignment = async () => {
    let pathList = [];
    Object.keys(selected).filter((course_id, i) => {
      if (selected[course_id] === true) {
        pathList.push(Number(course_id));
      }
    });
    let formData = {
      is_users_selected: usersShow && selectedUsers?.length > 0 ? 1 : 0,
      is_teams_selected: teamsShow && selectedTeams?.length > 0 ? 1 : 0,
      user_id: usersShow && selectedUsers?.length > 0 ? _.map(selectedUsers, 'id') : [],
      team_id: teamsShow && selectedTeams?.length > 0 ? _.map(selectedTeams, 'id') : [],
      learning_path_id: pathList,
    };
    const response = await assignLearningPath(formData);
    if (response.status === 'success') {
      fetchData();
    }
    setResponse(response);
    setAlert(true);
    setOpen(false);
    setUsersShow(false);
    setTeamsShow(false);
    setSelected({});
    setSelect(false);
    setSelectedCourse(null);
    setSelectedUsers([]);
    setSelectedTeams([]);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  const actions = (learning_id, title = null) => {
    return (
      <div className="actions icon icon-action">
        <div className="action-dropdown">
          <ul>
            <li>
              <div className="link" onClick={() => handleClickOpen(learning_id)}>
                <i className="icon icon-assign-icon-team"></i>
                <span>Assign to teams/users</span>
              </div>
            </li>
            <li>
              <Link className="link" to={`/edit-learning/${learning_id}`}>
                <i className="icon icon-edit"></i>
                <span>Edit</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  //changes the width from 80% to 50%
  const course = (calories, img_learn, learning_id) => {
    return (
      <div className="course">
        <div className="course-img">
          <figure>
            <img className="img-full" style={{ width: '100%' }} src={img_learn} alt="" />
          </figure>
          <div className="course-detail">
            <div className="title-link" onClick={() => quickClickOpen(learning_id)} >
              {calories}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* course-heading-block */}
      <div className="course-heading-block">
        <div className="title">
        </div>
        <div className="search-bar">
          <SearchBar
            placeholder={props.heading_block.placeholder}
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />
        </div>
        <div className="assign-btn-group group" onClick={() => handleClickOpen()}>
          <div className="btn btn-assign">
            <i className="icon icon-assign-icon-team"></i>
            <span>{props.heading_block.btn_assign}</span>
          </div>
        </div>
      </div>
      {/* table */}
      <TableContainer component={Paper} className="table-content">
        {!loading ? (
          <Table className="learning-table">
            <TableHead>
              <TableRow>
                {/* {select && */}
                <TableCell className="check_group" padding="checkbox">
                  <Checkbox
                    checked={allSelected || isAllSelected}
                    onChange={toggleAllSelected}
                    indeterminate={!!isIndeterminate}
                    inputProps={{ 'aria-label': 'select all courses' }}
                  />
                </TableCell>
                {/* } */}
                <TableCell className="course table-heading">Learning Paths Name</TableCell>
                <TableCell className="members table-heading">Assigned Members</TableCell>
                <TableCell className="managers table-heading">Created By</TableCell>
                <TableCell className="modified table-heading">Created</TableCell>
                <TableCell className="modified table-heading">Modified</TableCell>
                <TableCell className="actions table-heading">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {learningPaths?.length > 0 &&
                learningPaths?.map((row, i) => (
                  <TableRow key={i}>
                    {/* {select && */}
                    <TableCell className="check_group" padding="checkbox">
                      <Checkbox
                        checked={selected[row.id] || allSelected}
                        onChange={toggleSelected(row.id)}
                      />
                    </TableCell>
                    {/* // } */}
                    <TableCell component="th" scope="row">
                      {course(row.name, images.learning_img, row.id)}
                    </TableCell>
                    <TableCell>{members(row.assigned_members)}</TableCell>
                    <TableCell>
                      {managers(row.profile_picture, row.created_by, row.email)}
                    </TableCell>
                    <TableCell>
                      {modified(moment(row.created_at).format('DD MMM, YYYY'))}
                    </TableCell>
                    <TableCell>
                      {row.updated_at ? modified(moment(row.updated_at).format('DD MMM, YYYY')) : "-"}
                    </TableCell>
                    <TableCell>{actions(row.id, row.name)}</TableCell>
                  </TableRow>
                ))}
              {!learningPaths.length && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell style={{ textAlign: 'center' }} colSpan={8}>
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
      {learningPaths?.length > 0 && (
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
      )
      }
      {/* Modal-Delete */}
      <ModalDelete
        open={modaldel}
        fn={deletePath}
        handleClose={deleteClose}
        {...props.modal_delete}
      />
      {/* Modal-Quick */}
      <ModalQuick
        open={modalqui}
        learningPath={learningPath}
        handleClose={quickClose}
        {...props.modal_quick}
      />
      {/* Modal-Default */}
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
        {...props.modal_default}
      />
      {/* Alert modal */}
      <MessageAlert
        severity={response?.status === 'success' ? response?.status : 'error'}
        message={response?.message}
        onClick={() => {
          setAlert(false);
        }}
        open={alert}
      />
    </>
  );
};
export default LearningTable;
