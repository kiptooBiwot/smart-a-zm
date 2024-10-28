const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const cors = require('cors')
const path = require('path')
require("dotenv").config()
require('./helpers/mongodb.init')

// routes
const userRoutes = require('./routes/User.routes')
const authRoutes = require('./routes/Auth.routes')
const farmerRoutes = require('./routes/Farmer.routes')
const smsRoutes = require('./routes/Sms.routes')
const farmRoutes = require('./routes/Farm.routes')
const cropImagesRoutes = require('./routes/CropImages.routes')
const cropRoutes = require('./routes/Crop.routes')

const app = express();

const PORT = process.env.PORT || 5000;

// Make images uploaded public
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors())

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/farmer', farmerRoutes)
app.use('/api/v1/sms', smsRoutes)
app.use('/api/v1/farm', farmRoutes)
app.use('/api/v1/cropImages', cropImagesRoutes)
app.use('/api/v1/crops', cropRoutes)

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});