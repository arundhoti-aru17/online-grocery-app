import express from 'express';
import { generatecontent} from "../controllers/helper.js";
import authUser from '../middlewares/authUser.js';

const helperRoute = express.Router();
helperRoute.post('/generate',authUser,generatecontent)

export default helperRoute