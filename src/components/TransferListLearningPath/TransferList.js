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
  const { selectedLP, setSelectedLP, learningPath, setLearningPath, requestSearch } = props;
  const [leftChecked, setLeftChecked] = useState(0);
  const [rightChecked, setRightChecked] = useState(0);
  const [assignCourse, setAssignCourse] = useState([]);
  const [assignRCourse, setAssignRCourse] = useState([]);
  const [allSelectedCourse, setAllSelectedCourse] = useState([]);

  useEffect(() => {
    setAllSelectedCourse(selectedLP)
  }, [selectedLP])

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
    setSelectedLP([...assignCourse, ...selectedLP])
    let rmainCourses = []
    learningPath?.map((item) => {
      let isSelected = false;
      assignCourse?.map((value, index) => {
        if (value.id == item.id) {
          isSelected = true;
        }
      })
      if (!isSelected) {
        rmainCourses.push(item)
      }
    })
    setAssignCourse([])
    setLearningPath([...rmainCourses])
  };

  const handleCheckedLeft = () => {
    setLearningPath([...assignRCourse, ...learningPath])
    let rmainCourses = []
    selectedLP?.map((item) => {
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
    setSelectedLP([...rmainCourses])
  };

  const customList = (title, items) => (
    <>
      <div className="inner-box">
        <div className="row">
          <div className="col-md-2">
          </div>
          <div className="col-md-10">
            <CardHeader sx={{ px: 2, py: 1 }} title={title}
              subheader={`${title == 'All Learning Path' ? assignCourse?.length : assignRCourse?.length}/${title == 'All Learning Path' ? learningPath?.length : selectedLP?.length
                } learningPath Selected`}
            />
          </div>
        </div>
        <div className="search-bar">
          {title == 'All Learning Path' ?
            <input type="text" placeholder="Search Learning path and add" onChange={e => { requestSearch('learning_path', e.target.value) }} />
            : <input type="text" placeholder="Search Learning path and add" />
          }
        </div>
        <List dense component="div" role="list" sx={{ height: 282, bgcolor: "background.paper", overflow: "auto" }}>
          {items?.length > 0 && items?.map((value) => {
            const labelId = `transfer-list-all-item-${value.id + value.type}-label`;
            return (
              <ListItem key={value.id + value.type} role="listitem" button
                onClick={title == 'All Learning Path' ? handleLeftToggle(value, title) : handleRightToggle(value, title)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={
                      title == 'All Learning Path' ? assignCourse?.some(item => item.id == value.id) :
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
                    <figure>
                      <img className="img-full" alt=''
                        src={value?.src ? process.env.REACT_APP_WEB_MEDIA_URL + value?.src?.replace("media/", "") : images.lambda}
                      />
                    </figure>
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
      <div className="list-box right">{customList("All Learning Path", learningPath)}</div>
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
        {customList("Selected Learning Path", allSelectedCourse)}
      </div>
    </div>
  );
};

export default TransferList;
