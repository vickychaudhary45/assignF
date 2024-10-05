import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import CardHeader from "@mui/material/CardHeader";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import { images } from "src/config/images";
import "./TransferList.scss";

const TransferList = (props) => {
  const { selectedCourses, setSelectedCourses, courses, setCourses, requestSearch, defaultSelectedCourses = [] } = props;
  const [leftChecked, setLeftChecked] = useState(0);
  const [rightChecked, setRightChecked] = useState(0);
  const [assignCourse, setAssignCourse] = useState([]);
  const [assignRCourse, setAssignRCourse] = useState([]);
  const [allSelectedCourse, setAllSelectedCourse] = useState([]);
  const URL = window.location.href;
  const isEdit = URL.includes("edit-learning");

  useEffect(() => {
    setAllSelectedCourse(selectedCourses)
  }, [selectedCourses])

  useEffect(() => {
    setLeftChecked(assignCourse.length);
    setRightChecked(assignRCourse.length);
  }, [assignCourse, assignRCourse])

  const handleLeftToggle = (value, type) => () => {
    let course = assignCourse;
    let isSelected = assignCourse?.some((item) => { return item.id == value.id && item.type == value.type })
    if (isSelected) {
      course = assignCourse?.filter((item) => {
        return !(item.id == value.id && item.type == value.type)
      })
    } else {
      course.push(value)
    }
    setAssignCourse([...course])
  };

  const handleRightToggle = (value, type) => () => {
    let course = assignRCourse;
    let isSelected = assignRCourse?.some((item) => { return item.id == value.id && item.type == value.type })
    if (isSelected) {
      course = assignRCourse?.filter((item) => { return !(item.id == value.id && item.type == value.type) })
    } else {
      course.push(value)
    }
    setAssignRCourse([...course])
  };

  const handleCheckedRight = async () => {
    setSelectedCourses([...assignCourse, ...selectedCourses])
    let rmainCourses = []
    courses?.map((item) => {
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
    setCourses([...rmainCourses])
  };

  const handleCheckedLeft = () => {
    setCourses([...assignRCourse, ...courses])
    let rmainCourses = []
    selectedCourses?.map((item) => {
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
    setSelectedCourses([...rmainCourses])
  };
  const customList = (title, items) => (
    <>
      <div className="title">{props.title}</div>
      <div className="inner-box">
        <div className="row">
          <div className="col-md-2">
          </div>
          <div className="col-md-10">
            <CardHeader sx={{ px: 2, py: 1 }} title={title}
              subheader={`${title == 'All Courses' ? assignCourse.length : assignRCourse.length}/
              ${title == 'All Courses' ? courses.length : selectedCourses.length} Course Selected`}
            />
          </div>
        </div>
        {isEdit && title !== 'All Courses' ? <div></div> :
          <div className="search-bar">
            <input type="text" placeholder="Search course and add"
              onChange={(e) => { requestSearch('courses', e.target.value) }}
            />
          </div>
        }
        <List dense component="div" role="list" sx={{ height: 282, bgcolor: "background.paper", overflow: "auto" }}>
          {items.length > 0 && items?.map((value) => {
            const labelId = `transfer-list-all-item-${value.id + value.type}-label`;
            return (
              <ListItem key={value.id + value.type} role="listitem" button
                onClick={title === 'All Courses' ? handleLeftToggle(value, title) : handleRightToggle(value, title)}
              >
                <ListItemIcon>
                  {isEdit && title !== 'All Courses' ?
                    "" : <Checkbox
                      checked={title === 'All Courses' ? assignCourse?.some(item => item.id == value.id && item.type == value.type)
                        : assignRCourse?.some(item => item.id == value.id && item.type == value.type)}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />}
                </ListItemIcon>
                <div className="list-item">
                  <div className="course-img">
                    <figure>
                      <img className="img-full" alt=''
                        src={value?.src ? process.env.REACT_APP_WEB_MEDIA_URL + value?.src?.replace("media/", "") : images.lambda}
                      />
                    </figure>
                    <div className="course-title">{value.title_txt || value.name}-<b>{value.type}</b></div>
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
  const AssignedCourses = (title, items) => (
    <>
      <div className="title">{props.title}</div>
      <div className="inner-box" style={{ height: '360px' }}>
        <div className="row">
          <div className="col-md-10">
            <CardHeader sx={{ px: 2, py: 1 }} title={title}
              subheader={`${title == 'All Courses' ? assignCourse.length : assignRCourse.length}/
              ${title == 'All Courses' ? courses.length : selectedCourses.length} Course Selected`}
            />
          </div>
        </div>
        {isEdit && title !== 'All Courses' ? <div></div> :
          <div className="search-bar">
            <input type="text" placeholder="Search course and add"
              onChange={(e) => { requestSearch('courses', e.target.value) }}
            />
          </div>
        }
        <List dense component="div" role="list" sx={{ height: 320, bgcolor: "background.paper", overflow: "auto" }}>
          {items.length > 0 && items?.map((value) => {
            const labelId = `transfer-list-all-item-${value.id + value.type}-label`;
            return (
              <ListItem
                key={value.id + value.type}
                role="listitem"
                button
                onClick={title === 'All Courses' ? handleLeftToggle(value, title) : handleRightToggle(value, title)}
              >
                <ListItemIcon>
                  {isEdit && title !== 'All Courses' ? "" :
                    <Checkbox
                      checked={title === 'All Courses' ? assignCourse?.some(item => item.id == value.id && item.type == value.type)
                        : assignRCourse?.some(item => item.id == value.id && item.type == value.type)}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  }
                </ListItemIcon>
                <div className="list-item">
                  <div className="course-img">
                    <figure>
                      <img className="img-full" alt=''
                        src={value?.src ? process.env.REACT_APP_WEB_MEDIA_URL + value?.src?.replace("media/", "") : images.lambda}
                      />
                    </figure>
                    <div className="course-title">{value.title_txt || value.name}-<b>{value.type}</b></div>
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
      <div className="list-box right">{customList("All Courses", courses)}</div>
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
        {isEdit ? "" :
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
        }
      </div>
      <div className="list-box left">
        {isEdit ? AssignedCourses("Assigned Courses", allSelectedCourse) : customList("Assigned Courses", allSelectedCourse)}
      </div>
    </div>
  );
};

export default TransferList;
