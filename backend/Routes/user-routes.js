import express from "express";
import {
  signUp,
  signin,
  signout,
  tokenRefresh,
  userDetails,
} from "../Controllers/user-controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signin);
router.delete("/signout", signout);
router.post("/Token", tokenRefresh);
router.post("/getUser", userDetails);

export default router;
