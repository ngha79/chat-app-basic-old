const express = require("express");
const { createChat, userChats, findChat } = require("../controller/Chat");

const route = express.Router();

route.post("/", createChat);
route.get("/:userId", userChats);
route.get("/find/:firstId/:secondId", findChat);

module.exports = route;
