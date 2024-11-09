// src/components/JoinCreateRoom.js
'use client'
import React, { useState, useCallback } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import { useUserContext } from "../services/context/userContext";
import { getUserId, uuid } from '../utils/roomUtils';

const JoinCreateRoom = () => {
  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState("");
  const [joinName, setJoinName] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");
  const router = useRouter();
  const { updateUser } = useUserContext();

  const saveUserInfo = useCallback((userName, roomId) => {
    const userInfo = { userId: getUserId(), userName };
    updateUser({ ...userInfo, roomId });
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    router.push(`/room/${roomId}`);
  }, [updateUser, router]);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!name) return toast.dark("Please enter your name!");
    saveUserInfo(name, roomId);
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (!joinName) return toast.error("Please enter your name!");
    if (!joinRoomId) return toast.error("Please enter room ID");
    saveUserInfo(joinName, joinRoomId);
  };

  return (
    <div>
      <h1 className="text-center my-4 text-4xl font-bold">
        Welcome To Realtime Whiteboard Sharing App
      </h1>
      <div className="grid grid-cols-2 gap-4 p-10">
        {/* Create Room Section */}
        <div className="border p-4 rounded">
          <h1 className="text-center mb-5 font-bold text-xl">Create Room</h1>
          <form onSubmit={handleCreateSubmit}>
            <div className="my-2">
              <input
                type="text"
                placeholder="Your Name"
                className="border w-full rounded p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="border flex">
              <input
                type="text"
                className="w-full p-2"
                value={roomId}
                readOnly
              />
              <div className="flex p-2">
                <button
                  className="bg-gray-400 text-white rounded p-1"
                  type="button"
                  onClick={() => setRoomId(uuid())}
                >
                  Generate
                </button>
                &nbsp;&nbsp;
                <CopyToClipboard
                  text={roomId}
                  onCopy={() => toast.success("Room ID Copied To Clipboard!")}
                >
                  <button
                    className="rounded bg-blue-500 p-1 text-white"
                    type="button"
                  >
                    Copy
                  </button>
                </CopyToClipboard>
              </div>
            </div>
            <button type="submit" className="w-full bg-green-600 rounded-md p-2 text-white mt-5">
              Create Room
            </button>
          </form>
        </div>
        
        {/* Join Room Section */}
        <div className="border p-4 rounded">
          <h1 className="text-center mb-5 font-bold text-xl">Join Room</h1>
          <form onSubmit={handleJoinSubmit}>
            <div className="my-2">
              <input
                type="text"
                placeholder="Your Name"
                className="border w-full rounded p-2"
                value={joinName}
                onChange={(e) => setJoinName(e.target.value)}
              />
            </div>
            <div className="my-2">
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={joinRoomId}
                onChange={(e) => setJoinRoomId(e.target.value)}
                placeholder="Room ID"
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 rounded-md p-2 text-white mt-5">
              Join Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinCreateRoom;
