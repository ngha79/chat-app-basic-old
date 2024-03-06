const socket = (io) => {
  let activeUsers = [];

  io.on("connection", (socket) => {
    socket.on("add-new-user", (userid) => {
      if (!activeUsers.some((user) => user.userId === userid)) {
        activeUsers.push({ userId: userid, socketId: socket.id });
        console.log("Add new User success.", activeUsers);
      }

      io.emit("get-users", activeUsers);
    });

    socket.on("send-message", (data) => {
      const { receiverId } = data;
      const user = activeUsers.find((user) => user.userId === receiverId);
      console.log("Sending from socket to: ", receiverId);
      console.log("Data: ", data);
      console.log(activeUsers);
      if (user) {
        io.to(user.socketId).emit("receive-message", data);
      }
    });
    socket.on("disconnect", () => {
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      console.log("User disconnect", activeUsers);
      io.emit("get-users", activeUsers);
    });
  });
};

module.exports = socket;
