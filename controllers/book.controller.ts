import { Request, Response, Router } from "express";
import { authMiddleware, roleMiddleware, validate } from "../middlewares";
import { AuthorsService, BooksService } from "../services";
import { bookSchema, updateBookSchema } from "../validations/book.schema";

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: authorId
 *         schema:
 *           type: integer
 *         description: Filter by author ID
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search by title
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price
 *     responses:
 *       200:
 *         description: List of books
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/", async (req: Request, res: Response) => {
  const books = await BooksService.getAll(req.query);
  res.json(books);
});

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get book by ID
 *     tags: [Books]
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
 *         description: Book details
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get("/:id", async (req: Request, res: Response) => {
  const book = await BooksService.getById(Number(req.params.id));
  if (!book)
    return res
      .status(404)
      .json({ error: { code: "NOT_FOUND", message: "Book not found" } });
  res.json(book);
});

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book (Admin only)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
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
  validate(bookSchema),
  async (req: Request, res: Response) => {
    const author = await AuthorsService.getById(req.body.authorId);
    if (!author) {
      return res.status(404).json({
        error: { code: "NOT_FOUND", message: "Author not found" },
      });
    }
    const book = await BooksService.create(req.body);
    res.status(201).json(book);
  },
);

/**
 * @swagger
 * /books/{id}:
 *   patch:
 *     summary: Update a book (Admin only)
 *     tags: [Books]
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
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
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
  validate(updateBookSchema),
  async (req: Request, res: Response) => {
    if (req.body.authorId) {
      const author = await AuthorsService.getById(req.body.authorId);
      if (!author) {
        return res.status(404).json({
          error: { code: "NOT_FOUND", message: "Author not found" },
        });
      }
    }
    const book = await BooksService.update(Number(req.params.id), req.body);
    if (!book)
      return res
        .status(404)
        .json({ error: { code: "NOT_FOUND", message: "Book not found" } });
    res.json(book);
  },
);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book (Admin only)
 *     tags: [Books]
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
 *         description: Book deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book deleted successfully
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
    const deleted = await BooksService.delete(Number(req.params.id));
    if (!deleted)
      return res
        .status(404)
        .json({ error: { code: "NOT_FOUND", message: "Book not found" } });
    res.status(200).json({ message: "Book deleted successfully" });
  },
);

export default router;
