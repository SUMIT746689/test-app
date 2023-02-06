import express from "express";
import { mongoose } from "mongoose";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";
import userRoute from "./router/users.js";
import sectorRoute from "./router/sectors.js";
import session from "express-session";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//connect to mongodb atlas database
mongoose.connect("mongodb+srv://mehedihasan:mehedihasan@cluster0.n565d6s.mongodb.net/test-exam?retryWrites=true&w=majority")
  .then((res) => { console.log('connect successfully') })
  .catch((err) => { console.log({ err }) });
// mongoose.set('strictQuery', true);

//enable all cors
app.use(cors());

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: false }));

const sessionObj = {
  secret: 'keyboard cat',
  proxy: true,
  resave: true,
  saveUninitialized: true,
  cookie: {},
}

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: __dirname + '/.env' });
}

// app.use('/some-route', require(path.join(__dirname, 'api', 'routes', 'route.js')));

// static files (build of your frontend)
if (process.env.NODE_ENV === 'production') {
  sessionObj.cookie = { secure: true };
  app.use(express.static(path.join(__dirname, '../front-end', 'build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end', 'build', 'index.html'));
  })
}

app.use(session(sessionObj));

app.use('/users', userRoute);
app.use('/sectors', sectorRoute);

app.listen(PORT, () => console.log(`listening at PORT : ${PORT}`));
