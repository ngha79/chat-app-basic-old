const express = require("express");
const { addMessage, getMessages } = require("../controller/Message");

const route = express.Router();

route.post("/", addMessage);
route.get("/:chatId", getMessages);

module.exports = route;
