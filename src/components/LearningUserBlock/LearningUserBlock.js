import React from "react";
import { images } from "src/config/images";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import "./LearningUserBlock.scss";

const LearningUserBlock = (props) => {
  return (
    <div className="learning-user-block">
      <div className="list-group">
        <div className="head-block">
          <div className="title">Assigned Users</div>
          <label>{props?.learningAssginedUser} Users</label>
        </div>
        <div className="inner-block">
          <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {props?.learningPathUsers?.map((data, index) => {
              return (
                <ListItem key={index}>
                  <ListItemButton>
                    <ListItemAvatar>
                      {data.profile_picture !== null ?
                        (<Avatar src={process.env.REACT_APP_B2B_MEDIA_URL + data.profile_picture} />)
                        : (<Avatar sx={{ bgcolor: "#034694" }}>{data.firstname[0].toUpperCase()}</Avatar>)}
                    </ListItemAvatar>
                    <ListItemText id={index} primary={data.email} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </div>
      </div>
      <div className="list-group" style={{marginTop: "15px"}}>
        <div className="head-block">
          <div className="title">Subscriptions</div>
          <label>{`${props?.learningPathData.length}`} Subscriptions</label>
        </div>
        {(props?.learningPathData.length > 0) && props?.learningPathData.map((item, index) => {
          return (
            <div className="list-item" key={index}>
              <div className="course-img">
                <figure>
                  <img className="img-full" src={images.bundle_img} alt="" />
                </figure>
                <div className="course-title">{item?.name || item?.title_txt}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LearningUserBlock;
