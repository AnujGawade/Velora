const { imageUploadUtil } = require('../../helpers/cloudinary');
const Product = require('../../models/Product');

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const url = 'data:' + req.file.mimetype + ';base64,' + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error occured',
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    // Optional: basic validation
    // if (!title || !price || !totalStock) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Title, price and totalStock are required',
    //   });
    // }

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await newlyCreatedProduct.save();

    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
      message: 'Product created Successfully!',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Product Creation Failed!',
      // error: error.message, // optionally send this
    });
  }
};

const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Fetching Products Failed!',
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    let findProduct = await Product.findById(id);
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product does not exist!',
      });
    }

    if (title !== undefined) findProduct.title = title;
    if (image !== undefined) findProduct.image = image;
    if (description !== undefined) findProduct.description = description;
    if (category !== undefined) findProduct.category = category;
    if (brand !== undefined) findProduct.brand = brand;

    if (price !== undefined) {
      findProduct.price = price === '' ? 0 : price;
    }

    if (salePrice !== undefined) {
      findProduct.salePrice = salePrice === '' ? 0 : salePrice;
    }

    if (totalStock !== undefined) {
      findProduct.totalStock = totalStock;
    }

    await findProduct.save();

    res.status(200).json({
      success: true,
      message: 'Product Updated Successfully',
      data: findProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Updating Product Failed!',
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product does not exist!',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted Successfully!',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Some Error Occured',
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
