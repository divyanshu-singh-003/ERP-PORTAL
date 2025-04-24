import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // 👈 Import CORS
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import subjectRoutes from "./routes/subject.routes.js";
import testRoutes from "./routes/test.routes.js";
import markRoutes from "./routes/marks.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import lfRoutes from "./routes/item.routes.js";
import cabRoutes from "./routes/cab.routes.js";
import adminRoutes from "./routes/admin.routes.js";

import connectToMongo from "./db/connectToMongoDB.js";

dotenv.config();

const app = express();

// 🔓 Allow all origins
app.use(cors({
  origin: "*",
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/sub", subjectRoutes);
app.use("/api/test", testRoutes);
app.use("/api/mark", markRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/lfitem", lfRoutes);
app.use("/api/cabs", cabRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectToMongo();
  console.log(`Server is running at port ${PORT}`);
});
