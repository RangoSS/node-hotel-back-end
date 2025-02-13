import mongoose from 'mongoose';

const hotelBookingSchema = new mongoose.Schema({
  referenceNumber: { type: String, required: true, unique: true },
  user: {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'HotelUser', required: true }, // Reference to the user
  },
  hotel: {
    name: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    numberOfRoomsAvailable: { type: Number, required: true },
  },
  numberOfRooms: { type: Number, required: true },
  numberOfPeople: { type: Number, required: true },
  bookingType: { type: String, required: true, enum: ['individual', 'group', 'conference'] }, // Booking type
  bookingDate: { type: Date, default: Date.now },
  paymentStatus: { type: String, default: 'Pending' },
  paymentIntentId: { type: String },
  totalAmount: { type: Number, required: true }, // Total amount to be paid
});

const HotelBooking = mongoose.model('HotelBooking', hotelBookingSchema);
export default HotelBooking;
