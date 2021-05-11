import express from 'express';
import {getBusRoutes,postBusRoute} from '../controllers/busRoute.js'


const router = express.Router();

router.post('/', postBusRoute);
router.get('/',getBusRoutes);


export default router;