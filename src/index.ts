import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import homeRoutes from './routes/homeRoutes';
import v1Routes from './routes/v1';
import { errorHandler } from './middlewares/errorHandler';
import i18next from 'i18next';
import i18nextMiddleware from 'i18next-express-middleware';
import i18nConfig from './locales';
import bodyParser from 'body-parser';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swaggerConfig';
// import swaggerFile from '../swagger-output.json';
import swaggerDef from './config/joiToSwagger.config';

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
i18next.use(i18nextMiddleware.LanguageDetector).init(i18nConfig);

// routes for api/v1
app.use('/', homeRoutes);
app.use('/api/v1', v1Routes);

// swagger api documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// second way using swagger autogen
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
// third way using joi-to-swagger
// app.use('/api-docs', swaggerUi.serve);
// app.get('/api-docs', swaggerUi.setup(swaggerDef));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(errorHandler);

app.listen(+port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
