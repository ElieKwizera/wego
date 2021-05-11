import express from 'express';
import {getRequests,postRequest} from '../controllers/riderequest.js'
import {getLocations,postLocation} from "../controllers/location.js"
import auth from '../middlewares/auth.js'

const router = express.Router();

router.post('/',auth, postRequest);
router.get('/',auth,getRequests);
router.post('/location', postLocation); 
router.get('/location',getLocations);



export default router;