import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import CardHeader from "@mui/material/CardHeader";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import "./TransferList.scss";

const TransferList = (props) => {
  const { selectedUsers, setSelectedUsers, users, setUsers, requestSearch, defaultSelectedUsers, setOpen, setSeverity, setMessage } = props;
  const [checked, setChecked] = React.useState([]);
  const [leftChecked, setLeftChecked] = useState(0);
  const [rightChecked, setRightChecked] = useState(0);
  const [assignCourse, setAssignCourse] = useState([]);
  const [assignRCourse, setAssignRCourse] = useState([]);
  const [allSelectedCourse, setAllSelectedCourse] = useState([]);

  useEffect(() => {
    setAllSelectedCourse(selectedUsers)
  }, [selectedUsers])

  useEffect(() => {
    setLeftChecked(assignCourse.length);
    setRightChecked(assignRCourse.length);
  }, [assignCourse, assignRCourse])

  const handleLeftToggle = (value, type) => () => {
    let course = assignCourse;
    let isSelected = assignCourse?.some((item) => { return item.id == value.id })
    if (isSelected) {
      course = assignCourse?.filter((item) => {
        return !(item.id == value.id)
      })
    } else {
      course.push(value)
    }
    setAssignCourse([...course])
  };

  const handleRightToggle = (value, type) => () => {
    let course = assignRCourse;
    let isSelected = assignRCourse?.some((item) => { return item.id == value.id })
    if (defaultSelectedUsers.includes(value.id)) {
      const alertObj = {
        status: "warning",
        message: "Already selected users can't be removed.",
      }
      setOpen(true);
      setSeverity(alertObj.status);
      setMessage(alertObj.message);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
      return;
    }
    if (isSelected) {
      course = assignRCourse?.filter((item) => { return !(item.id == value.id) })
    } else {
      course.push(value)
    }
    setAssignRCourse([...course])
  };

  const handleCheckedRight = async () => {
    setSelectedUsers([...assignCourse, ...selectedUsers])
    let rmainCourses = []
    users?.map((item) => {
      let isSelected = false;
      assignCourse?.map((value, index) => {
        if (value.id == item.id && value.type == item.type) {
          isSelected = true;
        }
      })
      if (!isSelected) {
        rmainCourses.push(item)
      }
    })
    setAssignCourse([])
    setUsers([...rmainCourses])
  };

  const requestSelectSearch = (searchText) => {
    setAllSelectedCourse(selectedUsers.length ? selectedUsers?.filter(val => val?.user_details?.email?.toLowerCase().includes(searchText?.toLowerCase())) : [])
  };

  const handleCheckedLeft = () => {
    setUsers([...assignRCourse, ...users])
    let rmainCourses = []
    selectedUsers?.map((item) => {
      let isSelected = false;
      assignRCourse?.map((value, index) => {
        if (value.id == item.id && value.type == item.type) {
          isSelected = true;
        }
      })
      if (!isSelected) {
        rmainCourses.push(item)
      }
    })
    setAssignRCourse([])
    setSelectedUsers([...rmainCourses])
  };

  const customList = (title, items) => (
    <>
      <div className="inner-box">
        <div className="row">
          <div className="col-md-2">
          </div>
          <div className="col-md-10">
            <CardHeader sx={{ px: 2, py: 1 }} title={title}
              subheader={`${title == 'All Users' ? assignCourse?.length : assignRCourse?.length}/
              ${title == 'All Users' ? users?.length : selectedUsers?.length} users Selected`}
            />
          </div>
        </div>
        <div className="search-bar">
          {title == 'All Users' ?
            <input type="text" placeholder="Search users and add" onChange={(e) => { requestSearch('users', e.target.value) }} />
            : <input type="text" placeholder="Search users and add" onChange={e => requestSelectSearch(e.target.value)}
            />
          }
        </div>
        <List dense component="div" role="list" sx={{ height: 282, bgcolor: "background.paper", overflow: "auto" }}>
          {items?.length > 0 && items?.map((value) => {
            const labelId = `transfer-list-all-item-${value.id + value.type}-label`;
            return (
              <ListItem key={value.id + value.type} role="listitem" button
                onClick={title == 'All Users' ? handleLeftToggle(value, title) : handleRightToggle(value, title)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={
                      title == 'All Users' ? assignCourse?.some(item => item.id == value.id) :
                        assignRCourse?.some(item => item.id == value.id)
                    }
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                </ListItemIcon>
                <div className="list-item">
                  <div className="course-img">
                    {value?.firstname &&
                      <div>
                        <div className="profile-title">{value.firstname + ' '}{value.lastname}</div>
                        <div className="email-id">{value.email}</div>
                      </div>
                    }
                    {value.user_details?.firstname &&
                      <div>
                        <div className="profile-title">{value.user_details?.firstname + ' '}{value.user_details?.lastname}</div>
                        <div className="email-id">{value.user_details?.email}</div>
                      </div>
                    }
                    <div className="course-title">{value.title_txt || value.name}</div>
                  </div>
                </div>
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </div>
    </>
  );
  return (
    <div className="transfer-list">
      <div className="list-box right">{customList("All Users", users)}</div>
      <div className="Nxt-Pre-Btn">
        <Button
          sx={{ my: 0.5 }}
          variant="outlined"
          size="small"
          onClick={() => handleCheckedRight()}
          disabled={leftChecked === 0}
          aria-label="move selected right"
        >
          &gt;
        </Button>
        <Button
          sx={{ my: 0.5 }}
          variant="outlined"
          size="small"
          onClick={handleCheckedLeft}
          disabled={rightChecked === 0}
          aria-label="move selected left"
        >
          &lt;
        </Button>
      </div>
      <div className="list-box left">
        {customList("Selected Users", allSelectedCourse)}
      </div>
    </div>
  );
};

export default TransferList;
