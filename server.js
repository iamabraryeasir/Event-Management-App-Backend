import app from "./src/app.js";
import { config } from "./src/config/config.js";
import { connectToDB } from "./src/config/db.js";

connectToDB().then(() => {
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
});
