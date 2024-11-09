const express = require("express");
const http = require("http");
const cors = require("cors");
const { userJoin, getUsers, userLeave } = require("./utils/user");

const app = express();
const server = http.createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server);

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("server");
});

// socket.io
let imageUrl, userRoom;
io.on("connection", (socket) => {
  socket.on("user-joined", (data) => {
    const { roomId, userId, userName } = data;
    userRoom = roomId;
    const user = userJoin(socket.id, userName, roomId);
    const roomUsers = getUsers(user.room);
    socket.join(user.room);
    socket.emit("message", {
      message: "Welcome to ChatRoom",
    });
    socket.broadcast.to(user.room).emit("message", {
      message: `${user.username} has joined`,
    });

    io.to(user.room).emit("users", roomUsers);
  });

  socket.on('draw', (data) => {
    // Broadcast the drawing data to all other users
    socket.broadcast.to(userRoom).emit('draw', data);
});
socket.on("user-leave", () => {
  const userLeaves = userLeave(socket.id);
  if (userLeaves) {
    const roomUsers = getUsers(userLeaves.room);

    // Notify remaining users in the room
    io.to(userLeaves.room).emit("message", {
      message: `${userLeaves.username} left the chat`,
    });
    io.to(userLeaves.room).emit("users", roomUsers);

    // Leave the room
    socket.leave(userLeaves.room);
  }
});

  socket.on("disconnect", () => {
    const userLeaves = userLeave(socket.id);
    const roomUsers = getUsers(userRoom);

    if (userLeaves) {
      io.to(userLeaves.room).emit("message", {
        message: `${userLeaves.username} left the chat`,
      });
      io.to(userLeaves.room).emit("users", roomUsers);
    }
  });
});

// serve on port
const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`server is listening on http://localhost:${PORT}`)
);
