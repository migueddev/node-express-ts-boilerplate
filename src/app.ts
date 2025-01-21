import express, { Application } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import env from 'env-var';

dotenv.config();

const app: Application = express();

// Middlewares
app.use(helmet()); // Configura encabezados de seguridad
app.use(compression()); // Habilita la compresión para mejorar el rendimiento
app.use(cors({ origin: env.get('CORS_ORIGIN').asString() || '*' })); // Configura CORS dinámico
app.use(express.json()); // Manejo de JSON en el cuerpo de las solicitudes

// Límite de solicitudes para prevenir DoS
const limiter = rateLimit({
  windowMs: env
    .get('RATE_LIMIT_WINDOW_MS')
    .default(1 * 60 * 1000)
    .asInt(),
  max: env.get('RATE_LIMIT_MAX_REQUESTS').default(5).asInt(),
  message:
    'Demasiadas solicitudes desde esta IP. Por favor, inténtelo más tarde.',
});
app.use(limiter);

// Rutas de ejemplo
app.get('/', (_, res) => {
  res.json({ message: '¡Bienvenido a la API segura!' });
});

export default app;
