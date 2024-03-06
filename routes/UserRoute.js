const express = require("express");
const { uploadCloud } = require("../middleware/cloudinary");
const {
  register,
  updateUser,
  forgotPassword,
  resetPassword,
  logout,
  loginFailed,
  loginSuccess,
  followUser,
  unfollowUser,
  changePassword,
  getInfomationUser,
  searchUser,
  userFollowing,
  listUserFollowers,
  login,
  suggestionUser,
} = require("../controller/UserCtrl");
const { checkAuth } = require("../middleware/checkAuth");

const route = express.Router();

//Auth
route.post("/register", uploadCloud.single("avatar"), register);
route.post("/login", login);
route.get("/login-success", loginSuccess);
route.get("/login-failure", loginFailed);
route.post("/forgot-password", forgotPassword);
route.patch("/reset-password/:token", resetPassword);

//User
route.use(checkAuth);
//Check user login
route.get("/search-people/:info", searchUser);
route.get("/usersuggestion", suggestionUser);
route.get("/following/:userid", userFollowing);
route.get("/followers/:id", listUserFollowers);
route.get("/:userid", getInfomationUser);
route.patch("/:userid", uploadCloud.single("avatar"), updateUser);
route.put("/change-password/:userid", changePassword);
route.put("/follow/:userId/:followId", followUser);
route.put("/unfollow/:userId/:followId", unfollowUser);
route.delete("/logout", logout);

module.exports = route;
