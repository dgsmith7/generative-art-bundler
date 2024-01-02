import express from "express";
import path from "path";
import http from "http";

const app = express();
const port = 3000;

app.use(express.static("path.join(__dirname, '../client'))"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
