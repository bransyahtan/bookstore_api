import { Router } from "express";
import { authRouter, authorsRouter, booksRouter } from "../controllers";

const router = Router();
router.use("/auth", authRouter);
router.use("/authors", authorsRouter);
router.use("/books", booksRouter);

export default router;
