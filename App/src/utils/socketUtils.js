// src/utils/socketUtils.js
import { io } from 'socket.io-client';

const server = "http://localhost:5000";
const connectionOptions = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
};

export const socket = io(server, connectionOptions);

export const joinRoom = (user) => {
    socket.emit("user-joined",user);
};

export const sendDrawData = (data) => {
    socket.emit("draw", data);
};

export const onDraw = (callback) => {
    socket.on("draw", callback);
};

export const onUsers = (callback) => {
    socket.on("users", callback);
};

export const onMessage = (callback) => {
    socket.on("message", callback);
};

export const disconnectSocket = () => {
    socket.disconnect();
};

export const clearListeners = () => {
    socket.off("draw");
    socket.off("users");
    socket.off("message");
};
