const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);  // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for simplicity, adjust as needed
  },
});

app.use(cors());
app.use(express.json({ limit: '10mb' }));  
app.use(express.urlencoded({ limit: '10mb', extended: true })); 

const counsellorRoutes = require('./routes/counsellorRoutes');
app.use('/api', counsellorRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => { 
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

 
let users = {}; // Track user socket IDs by their names

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('register', (name) => {
    users[name] = socket.id;
    console.log(`User registered: ${name} with socket ID ${socket.id}`);
  });

  socket.on('chat message', ({ recipientName, message }) => {
    const recipientSocketId = users[recipientName];
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('chat message', message);
      console.log(`Message from ${message.sender} to ${recipientName}: ${message.content}`);
    } else {
      console.log(`Recipient with name ${recipientName} not found`);
    }
  });

  socket.on('disconnect', () => {
    // Remove user from the tracking object
    for (const [name, id] of Object.entries(users)) {
      if (id === socket.id) {
        delete users[name];
        break;
      }
    }
    console.log('A user disconnected:', socket.id);
  });
});

// Start the server
server.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
