
import express from "express";
import addressRouter from "./routes/address.routes";
import cartRouter from "./routes/cart.routes";
import { nRouter } from "./routes/product.routes";
import { nCRouter, adminRouter as categoryAdminRouter } from "./routes/category.routes";
import orderRouter from "./routes/order.routes";
import reviewRouter from "./routes/review.routes";
import supportRouter from "./routes/support.routes";
import offerRouter from "./routes/offer.routes";
import adminRouter from "./routes/admin.routes";
import paymentRouter from "./routes/payment.routes";
import tagRouter from "./routes/tag.routes";
import userRouter from "./routes/user.routes"
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use("/api/tags", tagRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/products", nRouter);
app.use("/api/addresses", addressRouter);
app.use("/api/cart", cartRouter);
app.use("/api/categories", nCRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/support", supportRouter);
app.use("/api/offers", offerRouter);
app.use("/api/admin", adminRouter);
app.use("/api/users",userRouter)
app.use("/api/admin/categories", categoryAdminRouter);

export default app;