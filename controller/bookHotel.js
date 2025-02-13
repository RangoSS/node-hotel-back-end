import { v4 as uuidv4 } from 'uuid'; 
import Hotel from '../model/hotelModel.js'; 
import User from '../model/userModel.js';
import HotelBooking from '../model/bookingModel.js'; 
import { createPaymentIntent } from '../utility/stripeUtil.js'; 
import mongoose from 'mongoose';

export const bookHotel = async (req, res) => {
  try {
    const hotelId = req.body.hotelId;

    // Check if the hotelId is valid
    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      return res.status(400).json({ error: 'Invalid hotel ID' });
    }

    const hotelObjectId = new mongoose.Types.ObjectId(hotelId);
    console.log("Converted Hotel ObjectId:", hotelObjectId);

    const { numberOfRooms, numberOfPeople, bookingType } = req.body;

    // Validate input
    if (!numberOfRooms || !numberOfPeople || !bookingType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get hotel and user data
    const hotel = await Hotel.findById(hotelObjectId);
    console.log("Hotel retrieved:", hotel);
   
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    // Assuming the user data is available as per your original code
    const user = req.user; // Example, assuming user info is attached to the request

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check room availability
    if (hotel.numberOfRoomsAvailable < numberOfRooms) {
      return res.status(400).json({ error: 'Not enough rooms available' });
    }

    // Calculate total price based on booking type
    let totalAmount = 0;

    if (bookingType === 'individual') {
      if (numberOfPeople <= 5) {
        totalAmount = 500 * numberOfPeople;  // Price per person
      } else {
        return res.status(400).json({ error: 'Individual booking can only be for up to 5 people' });
      }
    } else if (bookingType === 'group') {
      totalAmount = 2000;  // Fixed price for group
    } else if (bookingType === 'conference') {
      totalAmount = 5000;  // Fixed price for conference
    } else {
      return res.status(400).json({ error: 'Invalid booking type' });
    }

    // Create Stripe payment intent (ensure totalAmount is in cents if required by Stripe)
    const paymentIntent = await createPaymentIntent(totalAmount * 100); // assuming totalAmount is in dollars

    // Create a reference number for the booking
    const referenceNumber = uuidv4();

    // Create booking object
    const newBooking = new HotelBooking({
      referenceNumber,
      user: {
        name: user.name,
        surname: user.surname,
        address: user.address,
        phone: user.phone,
        userID: req.user.id // Assuming you have user info in the request
      },
      hotel: {
        name: hotel.name,
        pricePerNight: hotel.pricePerNight,
        pricePerDay: hotel.pricePerDay,
        numberOfRoomsAvailable: hotel.numberOfRoomsAvailable,
      },
      numberOfRooms,
      numberOfPeople,
      bookingType,
      totalAmount,
      paymentIntentId: paymentIntent.id,
    });

    // Save booking to database
    await newBooking.save();

    // Return payment details and booking information
    res.status(200).json({
      booking: newBooking,
      clientSecret: paymentIntent.client_secret, // Send the client secret for frontend payment
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
