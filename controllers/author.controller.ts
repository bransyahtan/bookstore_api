import { Request, Response, Router } from "express";
import { authMiddleware, roleMiddleware, validate } from "../middlewares";
import { AuthorsService } from "../services";
import { authorSchema, updateAuthorSchema } from "../validations/author.schema";

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of authors
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/", async (req: Request, res: Response) => {
  const authors = await AuthorsService.getAll();
  res.json(authors);
});

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get author by ID
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Author details
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get("/:id", async (req: Request, res: Response) => {
  const author = await AuthorsService.getById(Number(req.params.id));
  if (!author)
    return res
      .status(404)
      .json({ error: { code: "NOT_FOUND", message: "Author not found" } });
  res.json(author);
});

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author (Admin only)
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       201:
 *         description: Author created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 */
router.post(
  "/",
  roleMiddleware("admin"),
  validate(authorSchema),
  async (req: Request, res: Response) => {
    const author = await AuthorsService.create(req.body);
    res.status(201).json(author);
  },
);

/**
 * @swagger
 * /authors/{id}:
 *   patch:
 *     summary: Update an author (Admin only)
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: Author updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 */
router.patch(
  "/:id",
  roleMiddleware("admin"),
  validate(updateAuthorSchema),
  async (req: Request, res: Response) => {
    const author = await AuthorsService.update(Number(req.params.id), req.body);
    if (!author)
      return res
        .status(404)
        .json({ error: { code: "NOT_FOUND", message: "Author not found" } });
    res.json(author);
  },
);

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author (Admin only)
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Author deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Author deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.delete(
  "/:id",
  roleMiddleware("admin"),
  async (req: Request, res: Response) => {
    const deleted = await AuthorsService.delete(Number(req.params.id));
    if (!deleted)
      return res
        .status(404)
        .json({ error: { code: "NOT_FOUND", message: "Author not found" } });
    res.status(200).json({ message: "Author deleted successfully" });
  },
);

export default router;
