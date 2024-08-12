import { Banner } from "../models/banner.model.mjs";

export const getBanner = async (req, res) => {
    try {
        const banner = await Banner.getBanner();
        res.status(200).send(banner);
    } catch (error) {
        res.status(500).send({error: "Database Error in fetching Banner Details!!"});
    }
}

export const updateBanner = async(req, res) => {
    try {
        const bannerData = {
            id: req.body.id,
            description: req.body.description,
            timer: req.body.timer,
            link: req.body.link,
            isVisible: req.body.isVisible
        }
        const response = await Banner.updateBanner(bannerData);
        res.status(201).send(response);
    } catch (error) {
        res.status(500).send({error: "Database Error in Updating Banner Details!!"})
    }
}