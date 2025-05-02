import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import walletRoutes from './routes/walletRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/wallet', walletRoutes);

export default app;
