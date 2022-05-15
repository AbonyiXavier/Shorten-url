import logger from "../utils/logger";
import UrlShorten from "../model/urlShorten.model";
import validUrl from "valid-url";

import generateShortCode from "../uniqueShortCode/shortCode";

export const createShortUrl = async (request, response) => {
  let { url, shortCode } = request.body;

  if (!url) {
    return response.status(400).json({
      status: false,
      error: "Url missing",
    });
  }

  if (!validUrl.isUri(url)) {
    return response.status(400).json({
      status: false,
      error: "Invalid url provided",
    });
  }

  if (shortCode) {
    let match = /^[0-9a-zA-Z_]{4,}$/.test(shortCode);

    if (!match) {
      return response.status(422).json({
        status: false,
        error: "Short code must contain at least 4 characters",
      });
    }
  } else {
    shortCode = generateShortCode();
  }

  try {
    const shortCodeExist = await UrlShorten.findOne({ shortCode }).lean();

    if (shortCodeExist) {
      return response.status(409).json({
        status: false,
        error: "Short code already in use",
      });
    }

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
    return response.status(500).json({
      status: true,
      message: "Operation failed",
    });
  }
};

export const getShortCode = async (request, response) => {
  try {
    const { shortCode } = request.params;

    const getCode = await UrlShorten.findOne({ shortCode }).lean();

    if (!getCode) {
      return response.status(404).json({
        status: false,
        error: "No short code found",
      });
    }

    const code = await UrlShorten.findOneAndUpdate(
      {
        _id: getCode._id,
      },

      {
        $inc: { redirectCount: 1 },
        lastSeenDate: new Date()
      },
      {
        new: true,
      }
    );
    return response.status(302).redirect(code.url);
  } catch (error) {
    return response.status(500).json({
      status: true,
      message: "Operation failed",
    });
  }
};

export const getShortCodeStat = async (request, response) => {
  try {
    const { shortCode } = request.params;

    const getCode = await UrlShorten.findOne({ shortCode }).lean();

    if (!getCode) {
      return response.status(404).json({
        status: false,
        error: "No short code found",
      });
    }

    return response.status(200).json({
      status: true,
      message: "Fetched successfully",
      data: {
        startDate: getCode.startDate,
        lastSeenDate: getCode.lastSeenDate,
        redirectCount: getCode.redirectCount,
      },
    });
  } catch (error) {
    return response.status(500).json({
      status: true,
      message: "Operation failed",
    });
  }
};
