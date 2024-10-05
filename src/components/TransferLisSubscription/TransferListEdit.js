import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import CardHeader from "@mui/material/CardHeader";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import "./TransferList.scss";

const TransferList = (props) => {
  const { selectedCourses, setSelectedCourses, courses, setCourses, requestSearch } = props;
  const [leftChecked, setLeftChecked] = useState(0);
  const [rightChecked, setRightChecked] = useState(0);
  const [assignCourse, setAssignCourse] = useState([]);
  const [assignRCourse, setAssignRCourse] = useState([]);
  const [allSelectedCourse, setAllSelectedCourse] = useState([]);

  useEffect(() => {
    setAllSelectedCourse(selectedCourses)
  }, [selectedCourses])

  useEffect(() => {
    setCourses(props.courses)
    setSelectedCourses(props.selectedCourses)
  }, [props])

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
    if (isSelected) {
      course = assignRCourse?.filter((item) => { return !(item.id == value.id) })
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

  const requestSelectSearch = (searchText) => {
    setAllSelectedCourse(selectedCourses?.filter(val => val.title_txt.toLowerCase().includes(searchText.toLowerCase())))
  }
  const handleCheckedLeft = () => {
    setCourses([...assignRCourse, ...courses])
    let rmainCourses = []
    selectedCourses?.map((item) => {
      let isSelected = false;
      assignRCourse?.map((value, index) => {
        if (value.id == item.id) {
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
        <CardHeader sx={{ px: 2, py: 1 }} title={title}
          subheader={`${title == 'All Subscriptions' ? assignCourse.length : assignRCourse.length}/
            ${title == 'All Subscriptions' ? courses.length : selectedCourses.length} Subscriptions Selected`}
        />
        <div className="search-bar">
          {title == 'All Subscriptions' ?
            <input type="text" placeholder="Search Subscription and add" onChange={(e) => { requestSearch('subscriptions', e.target.value) }} />
            : <input type="text" onChange={e => requestSelectSearch(e.target.value)} placeholder="Search Subscription and add"
            />
          }
        </div>
        <List dense component="div" role="list" sx={{ height: 282, bgcolor: "background.paper", overflow: "auto" }}>
          {items.length > 0 && items?.map((value) => {
            const labelId = `transfer-list-all-item-${value?.id}-label`;
            return (
              <ListItem key={value?.id} role="listitem" button
                onClick={title == 'All Subscriptions' ? handleLeftToggle(value, title) : handleRightToggle(value, title)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={
                      title == 'All Subscriptions' ? assignCourse?.some(item => item.id == value.id) :
                        assignRCourse?.some(item => item.id == value?.id)
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
                    <figure>
                      <img className="img-full" src={value?.iconlear} alt="" />
                    </figure>
                    <div className="course-title">{value?.name || value?.title_txt}</div></div>
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
      <div className="list-box right">{customList("All Subscriptions", courses)}</div>
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
        {customList("Assigned Subscriptions", allSelectedCourse)}
      </div>
    </div>
  );
};

export default TransferList;
