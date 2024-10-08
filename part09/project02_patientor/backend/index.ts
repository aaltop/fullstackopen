import express from 'express';
import cors from "cors";

const apiRouter = express.Router();

apiRouter.use(express.json());
apiRouter.use(cors());

apiRouter.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});


const app = express();
app.use("/api", apiRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});