import diagnosesRouter from "./routes/diagnoses";

import express from 'express';
import cors from "cors";

const apiRouter = express.Router();

// define here to prevent any of the other stuff being used
// for diagnosesRouter (I want to be explicit in the use of middleware
// for the routes, rather than just nilly-willy chucking cors on everything
// or having to assume that .json() is applied)
apiRouter.use("/diagnoses",diagnosesRouter);

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