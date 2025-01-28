import { Router } from "express";
import { fetchNotas, fetchNota, createNota, updateNota, deleteNota } from "../controllers/notas.js";
const router = Router();

router.get("/", fetchNotas);
router.get("/:id", fetchNota);
router.post("/create", createNota);
router.put("/update/:id", updateNota);
router.delete("/delete/:id", deleteNota);

export default router;