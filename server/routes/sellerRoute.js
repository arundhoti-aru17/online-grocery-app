import express from 'express';
import { isSellerAuth, sellerLogin, sellerLogout } from '../controllers/sellerControler.js';
import authSeller from '../middlewares/authSeller.js';

const sellerRouter = express.Router();

sellerRouter.post('/login', sellerLogin);
sellerRouter.get('/is-Auth', authSeller , isSellerAuth);
sellerRouter.get('/logout',sellerLogout);

export default sellerRouter;