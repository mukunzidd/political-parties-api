import express from 'express';
import parties from './routes/parties';

const app = express();

app.use(express.json());
app.use('/api/v1/', parties);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});

export default app;
