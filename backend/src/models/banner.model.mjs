import connectDB from "../db/index.mjs"

var db = await connectDB();

export const Banner = {
    getBanner: async () => {
        const [banner] = await db.query('SELECT * FROM BannerDetail LIMIT 1');
        return banner;
    },
    updateBanner: async (bannerData) => {
        const query = "UPDATE BannerDetail SET description = ?, timer = ?, link = ?, isVisible = ? WHERE id = ?";
        const values = [bannerData.description, bannerData.timer, bannerData.link, bannerData.isVisible, bannerData.id];
        const response = await db.query(query, values);
        if (response[0].affectedRows > 0)
            return { msg: `Banner updated successfully with id: ${bannerData.id}` }
    }
}