import express from "express";
import config from "../config";
import apiRoutes from "./routes/apiRoutes";

class API {
  static async init() {
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use("/api", apiRoutes);

    const port = config.port;
    app.listen(port, () => {
      console.log(`Rest server started on port: ${port}`);
    });
  }
}

export default API;
