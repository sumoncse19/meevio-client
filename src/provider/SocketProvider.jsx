import React, { createContext, useState, useMemo, useEffect } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = useMemo(
    () => io.connect("https://meevio-vfak.onrender.com"),
    []
  );

  const [currentRoom, setCurrentRoom] = useState(null);
  const [UserId, setUserId] = useState(null); // Client Socket ID
  const [creator, setCreator] = useState("");
  const [createdAt, setCreatedAt] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      setUserId(socket.id);
      console.log("Socket connected, My ID:", socket.id);
    });

    socket.on("RoomCreated", (roomId, name, timestamp) => {
      setCreator(name);
      setCreatedAt(timestamp);
      setCurrentRoom(roomId);
      console.log("RoomCreated received:", roomId);
    });
    socket.on("RoomJoined", (roomId) => {
      setCurrentRoom(roomId);
      console.log("RoomJoined received:", roomId);
    });

    return () => {
      socket.off("connect");
      socket.off("RoomCreated");
      socket.off("RoomJoined");
    };
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        currentRoom,
        setCurrentRoom,
        UserId,
        creator,
        createdAt,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
