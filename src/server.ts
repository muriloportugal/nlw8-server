import express from 'express';
import { routes } from './routes';
import cors from 'cors';

const app = express();
const originsAllowed = process.env.CORS_ORIGIN || 'https://corsNotConfigured';
const corsOptions: cors.CorsOptions = {
  origin: originsAllowed.split(';'),
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(express.json({limit: '200mb' }));
app.use(routes);

 
app.listen(process.env.PORT || 3333, ()=>{
  console.log('Servidor iniciado...');
});