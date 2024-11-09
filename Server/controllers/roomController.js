const { userJoin, userLeave, getUsers } = require("../utils/user");

function handleUserJoined(socket, io, data) {
    const { roomId, userId, userName } = data;
    const user = userJoin(socket.id, userName, roomId);
    socket.join(user.room);

    const roomUsers = getUsers(user.room);
    socket.emit("message", { message: "Welcome to ChatRoom" });
    socket.broadcast.to(user.room).emit("message", { message: `${user.username} has joined` });
    io.to(user.room).emit("users", roomUsers);
}

function handleUserLeave(socket, io) {
    const user = userLeave(socket.id);
    if (user) {
        const roomUsers = getUsers(user.room);
        io.to(user.room).emit("message", { message: `${user.username} left the chat` });
        io.to(user.room).emit("users", roomUsers);
        socket.leave(user.room);
    }
}

function handleDraw(socket, data) {
    const userRoom = Array.from(socket.rooms)[1];
    if (userRoom) {
        socket.broadcast.to(userRoom).emit("draw", data);
    }
}

module.exports = { handleUserJoined, handleUserLeave, handleDraw };
