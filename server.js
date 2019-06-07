import express from "express";
import parties from "./routes/parties";
import offices from "./routes/offices";

const app = express();

app.use(express.json());
app.use("/api/v1/", parties);
app.use("/api/v1/", offices);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});

export default app;
