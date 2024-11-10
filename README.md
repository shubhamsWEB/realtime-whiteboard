# Collaborative Drawing App



https://github.com/user-attachments/assets/20b26608-679a-456f-824c-32f29311925d



A real-time collaborative drawing app where multiple users can join a room and draw together on a shared canvas. This app leverages `Socket.io` for real-time communication, and `Rough.js` for sketch-like drawings.

## Features

- **Real-time collaboration**: Multiple users can join a room and draw on the same canvas in real-time.
- **Draw tools**: Users can choose between different drawing tools like pencil and line.
- **Color Picker**: Choose a custom color for drawing.
- **Canvas Controls**: Clear the canvas, view the number of online users, and leave the room.
- **User management**: See who else is online in the same room.

## Tech Stack

- **Frontend**: React, Next.js
- **State Management**: Context API (for user state)
- **Real-time Communication**: Socket.io
- **Canvas Drawing**: Rough.js
- **Styling**: Tailwind CSS

## Prerequisites

Before running the app locally, make sure you have the following installed:

- Node.js (>= 16.x)
- npm (or Yarn)

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/collaborative-drawing-app.git

2. Move to APP folder (Client Application):
   ```bash
   yarn
   yarn run dev

3. Set up the environment variables (if necessary). Example .env file:
   ```bash
   NEXT_PUBLIC_SOCKET_SERVER=http://localhost:5000

4. Move to Server folder (Server):
   ```bash
   yarn
   yarn run dev   


# Running the App

Once both the client and server are running, the app will be available at http://localhost:3000.

## Usage

1. Log in and join a room.
2. Once inside, you can draw using the pencil or line tool.
3. Pick your drawing color using the color picker.
4. To clear the canvas, click the Clear Canvas button.
5. The Online Users count shows how many users are in the room.
6. You can leave the room anytime by clicking the Leave Room button.

## File Structure

**/App-**: Contains the React frontend (Canvas, Sidebar, User context).
**/Server**: Node.js server handling Socket.io communication.
