# Code-Force  Battle 

> A real-time multiplayer coding competition platform inspired by Codeforces! Gather your friends, divide into teams, and battle it out by solving algorithmic problems strategically placed on a grid.

---

##  Key Features

- ** Real-Time Multiplayer Rooms**: Create private rooms and invite your friends. Split seamlessly into two competing groups: **Team A** and **Team B**.
- ** The Battle Grid**: Engage in a tug-of-war on a grid of algorithmic challenges. Strategize with your team on which problems to tackle first!
- ** Live Game State Updates**: Powered by WebSockets, watch the grid light up instantly as problems are solved by either team.
- ** Integrated In-Game Chat**: Discuss strategies in team-specific channels or banter in the general chat. Fully supports emojis to express your victories and defeats.
- ** Global Leaderboard**: Track the match outcomes and determine the ultimate coding champions.
- ** Robust Reconnection**: Internet dropped? No problem! Seamlessly reconnect and restore your previous game state without missing a beat.

---

##  Tech Stack

### Frontend (Client)
- **React.js 19**: Modern UI rendering and component-driven architecture.
- **React Router**: Client-side routing for seamless navigation.
- **Socket.io-client**: Real-time, bi-directional communication with the server.
- **Axios**: Efficient HTTP requests for REST APIs.
- **Emoji Picker React**: Enhancing the chat experience with a rich emoji UI.

### Backend (Server)
- **Node.js & Express.js**: Fast and minimal web framework for core API endpoints.
- **Socket.io**: Real-time event-driven engine for game state and chat synchronization.
- **MongoDB & Mongoose**: NoSQL database for flexible storage of room configs, game states, and leaderboards.
- **Cors & Dotenv**: Secure cross-origin sharing and environment configuration.

---

##  Getting Started

Follow these steps to set up CF Battle Grid on your local machine.

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)

### 1. Clone the Repository
```bash
git clone https://github.com/bobby3039/CF-Battle-Grid.git
cd CF-Battle-Grid
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory with your environment variables:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:3000
```
Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
Open a new terminal window/tab:
```bash
cd frontend
npm install
```
Start the React development server:
```bash
npm start
```

The application will now be running at `http://localhost:3000`.

---

## 📖 How to Play

1. **Create a Room**: Start a new game session and share the Room ID with your friends.
2. **Join Teams**: Players enter their handles and choose between Team A or Team B.
3. **Start the Game**: Once everyone is ready, initialize the Battle Grid.
4. **Solve & Conquer**: Read the algorithmic problems assigned to grid cells. Submit correct solutions to capture the cell for your team.
5. **Win**: The team that captures the most cells or completes their objective first wins the game!

---

##  Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/bobby3039/CF-Battle-Grid/issues).

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

<p align="center">

</p>
