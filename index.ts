import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.config";
import { sequelize } from "./models";
import api from "./routes";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "Bookstore API connected" }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1", api);

sequelize.sync({ alter: true }).then(() => {
  app.listen(3000, () =>
    console.log("Server running at http://localhost:3000"),
  );
});
