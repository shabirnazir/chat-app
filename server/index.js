require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGO_DB_URL;
const newMessage = require("./Schemas/messageSchema");
const app = express();
const userRouter = require("./routes/userApi");
const dataRouter = require("./routes/userDataApi");
const port = process.env.PORT || 3000;
const AccessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("connected to database"))
  .catch((e) => console.log("Error while connecting", e));
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
const io = require("socket.io")(server);
app.use(express.json()); // Middleware for parsing JSON request bodies
app.use(cookieParser()); // Use cookie-parser middleware

app.use("/user", userRouter);
app.use("/data", dataRouter);

// Middleware to check if the user is authenticated
const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, AccessTokenSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
};

app.get("/users", authenticateUser, (req, res) => {
  res.json(users);
});

io.on("connection", (socket) => {
  // console.log(`Client ${socket.id} connected`);
  socket.on("join-room", (data) => {
    const { sender, receiver } = data;
    const senderNumber = +sender?.replace(/[a-zA-Z]/g, "");
    const receiverNumber = +receiver?.replace(/[a-zA-Z]/g, "");
    const room = senderNumber + receiverNumber;
    socket.join(room);
    console.log(io.sockets.adapter.rooms.get(room));
    console.log("------------------------------------>");
    //fetch messages from database of sender and receiver
    newMessage
      .find({
        $or: [
          { sender: sender, receiver: receiver },
          { sender: receiver, receiver: sender },
        ],
      })
      .then((messages) => {
        socket.emit("previous-messages", messages);
      })
      .catch((e) => {
        console.log(e);
      });
  });
  socket.on("message", (data) => {
    const { sender, receiver, message } = data;
    const senderNumber = +sender?.replace(/[a-zA-Z]/g, "");
    const receiverNumber = +receiver?.replace(/[a-zA-Z]/g, "");
    const room = senderNumber + receiverNumber;
    //save message in database with sender and receiver
    const savedMessage = new newMessage({
      sender: sender,
      receiver: receiver,
      message: message,
    });
    savedMessage.save();

    socket.to(room).emit("new-message", {
      message: message,
      sender: sender,
      receiver: receiver,
      id: savedMessage._id,
    });
  });

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected`);
  });
});
