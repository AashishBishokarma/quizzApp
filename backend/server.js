import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/api", (req, res) => {
  const { message } = req.body;
  res.json({ message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
