import { useContext, useEffect, useMemo, useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FaEllipsisV, FaVideo, FaPhoneAlt } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { IoIosSend, IoMdInformationCircleOutline, IoMdMenu } from "react-icons/io";
import { RiChatDownloadLine } from "react-icons/ri";
import { encryptMessage, decryptMessage } from "../../utilities/encryptDecrypt";
import { downloadMessagesAsPDF } from "../../utilities/downloadMessagesAsPDF"
import Spinner from "../../components/Spinner";
import { SocketContext } from './../../provider/SocketProvider';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const Dashboard = () => {

  const { socket, currentRoom, setCurrentRoom, UserId, creator, createdAt } = useContext(SocketContext);
  const { user, userLogOut, loading, setLoading } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);
  const [spin, setSpin] = useState(false);
  const [messages, setMessages] = useState([]); // all messages(both sender & receiver) 
  const [message, setMessage] = useState(""); // single message from sender 
  const [roomUsers, setRoomUsers] = useState([]);  // sockets or users that are connected in the room.   
  const [searchUser, setSearchUser] = useState("")

  const navigate = useNavigate();
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  useEffect(() => {
    if (!currentRoom) return; // Prevent running if no room is set

    socket.on("updatedRoomUser", (users) => {
      console.log("Updated room users:", users);
      setRoomUsers(users);
    });

    // Handle incoming messages
    socket.on("receiveMessage", (msg) => {
      const decryptedMessage = {
        ...msg,
        message: decryptMessage(msg.message),
      };
      setMessages((prevMsg) => [...prevMsg, decryptedMessage]);
    });

    socket.on("RoomJoined", (roomId) => {
      setCurrentRoom(roomId);
      setLoading(false);
      navigate("/dashboard");
    });

    socket.on("RoomCreationError", (error) => {
      toast.error(error);
      setLoading(false);
    });

    socket.on("RoomJoinError", (error) => {
      toast.error(error);
      setLoading(false);
    });

    // Fetch initial room users
    socket.emit("getRoomUsers", currentRoom);

    // Cleanup listeners
    return () => {
      socket.off("updatedRoomUser");
      socket.off("receiveMessage");
      socket.off("RoomJoined");
      socket.off("RoomCreationError");
      socket.off("RoomJoinError");
    };
  }, [currentRoom, socket, setCurrentRoom, navigate, setLoading]);

  // Logout handler
  const handleLogOut = () => {
    userLogOut()
      .then(() => {
        // Sign-out successful.
        toast.success("Log out successfully")
        socket.disconnect();
        // Redirect to sign-in page
        navigate('/sign-in')
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
        toast.error("Logout failed");
      });
  }

  const otherUser = roomUsers.find(u => u.socketId !== UserId);

  // Send message handler
  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim() && currentRoom) {
      const encrypted = encryptMessage(message);
      socket.emit("sentMessage", {
        room: currentRoom,
        message: encrypted,
        senderName: user?.displayName,
        senderEmail: user?.email,
        photo: user?.photoURL,
        receiverName: roomUsers.find((u) => u.socketId !== socket.id)?.name,
      });
      setMessage("");
    }
  };

  // Download messages as PDF 
  const handleDownloadMessagesAsPDF = () => {
    downloadMessagesAsPDF(currentRoom, messages)
  };

  // Navigate to profile with spinner
  const handleProfileClick = () => {
    setSpin(true);
    setTimeout(() => {
      navigate('/profile');
    }, 1500);
  };

  // Open video call in a new window
  // const handleVideoCall = () => {
  //   if (!currentRoom) {
  //     toast.error("No room selected!");
  //     return;
  //   }
  //   const videoCallWindow = window.open(
  //     `/meeting/video-call?roomId=${encodeURIComponent(currentRoom)}`,
  //     "_blank",
  //     "width=800,height=600"
  //   );
  //   if (!videoCallWindow) {
  //     toast.error("Please allow pop-ups for this site!");
  //   }
  // };
  const handleVideoCall = () => {
    if (!currentRoom) {
      toast.error("No room selected!");
      return;
    }
    const encodedRoomId = encodeURIComponent(currentRoom);
    const encodedUserName = encodeURIComponent(user?.displayName || "Anonymous");
    const videoCallWindow = window.open(
      `/meeting/video-call?roomId=${encodedRoomId}&userName=${encodedUserName}`,
      "_blank",
      "width=800,height=600"
    );
    if (!videoCallWindow) {
      toast.error("Please allow pop-ups for this site!");
    }
  };

  const handleBackToDashboard = () => {
    setCurrentRoom(null);
    navigate('/meeting');
  }

  if (!currentRoom) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <p>Please create or join a room first.</p>
        <button
          onClick={() => navigate('/meeting')}
          className="mt-4 p-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg"
        >
          Go to Meeting Page
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 relative -mt-16">
      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-[#0f131c] p-3 border-r border-[#1f2937] shadow-lg z-20 transition-transform duration-700 transform ${showSidebar ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 flex flex-col`}
      >
        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto p-1">
          <div className="border-b border-[#1f2937] mb-2">
            <input
              id="searchUser"
              onChange={(e) => setSearchUser(e.target.value)}
              type="text"
              placeholder="Search users"
              className="w-full p-2 mb-4 border border-gray-400 rounded-lg bg-[#0f131c] text-white focus:outline-none focus:ring-1 focus:ring-[#32c6fc]"
            />
          </div>
          <h2 className="text-xl font-bold mb-3 text-white">Users</h2>
          <div className="space-y-2">
            {roomUsers
              .filter((userFilter) =>
                userFilter?.name?.toLowerCase().includes(searchUser?.toLowerCase())
              )
              .map((userinRoom, idx) => (
                <div
                  key={idx}
                  className="p-2 bg-[#12161f]  rounded-md shadow-sm hover:bg-gray-800 border border-gray-800"
                >
                  <div className="flex gap-2 items-center">
                    <img src={userinRoom.profilePic} alt="" className="w-6 h-6 rounded-full" />
                    <h1 className="text-white text-sm font-medium">
                      {idx + 1}. {userinRoom.name}
                    </h1>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Logout and Profile */}
        <div className="mt-auto">
          {/* Back to Dashboard */}
          <Link
            onClick={handleBackToDashboard}
            className=" w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#32c6fc] to-[#8659d3] px-6 py-2 rounded text-white font-medium hover:shadow-lg hover:shadow-[#32c6fc]/20 transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap border border-gray-500"
          >
            <MdOutlineArrowBackIosNew /> Back to Dashboard
          </Link>

          {/* Profile Dropdown */}
          <div className="dropdown dropdown-top dropdown-center w-full mt-2">
            <div
              tabIndex={0}
              role="button"
              className="border border-gray-500 w-full flex justify-center items-center gap-2 p-2 text-gray-200 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <img
                src={user?.photoURL}
                referrerPolicy="no-referrer"
                alt="avatar"
                className="w-6 h-6 rounded-full"
              />
              <span>{user?.displayName || "Anonymous user"}</span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-gray-800 rounded-box z-50 w-52 p-2 shadow-lg mt-2 border border-gray-800 mb-2"
            >
              <li>
                <button
                  onClick={handleProfileClick}
                  className="btn btn-sm w-full bg-gray-950 text-gray-300 border border-gray-800 mb-2"
                >
                  Profile
                </button>
              </li>
              <li>
                {spin ? (
                  <div className="flex justify-center py-2">
                    <Spinner />
                  </div>
                ) : (
                  <button onClick={handleLogOut} className="btn btn-sm w-full bg-gray-950 text-gray-300 border border-gray-800">
                    Log out
                  </button>
                )}
              </li>
            </ul>
          </div>
          {spin && <Spinner />}
        </div>
      </div>


      {/* Overlay for Sidebar */}
      {showSidebar && <div className="fixed inset-0 bg-black opacity-50 z-10 md:hidden" onClick={toggleSidebar} ></div>}


      {/* Chat Window */}
      <div className="bg-[#0f131c] flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#1f2937] shadow-md">
          <div className="flex items-center">
            <button className="md:hidden text-2xl md:p-2 text-gray-200 mr-2" onClick={toggleSidebar}>
              <IoMdMenu />
            </button>
            <img
              src={roomUsers.find((u) => u.socketId !== socket.id)?.profilePic || "https://i.ibb.co.com/5gDBVLDV/images.png"}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-1 md:ml-2">
              <p className="font-semibold text-sm md:text-base text-white">
                {roomUsers.length === 2
                  ? roomUsers.find(u => u.socketId !== UserId)?.name || "Unknown User"
                  : roomUsers.length > 2
                    ? `${roomUsers.find(u => u.socketId !== UserId)?.name} +${roomUsers.length - 1}`
                    : "Waiting for others"}
              </p>
              <p className="text-sm text-green-500">Online</p>
            </div>
          </div>
          <div className="flex gap-1 md:space-x-2">
            <button
              onClick={handleVideoCall}
              className="flex items-center gap-1 md:gap-2 px-1 md:px-4 py-2 md:py-2 bg-[#12161f] hover:scale-110 transition-transform duration-50 text-gray-300 text-xl md:border border-gray-800 rounded hover:">
              <FaVideo />
            </button>
            <button
              onClick={() => document.getElementById('my_modal_3').showModal()}
              className="flex items-center gap-1 md:gap-2 px-1 md:px-4 py-2 md:py-2 bg-[#12161f] hover:scale-110 transition-transform duration-200 text-gray-300 text-xl md:border border-gray-800 rounded hover:"
            >
              <IoMdInformationCircleOutline />
            </button>
            <button
              onClick={handleDownloadMessagesAsPDF}
              className="flex items-center gap-1 md:gap-2 px-1 md:px-4 py-2 md:py-2 bg-[#12161f] hover:scale-110 transition-transform duration-200 text-gray-300 text-xl md:border border-gray-800 rounded hover:"
            >
              <RiChatDownloadLine />
            </button>
          </div>
        </div>

        {/* Messages Section */}
        <div className="flex-1 p-4 overflow-y-auto ">
          <div className="mb-4 space-y-1">
            {messages.map((msg, index) => {
              const isSender = msg.sender === UserId;
              const prevMsg = messages[index - 1];
              const nextMsg = messages[index + 1];
              const isNewSender = !prevMsg || prevMsg.sender !== msg.sender;
              const isLastInGroup = !nextMsg || nextMsg.sender !== msg.sender;

              return (
                <div
                  key={index}
                  className={`flex flex-col ${isSender ? "items-end" : "items-start"}`}
                >
                  {isNewSender && (
                    <p
                      className={`text-xs mb-1 ${isSender ? "pr-10 text-right" : "pl-10 text-left"} text-gray-500`}
                    >
                      {msg.senderName}
                    </p>
                  )}

                  <div
                    className={`flex items-end max-w-xs sm:max-w-sm md:max-w-md ${isSender ? "flex-row-reverse" : ""}`}
                  >
                    <div className="w-7 h-7">
                      {isLastInGroup ? (
                        <img
                          src={msg.photo || "https://i.ibb.co.com/5gDBVLDV/images.png"}
                          alt="profile"
                          className="w-7 h-7 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-7 h-7" /> // Empty space to keep alignment
                      )}
                    </div>

                    {/* Message Bubble Section */}
                    <div
                      className={`${isSender ? "mr-2" : "ml-2"} px-3 py-[5px] rounded-xl relative ${isSender
                        ? "bg-gradient-to-bl from-[#32c6fc] to-[#8659d3] text-white rounded-br-none"
                        : "bg-gray-800 text-gray-100 rounded-bl-none "
                        }`}
                    >
                      <p className="text-sm md:text-base break-words">{msg.message}</p>
                      <p className="text-xs text-right opacity-60 mt-1">
                        {new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Message input */}
        <form
          onSubmit={handleSend}
          className="p-4 border-t border-gray-700 flex items-center"
        >
          <input
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            type="text"
            placeholder="Type a message..."
            className="w-full p-2 border border-gray-500 rounded-lg bg-[#0f131c] focus:outline-none focus:ring-1 focus:ring-[#32c6fc] text-white"
          />
          
          <button className="ml-2 p-2 text-2xl bg-gradient-to-r from-[#32c6fc] to-[#8659d3] px-6 py-2 rounded text-white font-medium hover:shadow-lg hover:shadow-[#32c6fc]/20 transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap">
            <IoIosSend />
          </button>
        </form>
      </div>

      {/* Modal for Invite Code */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box relative p-10 !bg-[#1f2937]">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">✕</button>
          </form>

          <h3 className="font-bold text-lg flex items-center gap-2 mb-2 text-white">
            Invite Code: {currentRoom}
            <button
              onClick={() => {
                navigator.clipboard.writeText(currentRoom);
                toast.success("Invite code copied!");
              }}
              className="btn btn-sm btn-outline tooltip"
              data-tip="Copy Room Code"
            >
              📋
            </button>
          </h3>

          <div className="text-sm mt-4 space-y-1 text-white">
            <p>
              <span className="font-semibold ">Created At:</span>{" "}
              {new Date(createdAt).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold ">Creator:</span> {creator}
            </p>
          </div>
        </div>
      </dialog>



    </div>
  );
};

export default Dashboard;
