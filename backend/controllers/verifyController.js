const securityService = require('../services/securityService');

const verifyController = {
  verifyUrl: async (req, res, next) => {
    try {
      const { url } = req.body;

      // Validate URL presence
      if (!url) {
        return res.status(400).json({
          error: 'Missing URL',
          message: 'URL is required in the request body'
        });
      }

      // Validate URL format
      try {
        new URL(url);
      } catch (error) {
        return res.status(400).json({
          error: 'Invalid URL',
          message: 'Please provide a valid URL starting with http:// or https://'
        });
      }

      // Check URL security
      const result = await securityService.checkUrlSafety(url);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = verifyController;