import io from "socket.io-client";

const socket = io("https://meevio-vfak.onrender.com", {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
}); // For local server
// const socket = io("https://meevio-vfak.onrender.com"); // For live server (uncomment for production)

export default socket;
