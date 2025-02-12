import Hotel from '../model/hotelModel.js'; 
import { uploadImageToFirebase } from '../utility/firebaseCon.js'; 

export const addHotel = async (req, res) => {
    try {
        const { name, type, address, email, phone, pricePerNight, pricePerDay, numberOfRoomsAvailable } = req.body;
  
        if (!name || !type || !address || !email || !phone || !pricePerNight || !pricePerDay || !numberOfRoomsAvailable) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
  
        // Validate email
        const emailRegex = /\S+@\S+\.\S+/;
        if (email && !emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
  
        // Upload images if provided
        const uploadedImages = [];
        if (req.files) {
            for (const file of req.files) {
                // Get title and caption dynamically based on the image name
                const title = req.body[`title_${file.originalname}`] || 'Untitled';
                const caption = req.body[`caption_${file.originalname}`] || 'No caption provided';
                
                // Upload image to Firebase (or your image storage solution)
                const imageUrl = await uploadImageToFirebase(file);
  
                // Push image details (URL, title, caption) to the array
                uploadedImages.push({
                    url: imageUrl,
                    title: title,
                    caption: caption,
                });
            }
        }
  
        // Create new hotel record
        const hotel = new Hotel({
            name,
            type,
            address,
            email,
            phone,
            pricePerNight,
            pricePerDay,
            numberOfRoomsAvailable,
            images: uploadedImages,
            userID: req.user.id,
        });
  
        // Save hotel to database
        const savedHotel = await hotel.save();
        res.status(201).json(savedHotel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Update Hotel
export const updateHotel = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, type, address, email, phone, pricePerNight, pricePerDay, numberOfRoomsAvailable, images } = req.body;
  
      // Find the hotel by ID
      let hotel = await Hotel.findById(id);
      if (!hotel) {
        return res.status(404).json({ error: 'Hotel not found' });
      }
  
      // Validate email if provided
      const emailRegex = /\S+@\S+\.\S+/;
      if (email && !emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
  
      // Upload new images if provided
      const uploadedImages = hotel.images || [];
      if (req.files) {
        for (const file of req.files) {
          const imageUrl = await uploadImageToFirebase(file);
          uploadedImages.push({
            url: imageUrl,
            title: req.body[`title_${file.originalname}`] || 'Untitled',
            caption: req.body[`caption_${file.originalname}`] || '',
          });
        }
      }
  
      // Update hotel details
      hotel.name = name || hotel.name;
      hotel.type = type || hotel.type;
      hotel.address = address || hotel.address;
      hotel.email = email || hotel.email;
      hotel.phone = phone || hotel.phone;
      hotel.pricePerNight = pricePerNight || hotel.pricePerNight;
      hotel.pricePerDay = pricePerDay || hotel.pricePerDay;
      hotel.numberOfRoomsAvailable = numberOfRoomsAvailable || hotel.numberOfRoomsAvailable;
      hotel.images = uploadedImages;
  
      // Save updated hotel
      const updatedHotel = await hotel.save();
      res.status(200).json(updatedHotel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// Delete Hotel
export const deleteHotel = async (req, res) => {
  try {
    const { hotelId } = req.params;

    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    if (hotel.userID.toString() !== req.user.id) {
      return res.status(403).json({ error: 'You are not authorized to delete this hotel' });
    }

    await hotel.deleteOne();
    res.status(200).json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Hotels for Logged-in User
export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({ userID: req.user.id });

    if (!hotels || hotels.length === 0) {
      return res.status(404).json({ error: 'No hotels found for this user' });
    }

    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Hotels
export const getAllHotelsAdmin = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
