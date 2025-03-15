import express from 'express'
import { listProducts, addProduct, singleProduct, removeProduct, updateProduct, getProducts } from '../controllers/productController.js'
import upload from '../middleware/multer.js'


const productRouter = express.Router()

// productRouter.post('/add', upload.fields([{name:'image1', maxCount:1},{name:'image2', maxCount:1},{name:'image3', maxCount:1},{name:'image4', maxCount:1}]), addProduct)
productRouter.post('/add', upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), addProduct);
productRouter.post('/remove', removeProduct)
productRouter.post('/get', singleProduct)
// console.log('productRouter')
productRouter.post('/update', upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), updateProduct)
productRouter.get('/list', listProducts)
console.log("product router")
productRouter.get('/track',getProducts)
export default productRouter