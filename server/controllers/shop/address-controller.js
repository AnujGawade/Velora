const Address = require('../../models/Address');

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone)
      return res.status(400).json({
        success: false,
        message: 'Invalid Data Provided!',
      });

    const newlyCreatedAddress = new Address({
      userId,
      address,
      pincode,
      city,
      phone,
      notes,
    });

    await newlyCreatedAddress.save();

    res.status(201).json({
      success: true,
      data: newlyCreatedAddress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Some Error Occured',
    });
  }
};

const fetchAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId)
      return res.status(400).json({
        success: false,
        message: 'Please Provide a valid user!',
      });

    const addressList = await Address.find({ userId });

    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Some Error Occured',
    });
  }
};

const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId)
      return res.status(400).json({
        success: false,
        message: 'user or address id not found',
      });

    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true },
    );

    if (!address)
      return res.status(404).json({
        success: false,
        message: 'Address not found!',
      });

    res.status(201).json({
      success: true,
      message: 'Address updated Successfully!',
      data: address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Some Error Occured',
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId)
      return res.status(400).json({
        success: false,
        message: 'User or address Id not found',
      });

    const address = await Address.findOneAndDelete({ _id: addressId, userId });

    if (!address)
      return res.status(404).json({
        success: false,
        messaage: 'Address not found',
      });

    res.status(200).json({
      success: true,
      message: 'Address Deleted successfully!',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Some Error Occured',
    });
  }
};

module.exports = { addAddress, editAddress, fetchAddress, deleteAddress };
