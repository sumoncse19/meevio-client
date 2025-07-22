const sendEmail = (meeting) => {
  console.log(meeting);

  fetch("https://meevio-vfak.onrender.com/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: meeting.email,
      subject: "Meeting Reminder",
      message: `Reminder for meeting ${meeting.Topic} at ${meeting.MeetTime} on ${meeting.MeetDate}.`,
    }),
  })
    .then((res) => console.log(res))
    .then((result) => console.log(result))
    .catch((error) => console.error("Error:", error));
};

export default sendEmail;
