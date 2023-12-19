import express from "express";

const app = express();
const port = 8081;

app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.send("NFT bundler by David G. Smith.");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
