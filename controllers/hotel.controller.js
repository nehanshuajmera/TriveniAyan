import { Hotel } from "../models/hotel.model.js";

/* ------------ Hotel Query ------------ */
// Fetch all hotels
export const allHotels = async () => {
  try {
    const hotels = await Hotel.find({});
    return hotels;
  } catch (err) {
    throw new Error(`Error fetching hotels: ${err.message}`);
  }
};

// Fetch a hotel by ID
export const hotelById = async (_, { id }) => {
  try {
    const hotel = await Hotel.findById(id);

    if (!hotel) {
      throw new Error("Hotel not found");
    }
    return hotel;
  } catch (err) {
    throw new Error(`Error fetching hotel: ${err.message}`);
  }
};

/* ------------ Hotel Mutation ------------ */
// Create a new hotel
export const createHotel = async (_, { input }) => {
  try {
    const { name, location, address, description, rating, amenities, images } =
      input;
    const hotel = await Hotel.create({
      name,
      location,
      address,
      description,
      rating,
      amenities,
      images,
    });
    return hotel;
  } catch (err) {
    console.error(`Error creating hotel: ${err.message}`);
    throw new Error(`Error creating hotel: ${err.message}`);
  }
};

// Update a hotel
export const updateHotel = async (_, { id, input }) => {
  try {
    const { name, location, address, description, rating, amenities, images } =
      input;

    const hotel = await Hotel.findByIdAndUpdate(
      id,
      {
        name,
        location,
        address,
        description,
        rating,
        amenities,
        images,
      },
      { new: true }
    );

    if (!hotel) {
      throw new Error("Hotel not found");
    }

    return hotel;
  } catch (err) {
    throw new Error(`Error updating hotel: ${err.message}`);
  }
};

// Delete a hotel
export const deleteHotel = async (_, { id }) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(id);

    if (!hotel) {
      throw new Error("Hotel not found");
    }

    return hotel;
  } catch (err) {
    throw new Error(`Error deleting hotel: ${err.message}`);
  }
};

// Update hotel address
export const updateAddress = async (_, { id, address }) => {
  try {
    const { street, city, country, postalCode } = address;
    const hotel = await Hotel.findByIdAndUpdate(
      id,
      { address: { street, city, country, postalCode } },
      { new: true }
    );

    if (!hotel) {
      throw new Error("Hotel not found");
    }

    return hotel;
  } catch (err) {
    throw new Error(`Error updating hotel address: ${err.message}`);
  }
};
