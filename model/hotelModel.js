import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  caption: { type: String, required: true },
});

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    numberOfRoomsAvailable: { type: Number, required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    images: [imageSchema], // Array of images with title and caption
  },
  { timestamps: true }
);

const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;
