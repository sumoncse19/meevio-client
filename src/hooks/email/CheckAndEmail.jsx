import React, { useEffect, useRef } from 'react';
import useScheduleData from '../schedule_data/useScheduleData';
import sendEmail from './sendEmail';

function CheckAndEmail() {
  console.log("CheckAndEmail component mounted");

  const { isLoading, isError, refetch, scheduleData } = useScheduleData();
  console.log(scheduleData);
  
  const sentMeetingsRef = useRef([]); // To track which meetings already sent

  // Function to filter the schedule data for meetings that are 1 hour away
  const filterMeetingsOneHourLeft = () => {
    const now = new Date();
    return scheduleData?.filter((schedule) => {
      const meetingTime = new Date(`${schedule.MeetDate} ${schedule.MeetTime}`);
      const diffInMs = meetingTime - now;
      const diffInHours = diffInMs / (1000 * 60 * 60);
      return diffInHours >= 0.99 && diffInHours <= 1.01;
    }) || [];
  };
 
  const meetingsOneHourLeft = filterMeetingsOneHourLeft();

  useEffect(() => {
    if (meetingsOneHourLeft.length > 0) {
      meetingsOneHourLeft.forEach((meeting) => {
        const meetingId = `${meeting.MeetDate}-${meeting.MeetTime}-${meeting.Topic}`; // Unique ID based on date-time-topic
        if (!sentMeetingsRef.current.includes(meetingId)) {
          sendEmail(meeting) // Send email with meeting data
          
        }
      });
    }
  }, [meetingsOneHourLeft]);  // Only re-run effect if meetingsOneHourLeft changes
 
 
  useEffect(() => {
    const interval = setInterval(() => {
      refetch(); 
    }, 60000); 
  
    return () => clearInterval(interval);
  }, []);
}

export default CheckAndEmail;