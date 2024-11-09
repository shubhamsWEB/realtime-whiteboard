const http = require("http");
const app = require("./server");
const { initializeSocket } = require("./socket");

const server = http.createServer(app);
initializeSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
