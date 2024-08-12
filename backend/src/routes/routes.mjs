import { Router } from "express";
import bannerRoutes from './banner.routes.mjs';
const router = Router();

//add all routes as a middleware here!
router.get('/', (req, res) => {
    res.status(200).send({msg: 'Welcome to Banner.js' })
})

//Banner Routes
router.use('/banner', bannerRoutes);

export default router;