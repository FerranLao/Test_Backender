const { getAllResources } = require("../api/cloudinary");
const formatStatistics = require("../helpers/formatStatistics");
const csv = require("csv-stringify");

module.exports = {
  statistics: async (req, res) => {
    try {
      const resources = await getAllResources();
      const stadistics = formatStatistics(resources);
      res.json(stadistics);
    } catch (e) {
      console.log(e)
      res.status(e.statusCode || 500).send(e.message||"something happened");
    }
  },

  csv: async (req, res) => {
    try {
      //setting headers to identify the response as a csv file
      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="' + Date.now() + '.csv"'
      );
      const resources = await getAllResources();
      //Getting a readable stream from csv-stringify and passing it to res object.
      csv(resources, { header: true }).pipe(res);
    } catch (e) {
      res.status(e.statusCode || 500).send(e.message||"something happened");
    }
  }
};
