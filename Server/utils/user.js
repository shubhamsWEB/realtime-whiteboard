const users = [];
const drawings = {};

// Join user to chat
const userJoin = (id, username, room, host, presenter) => {
  const user = { id, username, room, host, presenter };
  users.push(user);
  return user;
};

// User leaves chat
const userLeave = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

// Get user by ID
const getUserById = (userId) => {
  return users.find(user => user.id === userId);
};

// Get all users in a room
const getUsers = (room) => {
  return users.filter((user) => user.room === room);
};

// Add a drawing to a specific room
const addDrawing = (room, drawingData) => {
  if (!drawings[room]) {
    drawings[room] = [];
  }
  drawings[room].push(drawingData);
};

// Get all drawings for a specific room
const getDrawings = (room) => {
  return drawings[room] || [];
};

// Clear drawings for a room (optional: in case of reset or new session)
const clearDrawings = (room) => {
  drawings[room] = [];
};

module.exports = {
  userJoin,
  userLeave,
  getUserById,
  getUsers,
  addDrawing,
  getDrawings,
  clearDrawings
};
