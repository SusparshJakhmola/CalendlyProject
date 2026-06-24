import  express,{Express}  from "express";
import { userRouter } from "./routers/user.router.js";
import { errorHandler } from "./middlewares/error-handler.js";

const app: Express = express();


app.use(express.json());//help express to deserialize the req body into js object
app.use(express.text());//help express to deserialize the req body into js object
app.use(express.urlencoded({ extended: true }));//help express to deserialize the req body into js object
//Custom routes
app.get('/health', (_req, res) => {

    res.json({
        status: 'ok',
        timestamp: new Date().toISOString()
    })
});
//express router based routes
app.use('/api/users',userRouter);

app.use(errorHandler);
export { app };