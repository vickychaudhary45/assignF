import React, { useState } from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { images } from 'src/config/images';
import TimelineViewMore from './TimelineViewMore';
import "./Timeline.scss";
import 'react-vertical-timeline-component/style.min.css';

const TimelineFrame = ({ timelineInfo, profileImg }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTimelineItem, setSelectedTimelineItem] = useState(null);

  const closeViewMore = () => {
    setIsModalOpen(false);
  }

  const viewAllHandle = (obj) => {
    setSelectedTimelineItem(obj);
    setIsModalOpen(!isModalOpen);
  }

  const sortTimelineDescendingOrder = (timeline) => {
    if (!timeline || !Array.isArray(timeline)) {
      return [];
    }
    return timeline?.sort((a, b) => new Date(b.latest_create_at) - new Date(a.latest_create_at));
  }
  const timeline = sortTimelineDescendingOrder(timelineInfo?.timeline)

  const getFormattedDate = (inputDate) => {
    const date = new Date(inputDate);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
  }

  return (
    <div className='timeline-container'>
      <VerticalTimeline lineColor='#ddd'>
        {(timeline || [])?.map((obj, index) => {
          if (obj?.data?.length !== 0) {
            return (
              <VerticalTimelineElement
                key={index}
                className="vertical-timeline-element--education"
                iconStyle={{ background: '#E05613', color: '#fff', transform: 'scale(0.3)' }}
                contentStyle={{ boxShadow: 'none', display: 'flex', gap: '12px' }}
              >
                <div className='timeline-content'>
                  <h6 className="vertical-timeline-element-title">{obj.title}</h6>
                  <h6 className='course'>{obj?.latest_name}</h6>
                  <div onClick={() => viewAllHandle(obj)}>View all</div>
                </div>
                <h6 className="vertical-timeline-element-subtitle date">{getFormattedDate(obj?.latest_create_at)}</h6>
              </VerticalTimelineElement>
            );
          }
          return null;
        })}
        <VerticalTimelineElement
          key={timeline?.length + 1}
          className="vertical-timeline-element--work"
          contentStyle={{ background: '#fff0e2', color: '#fff', display: 'flex', gap: '12px' }}
          contentArrowStyle={{ borderRight: '7px solid #fff0e2' }}
          iconStyle={{ background: '#E05613', color: '#fff', transform: 'scale(0.3)' }}
        >
          <div className='timeline-profile'>
            <div className='first-div'>
              <figure>
                <img className="img-full" alt="/"
                  src={profileImg !== null && profileImg !== undefined && profileImg !== '' ? `${process.env.REACT_APP_B2B_MEDIA_URL}${profileImg}` : images.user_img}
                />
              </figure>
            </div>
            <div className='second-div'>
              <h6 className="vertical-timeline-element-title">User Registration</h6>
            </div>
          </div>
          <h5 className="vertical-timeline-element-subtitle">{getFormattedDate(timelineInfo?.created_at)}</h5>
        </VerticalTimelineElement>
      </VerticalTimeline>
      <TimelineViewMore
        open={isModalOpen}
        close={closeViewMore}
        selectedTimelineItem={selectedTimelineItem}
        getFormattedDate={getFormattedDate}
      />
    </div>
  )
}

export default TimelineFrame