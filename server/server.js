const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/auth-routes');
const adminProductRouter = require('./routes/admin/admin-route');
const shopProductRouter = require('./routes/shop/products-route');
const shopCartRouter = require('./routes/shop/cart-routes');

mongoose
  .connect(
    'mongodb+srv://anujgawade1757:anuj1757@cluster0.jwcwctj.mongodb.net/'
  )
  .then(() => console.log('Database Connected'))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
      'Content-type',
      'Authorization',
      'Cache-control',
      'Expires',
      'Pragma',
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductRouter);
app.use('/api/shop/products', shopProductRouter);
app.use('/api/shop/cart', shopCartRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
