"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.clear();
require("reflect-metadata");
require("./config/container");
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const Router_1 = __importDefault(require("./routes/Router"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const cors_1 = __importDefault(require("cors"));
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const corsOptions = {
    origin: "http://localhost:4000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use("/api", Router_1.default);
app.use(errorHandler_1.default);
const startServer = async () => {
    try {
        await db_1.default.authenticate();
        console.log("Connection has been established successfully");
        await db_1.default.sync();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("There was an error trying to connect to database");
    }
};
startServer();
