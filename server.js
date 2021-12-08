import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import Routes from './routes/Route.js';


//component
import connection from './database/db.js';
dotenv.config();
const app = express();

app.use(cors());


app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Routes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
}


const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const PORT = proces.env.PORT || 8000;

connection(username, password);
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));