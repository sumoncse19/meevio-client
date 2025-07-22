import { useLocation } from "react-router-dom"; 
import VideoCallPage from "../MainCall/VideoCallPage";

const VideoCall = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roomId = queryParams.get("roomId");
  const userName = queryParams.get("userName") || "Anonymous";

  return (
    <div>
      <VideoCallPage initialRoomId={roomId} userName={userName} />
    </div>
  );
};

export default VideoCall;