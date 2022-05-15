import logger from "../utils/logger";
import UrlShorten from "../model/urlShorten.model";

import { validateAndRetrieveShortCode } from "../utils/validateAndRetrieveShortCode";

export const createShortUrl = async (request, response) => {
  let { url, shortCode } = request.body;

  try {
    shortCode = validateAndRetrieveShortCode(shortCode);

    const itemToSave = new UrlShorten({
      url,
      shortCode,
    });

    await itemToSave.save();

    return response.status(201).json({
      status: true,
      message: "Created successfully",
      data: {
        shortCode,
        url,
      },
    });
  } catch (error) {
    logger.error(error.message);

    if (error.name === "MongoServerError" && error.code === 11000) {
      return response.status(409).json({
        status: false,
        error: "Short code already in use",
      });
    }

    if (typeof error === "string") {
      return response.status(422).json({
        status: false,
        error,
      });
    }

    return response.status(500).json({
      status: false,
      message: "Operation failed",
    });
  }
};

export const getShortCode = async (request, response) => {
  try {
    const { shortCode } = request.params;

    const urlShorten = await UrlShorten.findOneAndUpdate(
      {
        shortCode,
      },
      {
        $inc: { redirectCount: 1 },
        lastSeenDate: new Date(),
      }
    );

    if (!!urlShorten) {
      return response.status(302).redirect(urlShorten.url);
    } else {
      return response.status(404).json({
        status: false,
        error: "No short code found",
      });
    }
  } catch (error) {
    return response.status(500).json({
      status: true,
      message: "Operation failed",
    });
  }
};

export const getShortCodeStat = async (request, response) => {
  const { shortCode } = request.params;
  
  try {

    const code = await UrlShorten.findOne({ shortCode }).lean();

    const { startDate, lastSeenDate, redirectCount } = code;

    if (!code) {
      return response.status(404).json({
        status: false,
        error: "No short code found",
      });
    }

    return response.status(200).json({
      status: true,
      message: "Fetched successfully",
      data: {
        startDate,
        lastSeenDate,
        redirectCount,
      },
    });
  } catch (error) {
    return response.status(500).json({
      status: true,
      message: "Operation failed",
    });
  }
};
