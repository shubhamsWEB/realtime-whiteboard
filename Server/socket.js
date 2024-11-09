const { Server } = require("socket.io");
const { handleUserJoined, handleUserLeave, handleDraw } = require("./controllers/roomController");

function initializeSocket(server) {
    const io = new Server(server);

    io.on("connection", (socket) => {
        socket.on("user-joined", (data) => handleUserJoined(socket, io, data));
        socket.on("draw", (data) => handleDraw(socket, data));
        socket.on("disconnect", () => handleUserLeave(socket, io));
    });
}

module.exports = { initializeSocket };
