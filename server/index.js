const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/image", (req, res) => {
  try {
    const file = fs.readFileSync(
      path.resolve(__dirname, "files", `${req.query.id}.jpg`)
    );
    const data = `data:image/png;base64,` + file.toString("base64");
    res.json(data);
  } catch (e) {
    res.status(500).json("error");
  }
});

app.post("/image", (req, res) => {
  try {
    const data = req.body.imageUrl.replace(`data:image/png;base64,`, "");
    fs.writeFileSync(
      path.resolve(__dirname, "files", `${req.query.id}.jpg`),
      data,
      "base64"
    );
    res.status(200).json({ message: "Загружено" });
  } catch (e) {
    console.log(e);
    res.status(500).json("error");
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
