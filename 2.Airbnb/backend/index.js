import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js"; // your MongoDB connection
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import listingRouter from "./routes/listing.route.js";
import bookingRouter from "./routes/booking.route.js";

dotenv.config();

const port = process.env.PORT || 6000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://airbnb-72m7.onrender.com",
    credentials: true
}));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listing", listingRouter);
app.use("/api/booking", bookingRouter);

// Connect to DB first, then start server
connectDb()
    .then(() => {
        console.log("✅ MongoDB connected successfully");
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1); // stop server if DB connection fails
    });
