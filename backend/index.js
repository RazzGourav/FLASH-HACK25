const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const { Server } = require("socket.io");
const tf = require('@tensorflow/tfjs-node');

const app = express();
app.use(cors());
app.use(express.json());

// Create HTTP server and initialize Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust for production
    methods: ["GET", "POST"]
  }
});

// Log Socket.IO connections
io.on('connection', (socket) => {
  console.log("Client connected:", socket.id);
});

// In-memory storage for announcements
let announcements = [];

// Allowed roles for posting announcements
const allowedRoles = ["faculty", "clubLeader", "admin"];

/*
  --- MACHINE LEARNING INTEGRATION ---
  The model uses a simple binary feature extraction based on a vocabulary.
  Categories: ["academic", "department", "club", "placements", "global"]
*/
const vocabulary = ["exam", "schedule", "department", "club", "placement", "job", "event", "academic", "notice"];

function textToFeatures(text) {
  const lowerText = text.toLowerCase();
  return vocabulary.map(word => lowerText.includes(word) ? 1 : 0);
}

// Global variable for the ML model
let mlModel = null;

// Asynchronously load the ML model from the filesystem
(async () => {
  try {
    const modelPath = path.join(__dirname, 'ml-model', 'model.json');
    const ioHandler = tf.io.fileSystem(modelPath);
    mlModel = await tf.loadLayersModel(ioHandler);
    console.log("ML model loaded successfully.");
  } catch (error) {
    console.error("Error loading ML model:", error);
  }
})();

// Function to predict the category based on the announcement message
async function predictCategory(message) {
  if (!mlModel) {
    throw new Error("ML model is not loaded.");
  }
  const features = textToFeatures(message);
  const inputTensor = tf.tensor2d([features]);
  const prediction = mlModel.predict(inputTensor);
  const predictedIndex = (await prediction.argMax(-1).data())[0];
  const categories = ["academic", "department", "club", "placements", "global"];
  return categories[predictedIndex];
}

/**
 * POST /api/announcement
 * Expected JSON payload:
 * {
 *   "title": "Exam Schedule Update",
 *   "message": "Final exam schedule has been posted. Check details on the portal.",
 *   "postedBy": "someName",   // Will be overwritten for admin posts
 *   "role": "admin",          // Must be one of allowedRoles
 *   "designation": "HOD"      // Provided by admin for determining priority
 * }
 *
 * The category is automatically predicted via the ML model.
 * Priority is determined based on the designation (for admin posts):
 *   - If designation is "HOD", "Principal", or "Director" → high priority
 *   - If designation is "Teacher" or "Lead" → medium priority
 *   - Otherwise → low priority
 */
app.post('/api/announcement', async (req, res) => {
  let { title, message, postedBy, role, designation } = req.body;
  
  if (!allowedRoles.includes(role)) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  
  try {
    const category = await predictCategory(message);
    
    // Determine priority for admin posts based on designation
    let priority = "normal";
    if (role === "admin") {
      if (designation && (designation === "HOD" || designation === "Principal" || designation === "Director")) {
        priority = "high";
      } else if (designation && (designation === "Teacher" || designation === "Lead")) {
        priority = "medium";
      } else {
        priority = "low";
      }
      // For admin posts, we set postedBy to the designation (issuer)
      postedBy = designation;
    } else {
      priority = "normal";
    }
    
    const announcement = {
      title,
      message,
      category,
      postedBy,
      role,
      designation: designation || null,
      priority,
      timestamp: new Date()
    };

    announcements.push(announcement);
    io.emit('announcement', announcement);
    res.json({ status: "Announcement posted successfully", announcement });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Optional GET endpoint to fetch all announcements
app.get('/api/announcements', (req, res) => {
  res.json(announcements);
});

// (Optional) Endpoint to update student subscription preferences
let studentSubscriptions = {
  subscriptions: ["academic", "department", "club", "placements", "global"]
};

app.post('/api/subscriptions', (req, res) => {
  studentSubscriptions = req.body;
  res.json({ status: "Subscriptions updated", studentSubscriptions });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
