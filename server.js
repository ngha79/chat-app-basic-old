const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const UserRouter = require("./routes/UserRoute");
const PostRouter = require("./routes/PostRoute");
const CommentRouter = require("./routes/Comment");
const ChatRouter = require("./routes/ChatRoute");
const MessageRouter = require("./routes/MessageRoute");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const http = require("http");
const socketio = require("socket.io");
const socket = require("./utils/socket");
require("./config/connectDb");

const app = express();
dotenv.config();
const PORT = process.env.PORT;
const { KEY_SESSION, MONGODB_URI, CLIENT_URL } = process.env;

app.use(
  session({
    saveUninitialized: true,
    secret: KEY_SESSION,
    cookie: {
      maxAge: 1000 * 30,
    },
    store: MongoStore.create({
      mongoUrl: MONGODB_URI,
      touchAfter: 24 * 3600, // time period in seconds
    }),
    resave: true,
  })
);
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
  },
});
socket(io);

app.use("/users", UserRouter);
app.use("/posts", PostRouter);
app.use("/comments", CommentRouter);
app.use("/chats", ChatRouter);
app.use("/messages", MessageRouter);

app.use((req, res, next) => {
  //   const error = new Error("Not found!");
  //   error.status = 404;
  //   next(error);
  next(createError.NotFound("This route does not exist!"));
});

app.use((err, req, res, next) => {
  res.json({
    status: err.status || 500,
    message: err.message,
  });
});

server.listen(PORT, () => {
  console.log(`App running at Port: ${PORT}`);
});
