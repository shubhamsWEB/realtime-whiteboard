'use client'
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import { useUserContext } from "../services/context/userContext";
import {getUserId,uuid} from '../utils/roomUtils';
const JoinCreateRoom = () => {
  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState("");
  const [joinName, setJoinName] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");
  const router = useRouter();
  const { updateUser } = useUserContext();
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!name) return toast.dark("Please enter your name!");

    updateUser({
      roomId,
      userId: getUserId(),
      userName: name,
    });
    localStorage.setItem('userInfo',JSON.stringify({
      userId: getUserId(),
      userName: name,
    }))
    router.push(`/room/${roomId}`);
  };
  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (!joinName) return toast.error("Please enter your name!");
    if (!joinRoomId) return toast.error("Please enter room id");

    updateUser({
      roomId: joinRoomId,
      userId: getUserId(),
      userName: joinName,
    });
    localStorage.setItem('userInfo',JSON.stringify({
      userId: getUserId(),
      userName: joinName,
    }))
    router.push(`/room/${joinRoomId}`);
  };

  return (
    <div>
      <h1 className="text-center my-4 text-4xl font-bold">
        Welcome To Realtime Whiteboard Sharing App
      </h1>
      <div className="grid grid-cols-2 gap-4 p-10">
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
                readOnly={true}
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
                  onCopy={() => toast.success("Room Id Copied To Clipboard!")}
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
            <div className="form-group mt-5">
              <button type="submit" className="w-full bg-green-600 rounded-md p-2 text-white">
                Create Room
              </button>
            </div>
          </form>
        </div>
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
                placeholder="Room Id"
                style={{
                  boxShadow: "none",
                }}
              />
            </div>
            <div className="form-group mt-5">
              <button type="submit" className="w-full bg-blue-600 rounded-md p-2 text-white">
                Join Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinCreateRoom;
