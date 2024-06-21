import express from 'express'
import cors from 'cors'
import Routes from "./routes"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(cors())

app.use("/routes", Routes)

app.listen(7000, () => {
    console.log("Server Running on localHost 7000")
})