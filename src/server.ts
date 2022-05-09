import express from 'express';
import { routes } from './routes';
import cors from 'cors';
import { requireOrigin } from './use-cases/block-request-origin';

const app = express();
const originsAllowed = process.env.CORS_ORIGIN || '';
const corsOptions: cors.CorsOptions = {
  origin: originsAllowed.split(';'),
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(requireOrigin);
app.use(express.json({limit: '200mb' }));
app.use(routes);

 
app.listen(process.env.PORT || 3333, ()=>{
  console.log('Servidor iniciado...');
});