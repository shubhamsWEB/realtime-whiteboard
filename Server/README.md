# Collaborative Drawing App - Server

This is the server-side code for the Collaborative Drawing App. It handles real-time communication between users using `Socket.io`.

## Features

- **Socket.io server**: Manages real-time communication between users in the same room.
- **User management**: Tracks users who are currently in a room (Locally for now).
- **Canvas synchronization**: Broadcasts drawing data between users to keep their canvases in sync.

## Prerequisites

Before running the server, make sure you have the following installed:

- Node.js (>= 16.x)
- npm or Yarn
