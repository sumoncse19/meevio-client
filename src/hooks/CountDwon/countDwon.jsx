import React from "react";

import moment from "moment";
function countDwon(date, time) {
  const now = moment();
  // get current time
  // meeting time and - now time get
  // remaning time
  const meetimeTime = moment(`${date} ${time}`);
  
  // sub opration
  const durationTime = moment.duration(meetimeTime.diff(now));

  if (durationTime.asSeconds() <= 10) {
    return "Meeting started";
  }

  // then
  const hour = Math.floor(durationTime.asHours());
  // get hour formate
  const minutes = durationTime.minutes();
  const seconds = durationTime.seconds();

  return `${Math.abs(hour)}h ${Math.abs(minutes)}m ${Math.abs(seconds)}s`;
}

export default countDwon;
