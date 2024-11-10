const { userJoin, userLeave, getUsers, addDrawing, getDrawings } = require("../utils/user");

function handleUserJoined(socket, io, data) {
    const { roomId, userId, userName } = data;
    const user = userJoin(socket.id, userName, roomId);
    socket.join(user.room);

    const roomUsers = getUsers(user.room);
    
    // Emit a welcome message to the newly joined user
    socket.emit("message", { message: "Welcome to ChatRoom" });
    
    // Emit previous drawings only to the newly joined user
    const previousDrawings = getDrawings(user.room);
    socket.emit("previous-drawings", previousDrawings);
    
    // Notify other users in the room of the new user's arrival
    socket.broadcast.to(user.room).emit("message", { message: `${user.username} has joined` });
    
    // Emit the updated list of users in the room
    io.to(user.room).emit("users", roomUsers);
}

function handleUserLeave(socket, io) {
    const user = userLeave(socket.id);
    if (user) {
        const roomUsers = getUsers(user.room);
        
        // Notify other users in the room that this user has left
        io.to(user.room).emit("message", { message: `${user.username} left the chat` });
        
        // Emit the updated list of users in the room
        io.to(user.room).emit("users", roomUsers);
        
        // Leave the socket room
        socket.leave(user.room);
    }
}

function handleDraw(socket, data) {
    const userRoom = Array.from(socket.rooms)[1];
    if (userRoom) {
        // Store the drawing data for this room
        addDrawing(userRoom, data);

        // Broadcast the new drawing to other users in the room
        socket.broadcast.to(userRoom).emit("draw", data);
    }
}

module.exports = { handleUserJoined, handleUserLeave, handleDraw };
