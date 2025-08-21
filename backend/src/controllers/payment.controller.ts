import Razorpay from 'razorpay';
import crypto from 'crypto';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import Order from '../models/order.model';
import Payment from '../models/payment.model';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Initiate payment (ONLINE)
const initiatePayment = asyncHandler(async (req, res) => {
  const { orderId } = req.body;
  const user = req.user;
  if (!orderId) throw new ApiError(400, 'Order ID required');
  const order = await Order.findById(orderId);
  if (!order || order.userId.toString() !== user._id.toString()) throw new ApiError(404, 'Order not found');
  if (order.paymentStatus !== 'pending') throw new ApiError(400, 'Order already paid or invalid');
  // Always calculate amount from backend
  const amount = order.totalAmount * 100; // Razorpay expects paise
  const razorpayOrder = await razorpay.orders.create({
    amount,
    currency: 'INR',
    receipt: orderId,
    payment_capture: true,
  });
  // Save payment record
  await Payment.create({
    orderId: order._id,
    transactionId: razorpayOrder.id,
    method: 'ONLINE',
    status: 'pending',
    amount: order.totalAmount,
  });
  return res.status(200).json(new ApiResponse(200, { razorpayOrder }, 'Payment initiated'));
});

// Verify payment
const verifyPayment = asyncHandler(async (req, res) => {
  const { orderId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
  const user = req.user;
  if (!orderId || !razorpay_payment_id || !razorpay_order_id || !razorpay_signature) throw new ApiError(400, 'Missing payment details');
  const order = await Order.findById(orderId);
  if (!order || order.userId.toString() !== user._id.toString()) throw new ApiError(404, 'Order not found');
  // Verify signature
  const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');
  if (generatedSignature !== razorpay_signature) throw new ApiError(400, 'Invalid payment signature');
  // Update order and payment
  order.paymentStatus = 'paid';
  order.paymentId = razorpay_payment_id;
  await order.save();
  await Payment.findOneAndUpdate(
    { orderId: order._id, transactionId: razorpay_order_id },
    { status: 'success', transactionId: razorpay_payment_id }
  );
  return res.status(200).json(new ApiResponse(200, null, 'Payment verified and order updated'));
});

export { initiatePayment, verifyPayment };
