import app from "./app";
import { Database } from "./database";

try {
  const port = process.env.PORT ?? 3000;
  Database.connect().then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  });
} catch (error) {
  console.error("Error running the API Code");
  process.exit(0);
}
