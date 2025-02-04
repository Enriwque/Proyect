import { Router } from "express";
import { connect, CharEntry, ChapterEntry, GetCollection } from "../controllers/mango.js";

const router = Router();

router.get("/connect", connect);
router.get("connect/Collection", GetCollection);
router.get("/Character", CharEntry);
router.get("/Chapter", ChapterEntry);

export default router;