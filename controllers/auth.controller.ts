import { Request, Response, Router } from "express";
import { validate } from "../middlewares";
import { AuthService } from "../services";
import { loginSchema, registerSchema } from "../validations/auth.schema";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       409:
 *         description: Conflict
 */
router.post(
  "/register",
  validate(registerSchema),
  async (req: Request, res: Response) => {
    try {
      const data = await AuthService.register(req.body);
      res.status(201).json(data);
    } catch (err: any) {
      res
        .status(409)
        .json({ error: { code: "CONFLICT", message: err.message } });
    }
  },
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post(
  "/login",
  validate(loginSchema),
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
      res.json(token);
    } catch (err: any) {
      res
        .status(401)
        .json({ error: { code: "UNAUTHORIZED", message: err.message } });
    }
  },
);

export default router;
