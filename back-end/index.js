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
if (process.env.NODE_ENV !== 'production') dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log(process.env.MONGODB_URL)
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
  secret: 'mypassword',
  proxy: true,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 },
}

const PORT = process.env.PORT || 5000;

// sessionObj.cookie = { secure: true };
app.use(session(sessionObj));

app.use('/users', userRoute);
app.use('/sectors', sectorRoute);

// app.use('/some-route', require(path.join(__dirname, 'api', 'routes', 'route.js')));
console.log(path.join(__dirname, './front-end', 'build'))

// static files for frontend
// if (process.env.VERCEL_ENV !== 'production') {

app.use(express.static(path.join(__dirname, './front-end', 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './front-end', 'build', 'index.html'));
})
// }


app.listen(PORT, () => console.log(`listening at PORT : ${PORT}`));
