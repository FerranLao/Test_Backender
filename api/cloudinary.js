const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const getAllResources = async (next_cursor, actual = []) => {
  const result = await cloudinary.v2.api.resources({
    max_results: 500,//max ammount of resources requested at once
    next_cursor,
    sort_by: "bytes"
  });
  if (result.next_cursor)
    return await getAllResources(result.next_cursor, [
      ...actual,
      ...result.resources
    ]);
  return [...actual, ...result.resources];
};

module.exports = {
  getAllResources
};
