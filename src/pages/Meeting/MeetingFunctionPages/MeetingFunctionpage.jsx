import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import moment from "moment";
import { Gi3dGlasses, GiTimeTrap } from "react-icons/gi";
import { IoPersonAddSharp } from "react-icons/io5";
import { BsFillCameraReelsFill } from "react-icons/bs";
import useAuth from "../../../hooks/useAuth";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import socket from "../../../utilities/socket";
import { useForm } from "react-hook-form";
import axios from "axios";
// react icons
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-hot-toast";
import useScheduleData from "../../../hooks/schedule_data/useScheduleData";

import countDwon from "../../../hooks/CountDwon/countDwon";
import { SocketContext } from "../../../provider/SocketProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MeetingFunctionpage = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { socket, currentRoom, setCurrentRoom } = useContext(SocketContext);
  const [time, settime] = useState("");
  const [fullTime, setfullTime] = useState("");
  const { user, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const { isLoading, isError, refetch, scheduleData } = useScheduleData();
  const [joinRoomId, setJoinRoomId] = useState(""); // For joining a room
  const axiosSecure = useAxiosSecure()

  // LIVE TIME
  useEffect(() => {
    // use effect work when side effect like api calling
    const callTime = setInterval(() => {
      settime(moment().format("LTS"));
      setfullTime(moment().format("MMMM Do YYYY"));
    }, 1000);

    return () => {
      clearInterval(callTime);
    };
  }, []);

  // Schedule button
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [Scheduleroomid, setScheduleroomid] = useState("");

  const onSubmit = (data) => {
    const { MeetDate, MeetTime, Topic } = data;
    if (MeetDate && MeetTime && Topic) {
      const userData = {
        name: user?.displayName,
        timestamp: new Date(),
      };

      socket.emit("scheduleMaker", userData)
      socket.once("scheduled", async (roomCode, name, timestamp) => {
        const schedule = {
          roomCode,
          email: user?.email,
          Topic,
          MeetDate,
          MeetTime,
          timestamp,
        };

        try {
          const res = await axiosSecure.post("/schedule-collections", schedule);

          if (res.status === 200 || res.status === 201) {
            toast.success("Meeting scheduled successfully.");
            reset();
            refetch();
            setIsModalOpen(false);
          } else {
            toast.error("Failed to save schedule.");
          }
        } catch (err) {
          console.error(err);
          toast.error("Server error while saving schedule.");
        }
      });
    }
    else {
      toast.warning("Please fill in all the fields.");
      setIsModalOpen(false);
    }
  };

  const handleCreateRoom = () => {
    const userData = {
      name: user?.displayName,
      profilePic: user?.photoURL,
      timestamp: new Date(),
    };
    socket.emit("createRoom", userData);

    // Listen for RoomCreated event from server
    socket.on("RoomCreated", (roomId, name, timestamp) => {
      setCurrentRoom(roomId); // Set 100ms roomId as currentRoom
      setLoading(false);
      navigate("/dashboard");
    });

    // Handle errors
    socket.on("RoomCreationError", (error) => {
      toast.error(error);
      setLoading(false);
    });

  };

  const handleJoinRoom = () => {
    if (!joinRoomId) return;

    // Set the listener BEFORE emit
    socket.once("RoomJoined", (roomId) => {
      setCurrentRoom(roomId);
      setLoading(false);
      navigate("/dashboard");
    });

    socket.emit("JoinRoom", {
      roomId: joinRoomId,
      userData: {
        name: user?.displayName,
        profilePic: user?.photoURL,
        email: user?.email,
      },
    });

    setJoinRoomId("");
  };


  return (
    <div className="bg-[#151515] min-h-screen">
      <div className="container mx-auto">
        <section
          className="w-full grid md:grid-cols-2 py-16 md:py-28 lg:py-40 justify-center"
        >
          {/* Left Panel */}
          <section className="flex flex-col gap-6">
            {/* Top Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {/* New Meeting Button */}
              <div className="relative group">
                <button
                  onClick={handleCreateRoom}
                  className="flex flex-col items-center justify-center border border-gray-800 bg-gray-900 h-24 w-36 md:h-28 md:w-36 lg:h-28 lg:w-48  text-white overflow-hidden"
                >
                  <BsFillCameraReelsFill className="text-3xl mb-1" />
                  <span className="font-medium">New Meeting</span>
                </button>

                {/* Corner Border Animation */}
                <div className="pointer-events-none absolute inset-0">
                  <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#32c6fc] opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300 ease-out"></span>
                  <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#8659d3] opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300 ease-out"></span>
                  <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#8659d3] opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300 ease-out"></span>
                  <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#32c6fc] opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300 ease-out"></span>
                </div>
              </div>

              {/* Join Button */}
              <div className="relative group">
                <button
                  onClick={() => document.getElementById("my_modal_3").showModal()}
                  className="flex flex-col items-center justify-center border border-gray-800 bg-gray-900 transition-all h-24 w-36 md:h-28 md:w-36 lg:h-28 lg:w-48  text-white overflow-hidden"
                >
                  <IoPersonAddSharp className="text-3xl mb-1" />
                  <span className="font-medium">Join</span>
                </button>
                {/* Corner Border Animation */}
                <div className="pointer-events-none absolute inset-0">
                  <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#32c6fc] opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300 ease-out"></span>
                  <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#8659d3] opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300 ease-out"></span>
                  <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#8659d3] opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300 ease-out"></span>
                  <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#32c6fc] opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300 ease-out"></span>
                </div>
              </div>
            </div>

            {/* Schedule & Help Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {/* Schedule Button */}
              <div className="relative group">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex flex-col items-center justify-center border border-gray-800 bg-gray-900 transition-all h-24 w-36 md:h-28 md:w-36 lg:h-28 lg:w-48  text-white overflow-hidden"
                >
                  <GiTimeTrap className="text-3xl mb-1" />
                  <span className="font-medium">Schedule</span>
                </button>
                {/* Corner Border Animation */}
                <div className="pointer-events-none absolute inset-0">
                  <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#32c6fc] opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300 ease-out"></span>
                  <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#8659d3] opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300 ease-out"></span>
                  <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#8659d3] opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300 ease-out"></span>
                  <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#32c6fc] opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300 ease-out"></span>
                </div>
              </div>

              {/* Help Button */}
              <div className="relative group">
                <button className="flex flex-col items-center justify-center border border-gray-800 bg-gray-900 transition-all h-24 w-36 md:h-28 md:w-36 lg:h-28 lg:w-48  text-white overflow-hidden">
                  <h2 className="text-xl font-medium">Help</h2>
                </button>
                {/* Corner Border Animation */}
                <div className="pointer-events-none absolute inset-0">
                  <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#32c6fc] opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300 ease-out"></span>
                  <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#8659d3] opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300 ease-out"></span>
                  <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#8659d3] opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300 ease-out"></span>
                  <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#32c6fc] opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300 ease-out"></span>
                </div>
              </div>
            </div>
          </section>

          <div id="asdf" className="p-4 md:mt-0 mt-6 w-full">
            {/* Time display */}
            <div className="bg-gradient-to-br to-[#32c6fc] from-[#8659d3] p-[1px]  mb-6">
              <div className="bg-gray-900  shadow text-center p-4">
                <p className="text-md text-gray-300 font-medium">{time}</p>
                <p className="text-3xl font-bold animated-gradient-text">{fullTime}</p>
              </div>
            </div>

            {/* Schedule Table */}
            <div className="border border-gray-800">
              <div className="w-full max-h-64  shadow bg-[#151515] overflow-hidden">
                <div className="h-full overflow-y-auto p-2 space-y-4">
                  {scheduleData.length > 0 ? (
                    // Responsive horizontal scroll wrapper
                    <div className="w-full overflow-x-auto">
                      <table className="min-w-full text-sm text-gray-300">
                        <thead className="bg-gray-900 text-gray-300 font-semibold">
                          <tr>
                            <th className="w-12 whitespace-nowrap px-2 py-2">Serial</th>
                            <th className="whitespace-nowrap px-2 py-2">Topic</th>
                            <th className="whitespace-nowrap px-2 py-2">Date</th>
                            <th className="whitespace-nowrap px-2 py-2">Time</th>
                            <th className="whitespace-nowrap px-2 py-2">Room ID</th>
                            <th className="whitespace-nowrap px-2 py-2">Countdown</th>
                          </tr>
                        </thead>
                        <tbody>
                          {scheduleData
                            .map((schedule, index) => (
                              <tr key={index} className="hover:bg-gray-800 transition">
                                <td className="w-12 font-medium px-2 py-2">{index + 1}</td>
                                <td className="px-2 py-2">{schedule.Topic}</td>
                                <td className="px-2 py-2">{schedule.MeetDate}</td>
                                <td className="px-2 py-2">{schedule.MeetTime}</td>
                                <td className="px-2 py-2">{schedule.roomCode}</td>
                                <td className="px-2 py-2">{countDwon(schedule.MeetDate, schedule.MeetTime)}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center h-full text-xl text-gray-400 font-semibold">
                      No Schedule Found
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>


        </section>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="border-gray-950 bg-gray-800 w-full max-w-lg  shadow-lg">
              <div className="p-6 border-b">
                <h1 className="text-xl font-bold text-center text-gray-200">Schedule Meeting</h1>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                <div>
                  <input {...register("Topic", { required: "Topic is required" })} className="input border border-gray-500 w-full bg-gray-800 focus:outline-none focus:ring-2 focus:[#32c6fc] text-gray-200" placeholder="Topic" />
                  {errors.Topic && <span className="text-red-500 text-sm">{errors.Topic.message}</span>}
                </div>

                <div>
                  <input type="date" {...register("MeetDate", { required: "Date is required" })} className="input border border-gray-500 w-full bg-gray-800 focus:outline-none focus:ring-2 focus:[#32c6fc] text-gray-200" />
                  {errors.Date && <span className="text-red-500 text-sm">{errors.Date.message}</span>}
                </div>

                <div>
                  <input type="time" {...register("MeetTime", { required: "Time is required" })} className="input border border-gray-500 w-full bg-gray-800 focus:outline-none focus:ring-2 focus:[#32c6fc] text-gray-200" />
                  {errors.Time && <span className="text-red-500 text-sm">{errors.Time.message}</span>}
                </div>

                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded bg-red-50 hover:bg-red-100">Cancel</button>
                  <button type="submit" className="bg-gradient-to-r from-[#32c6fc] to-[#8659d3] px-6 py-2 rounded text-white font-medium hover:shadow-lg hover:shadow-[#32c6fc]/20 transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap">Submit</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Join Room Modal */}
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box max-w-md w-full rounded-xl shadow-lg border border-gray-950 bg-gray-800 p-6 relative">
            {/* Close Button */}
            <form method="dialog">
              <button className="btn btn-sm btn-circle bg-red-50 btn-ghost absolute right-4 top-4 hover:bg-gray-200">
                ✕
              </button>
            </form>

            {/* Modal Title */}
            <h3 className="text-lg font-bold mb-4 text-center text-gray-200">Join a Meeting Room</h3>

            {/* Input & Button */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                value={joinRoomId}
                onChange={(e) => setJoinRoomId(e.target.value)}
                placeholder="Enter Room ID"
                className="input border border-gray-500 w-full bg-gray-800 focus:outline-none focus:ring-2 focus:[#32c6fc] text-gray-200"
              />
              <button
                onClick={handleJoinRoom}
                className="bg-gradient-to-r from-[#32c6fc] to-[#8659d3] px-6 py-2 rounded text-white font-medium hover:shadow-lg hover:shadow-[#32c6fc]/20 transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap"
              >
                Join
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MeetingFunctionpage;

