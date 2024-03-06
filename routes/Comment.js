const express = require("express");
const {
  commentPost,
  removeComment,
  updateComment,
  likeComment,
  removeLikeComment,
  replyComment,
  removeReplyComment,
  likeReplyComment,
  removelikeReplyComment,
  updateReplyComment,
  getAllComment,
} = require("../controller/Comment");
const { checkAuth } = require("../middleware/checkAuth");
const { uploadCloud } = require("../middleware/cloudinary");
const route = express.Router();

route.use(checkAuth);
route.post("/addcomment", uploadCloud.array("image"), commentPost);
route.delete("/removecomment/:postid/:commentid", removeComment);
route.put("/updatecomment", updateComment);
route.put("/likecomment/:commentid", likeComment);
route.put("/removelikecomment/:commentid", removeLikeComment);
route.put("/replycomment", uploadCloud.single("image"), replyComment);
route.put("/updatereplycomment", updateReplyComment);
route.put("/removereplycomment/:commentid/:replyid", removeReplyComment);
route.put("/likereplycomment/:commentid/:replyid", likeReplyComment);
route.put(
  "/removelikereplycomment/:commentid/:replyid",
  removelikeReplyComment
);
route.get("/getAllComment/:postid", getAllComment);

module.exports = route;
