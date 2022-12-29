import express from "express";
import {getProducts, getProductById, createProduct,updateProducts,deleteProducts} from "../controllers/Products.js"
import { verifyUser , adminOnly} from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/products', verifyUser,adminOnly,getProducts);
router.get('/products/:id',verifyUser, adminOnly,getProductById);
router.post('/products',verifyUser, adminOnly, createProduct);
router.patch('/products/:id',verifyUser,adminOnly, updateProducts);
router.delete('/products/:id',verifyUser,adminOnly, deleteProducts);

export default router;