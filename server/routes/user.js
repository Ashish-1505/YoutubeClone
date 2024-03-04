import express from 'express'

import {login,getOtp, subscribe, unSubscribe, checkAlreadySubscribed} from '../controllers/auth.js'
import {updateChanelData,getAllChanels} from '../controllers/chanel.js'



const routes = express.Router();

routes.post('/login',login)
routes.post('/getotp',getOtp)
routes.post('/subscribe',subscribe)
routes.post('/unsubscribe',unSubscribe)
routes.get('/checkSubscribe',checkAlreadySubscribed)

 
routes.patch('/update/:id',updateChanelData)
routes.get('/getAllChanels',getAllChanels)

export default routes; 