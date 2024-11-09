
---

### **Client README** (for `client/` folder)

```markdown
# Collaborative Drawing App - Client

This is the client-side code for the Collaborative Drawing App. It allows users to join rooms and collaborate on a shared canvas using `React` and `Socket.io`.

## Features

- **Real-time drawing**: Multiple users can draw on the same canvas in real-time.
- **Drawing tools**: Pencil and line tool for creating drawings.
- **Color picker**: Allows users to choose a custom drawing color.
- **Canvas controls**: Clear the canvas and view the number of online users in the room.
- **User management**: See which users are currently online in the same room.

## Prerequisites

Before running the client, make sure you have the following installed:

- Node.js (>= 16.x)
- npm or Yarn

## File Structure

src/
│
├── components/               # React components used in the app
│   ├── Canvas.js             # Canvas component where users draw
│   ├── Sidebar.js            # Sidebar component for user list
│   └── JoinCreateRoom.js     # Component for Joining/Create new room
│   └── Room.js               # Component for handling Drawing and for tool selection and color picker
│
├── app/                      # Next.js pages
│   ├── page.js               # Landing page for the app
│   └── room/[roomId].js      # Room page, where users join and draw together
│
│
├── services/                 # Application-specific services and utilities
│   ├── context/              # Context for global state (e.g., user state)
│
│
├── utils/                    # helper utils
│   ├── roomUtils.js          # utils for room component
│   ├── socketUtils.js        # utils for socket connection


