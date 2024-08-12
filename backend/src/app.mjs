import express from "express"
import routes from "./routes/routes.mjs"
import cors from "cors"


const app = express();

app.use(cors());
// Handle pre-flight requests
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//add all the routes here as a middleware.
app.use('/api', routes);

export { app }