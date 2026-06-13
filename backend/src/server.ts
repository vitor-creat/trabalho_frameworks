import express from "express";
import cors from "cors"
import rotas from "./routes/rotas.js";

const app = express()
app.use(cors())
app.use(express.json())
app.use(rotas)