import express from 'express';
import type { Request, Response } from 'express';

import { userRouter } from './routes/userRoutes';
import { linksRouter } from './routes/linksRoute';

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

app.use('/api/users', userRouter);
app.use('/api/links', linksRouter);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
