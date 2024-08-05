console.clear();
import "reflect-metadata";
import "./config/container";
import express, {Application} from "express";
import sequelize from "./config/db";
import router from "./routes/Router";
import errorHandler from "./middlewares/errorHandler";
import cors from "cors";

const PORT: number | string = process.env.PORT || 3000;

const app: Application = express();

app.use(cors());

const corsOptions = {
    origin: "http://localhost:4000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

const startServer = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully");
        await sequelize.sync();
        app.listen(PORT, (): void =>{
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error: any) {
        console.error("There was an error trying to connect to database", {message: error.message});
    }
}

startServer();