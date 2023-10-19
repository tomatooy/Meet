import express from 'express';
import {getMessages} from '../controllers/message.js'

const router = express.Router();

router.post("/getMessages",getMessages)

export default router;