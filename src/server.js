//Importar modulos
import express from 'express';
import morgan from 'morgan';

//Importar Rutas
import routerPets from './routes/pets_routes.js';
import routerUsers from './routes/users_routes.js'

//Instacias
const app = express();
app.use(morgan('dev'));

//Middlewares
app.use(express.json());

//Variable de entorno
app.set('port', process.env.PORT || 3000);

//Rutas
app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
})

//Rutas de la API
app.use('/api/info', routerPets);
app.use('/api/users', routerUsers);

export default app;