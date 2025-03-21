import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";

const addProduct = async (req, res) => {
    try {
        const { name, description, oldPrice, newPrice, category, subCategory, bestseller, neckType, quantity } = req.body;
        if (!name || !description || !oldPrice || !newPrice || !category || !subCategory || !neckType || !quantity) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        const images = [
            req.files?.image1?.[0],
            req.files?.image2?.[0],
            req.files?.image3?.[0],
            req.files?.image4?.[0]
        ].filter(Boolean);

        const imageUrl = await Promise.all(
            images.map(async (image) => {
                const result = await cloudinary.uploader.upload(image.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        const productData = {
            name,
            description,
            oldPrice: Number(oldPrice),
            newPrice: Number(newPrice),
            category,
            subCategory,
            bestseller: bestseller === 'true',
            image: imageUrl,
            date: Date.now(),
            neckType,
            quantity,
        };

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: 'Product Added' });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
};

// Function to update product details
const updateProduct = async (req, res) => {
    try {
        const { id, name, description, oldPrice, newPrice, category, subCategory, bestseller, neckType, quantity } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }

        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const images = req.files
            ? [
                req.files.image1?.[0],
                req.files.image2?.[0],
                req.files.image3?.[0],
                req.files.image4?.[0],
            ].filter(Boolean)
            : [];

        const imageUrl = await Promise.all(
            images.map(async (image) => {
                const result = await cloudinary.uploader.upload(image.path, { resource_type: "image" });
                return result.secure_url;
            })
        );

        product.name = name || product.name;
        product.description = description || product.description;
        product.oldPrice = oldPrice || product.oldPrice;
        product.newPrice = newPrice || product.newPrice;
        product.category = category || product.category;
        product.subCategory = subCategory || product.subCategory;
        product.bestseller = bestseller === "true" ? true : bestseller === "false" ? false : product.bestseller;
        product.neckType = neckType || product.neckType;
        product.quantity = quantity || product.quantity;

        if (imageUrl.length > 0) {
            product.image = imageUrl;
        }

        await product.save();

        res.json({ success: true, message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error: " + error.message });
    }
};



const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



//  function for removing product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: 'Product Removed' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//  function for single product info
const singleProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.id);
        res.json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//Getting products for Report

const getProducts = async (req, res) => {
    try {
        const products = await productModel.find({}, 'name image date category newPrice quantity').lean();
        const orders = await orderModel.aggregate([
            { $unwind: '$items' },
            {
                $group: {
                    _id: { productId: '$items._id' },
                    totalSold: { $sum: '$items.quantity' }
                }
            }
        ]);

        const soldQuantitiesMap = orders.reduce((map, order) => {
            if (!map[order._id.productId]) {
                map[order._id.productId] = {};
            }
            map[order._id.productId] = order.totalSold;
            return map;
        }, {});

        const responseProducts = products.map(product => {
            const soldQuantities = soldQuantitiesMap[product._id] || 0;
            const totalQuantity = product.quantity || 0;
            const remainQuantity = totalQuantity - soldQuantities;

            return {
                _id: product._id,
                name: product.name,
                totalQuantity: totalQuantity,
                totalSoldQuantity: soldQuantities,
                remainQuantity: remainQuantity,
                image: product.image,
                date: product.date,
                category: product.category,
                newPrice: product.newPrice
            };
        });
        res.json({
            success: true,
            products: responseProducts
        });
    } catch (error) {
        console.error('Error fetching product data:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export { listProducts, addProduct, singleProduct, removeProduct, updateProduct, getProducts }