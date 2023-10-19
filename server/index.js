import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import messageRoutes from "./routes/message.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import http from "http"
import { Server } from 'socket.io';
import Message from './models/Message.js';


/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3002", "http://localhost:3003"]
  }
});
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);


/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/messageAPI/",messageRoutes)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    io.on('connection', (socket) => {
      console.log("connected")
      socket.on('chat_message', (data) => {
        console.log('Received message:', data);
        // Save the message to MongoDB
        const message = new Message({ users: data.users, text: data.message, from: data.sender, to: data.receiver });
        message.save((err) => {
          if (err) {
            console.error('Error saving message to database:', err);
          } else {
            console.log('Message saved to the database');
          }
        });

        // Broadcast the message to all connected clients
        console.log("data to"+data.sender)
        io.emit(data.receiver, {message : data.message, sender: data.sender});
        //io.emit(data.sender, data.message);
      });

    
      socket.on('add-user', (data) => {
        console.log(data)
      })
      socket.on("disconnect", (reason) => {
        console.log("disconnect")
      });
    });

    server.listen(PORT, () => {
      console.log('server running at http://localhost:3001');
    });


    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));


