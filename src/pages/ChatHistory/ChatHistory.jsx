import { useQuery } from "@tanstack/react-query";
import React, { useState } from 'react';
import { RiChatDownloadLine } from 'react-icons/ri';
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { decryptMessage } from "../../utilities/encryptDecrypt";
import { downloadMessagesAsPDF } from "../../utilities/downloadMessagesAsPDF"

const ChatHistory = () => {
    const axios = useAxiosSecure();
    const { user } = useAuth();

    // Fetch all chat rooms (conversations) that the user has participated in
    const { data: userConversations = [], refetch } = useQuery({
        queryKey: ['userConversations', user?.email],
        queryFn: async () => {
            const res = await axios.get(`/conversations/user/${user?.email}`);
            console.log(res.data);
            return res.data;
        }
    });

    return (
        <div className="bg-[#151515] min-h-screen">
            <div className="container mx-auto p-4 rounded-lg mt-4 w-full overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-300 mb-6 border-b border-gray-500 pb-2">📜 Your Chat History</h2>

                {userConversations.length === 0 && (
                    <p className="text-gray-300">No chat history found.</p>
                )}

                {userConversations.map((room, idx) => (
                    <div key={idx} className="mb-8 border border-gray-800 rounded-xl shadow-sm">

                        {/* Room ID and Download Button Section */}
                        <div className="flex items-center justify-between  p-3 rounded-t-xl border-b border-gray-800">
                            <h3 className="text-lg font-semibold ">
                                <span className="text-gray-300">Room ID:</span> <span className="text-[#32c6fc]">{room.room}</span>
                            </h3>
                            <button
                                onClick={() => {
                                    const decryptedMessages = room.messages.map((msg) => ({
                                        ...msg,
                                        message: decryptMessage(msg.message)
                                    }));

                                    downloadMessagesAsPDF(room.room, decryptedMessages);
                                }}
                                className="flex items-center text-sm md:text-base bg-gray-800 text-[#32c6fc] px-3 py-1 rounded hover:bg-gray-900 hover:text-[#32c6fcad] transition duration-300"
                            >
                                <RiChatDownloadLine className="mr-1" />
                                Download
                            </button>
                        </div>

                        {/* Messages Section */}
                        <div className="max-h-96 overflow-y-auto px-2 mb-2 space-y-3">
                            {room.messages.map((msg, i) => {
                                const isSender = msg.senderEmail === user?.email;
                                const decryptedMessage = decryptMessage(msg.message);

                                const prevMsg = room.messages[i - 1];
                                const nextMsg = room.messages[i + 1];
                                const isNewSender = !prevMsg || prevMsg.senderEmail !== msg.senderEmail;
                                const isLastInGroup = !nextMsg || nextMsg.senderEmail !== msg.senderEmail;

                                return (
                                    <div
                                        key={i}
                                        className={`flex flex-col ${isSender ? "items-end" : "items-start"}`}
                                    >
                                        {isNewSender && (
                                            <p
                                                className={`text-xs mb-1 ${isSender ? "pr-10 text-right" : "pl-10 text-left"} text-gray-400`}
                                            >
                                                {msg.senderName}
                                            </p>
                                        )}

                                        {/* Message Bubble Section */}
                                        <div
                                            className={`flex items-end max-w-xs sm:max-w-sm md:max-w-md ${isSender ? "flex-row-reverse" : ""}`}
                                        >
                                            {/* Profile Image or Placeholder */}
                                            <div className="w-7 h-7">
                                                {isLastInGroup ? (
                                                    <img
                                                        src={msg.photo || "https://img.icons8.com/?size=50&id=7819&format=png"}
                                                        alt="profile"
                                                        className="w-7 h-7 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-7 h-7" /> // Placeholder div
                                                )}
                                            </div>

                                            {/* Message Bubble */}
                                            <div
                                                className={`${isSender ? "mr-2" : "ml-2"} p-3 rounded-xl relative ${isSender
                                                    ? "bg-gradient-to-bl from-[#32c6fc] to-[#8659d3] text-white rounded-br-none"
                                                    : "bg-gray-800 text-gray-100 rounded-bl-none "
                                                    }`}
                                            >
                                                <p className="text-sm md:text-base break-words">{decryptedMessage}</p>
                                                <p className="text-xs text-right opacity-60 mt-1">
                                                    {new Date(msg.timestamp).toLocaleTimeString([], {
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
                ))}
            </div>
        </div>

    );
};

export default ChatHistory;

