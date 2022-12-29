import express from "express";
import cors from "cors";
import session from "express-session"
import dotevnv from "dotenv";
import userRoute from "./routes/userRoute.js";
import ProductRoute from "./routes/ProductRoute.js"
import db from "./config/DataBase.js"
import AuthRoute from "./routes/AuthRoute.js"
import SequelizeStore from "connect-session-sequelize";


dotevnv.config(); 

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db
});

// (async()=>{
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }


}))
app.use(cors({
    credentials:true, 
    // so that frontend can send cookies along with credentials
    origin: 'http://localhost:3000'
    //port running forntend on
}))

app.use(express.json()); //to import data in json format

app.use(userRoute);
app.use(AuthRoute);
app.use(ProductRoute);
// store.sync();
app.listen(process.env.APP_PORT, () => {
    console.log("server running...")
});