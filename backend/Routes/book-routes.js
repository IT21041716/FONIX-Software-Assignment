import express from "express";
import {
  insertBook,
  fetchBooks,
  deleteBook,
  updateBook,
} from "../Controllers/book-controller.js";
import { requireSignin } from "../middleware/index.js";
import multer from "multer";

const router = express.Router();

//configure image upload funtion
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/insertBook", upload.single("Picture"), insertBook);
router.get("/fetchBook", fetchBooks);
router.post("/deleteBook", deleteBook);
router.post("/updateBook", upload.single("Picture"), updateBook);

export default router;
