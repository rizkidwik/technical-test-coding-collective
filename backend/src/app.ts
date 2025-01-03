import express from "express"
import dotenv from "dotenv"
import { sequelize } from "./config/database"
import authRoutes from "./routes/auth.routes"
import profileRoutes from "./routes/profile.routes"
import attendanceRoutes from "./routes/attendance.routes"
import cors from 'cors'
import path from 'path'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/auth", authRoutes)
app.use("/api/profile", profileRoutes)
app.use("/api/attendance", attendanceRoutes)

const uploadsDir =
  process.env.NODE_ENV == 'production'
    ? path.join(__dirname, '../uploads')
    : path.join(__dirname, 'uploads') 
// routes for open file uploaded
app.use('/uploads', express.static(uploadsDir));

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack)
    res.status(500).json({ error: "Something went wrong!" })
  }
)

sequelize.authenticate()
  .then(() => {
    console.log('Database connected')
  })
  .catch((error) => {
    console.error('Database connection error:', error)
  })

const PORT = process.env.PORT || 3000

sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
})

export { app }