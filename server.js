import express from "express";
import parties from "./routes/parties";
import offices from "./routes/offices";
import candidates from "./routes/candidates";

const app = express();

app.use(express.json());
app.use("/api/v1/", parties);
app.use("/api/v1/", offices);
app.use("/api/v1", candidates);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});

export default app;
