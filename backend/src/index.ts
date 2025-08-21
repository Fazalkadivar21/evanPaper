import dotenv from "dotenv";
import connect from "./db/index";
import app from "./app";

dotenv.config();
connect();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

