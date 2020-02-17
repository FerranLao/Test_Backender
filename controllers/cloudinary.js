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
      res.status(e.statusCode || 500).send(e.message);
    }
  },

  csv: async (req, res) => {
    try {
      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="' + "download-" + Date.now() + '.csv"'
      );
      const resources = await getAllResources();
      csv(resources, { header: true }).pipe(res);
    } catch (e) {
      res.status(e.statusCode || 500).send(e.message);
    }
  }
};
