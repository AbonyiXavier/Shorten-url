import logger from "../utils/logger";
import UrlShorten from "../model/urlShorten.model";
import validUrl from "valid-url";

import generateShortCode from "../uniqueShortCode/shortCode";

export const createShortUrl = async (request, response) => {
  let { url, shortCode } = request.body;

  const shortCodeExist = await UrlShorten.findOne({ shortCode }).lean();

  if (shortCodeExist) {
    return response.status(409).json({
      status: false,
      error: "Short code already in use",
    });
  }

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
  }

  shortCode = generateShortCode();

  if (validUrl.isUri(url)) {
    try {
      let urlData = await UrlShorten.findOne({ url }).lean();

      if (urlData) {
        return response.status(200).json({
          status: true,
          message: "Display saved info",
          data: urlData,
        });
      }

      const itemToSave = new UrlShorten({
        url,
        shortCode,
      });

      const savedItem = await itemToSave.save();

      return response.status(201).json({
        status: true,
        message: "Created successfully",
        data: {
          shortCode: savedItem.shortCode,
          url: savedItem.url,
        },
      });
    } catch (error) {
      logger.error(error.message);
      return response.status(500).json({
        status: true,
        message: "Operation failed",
      });
    }
  }
};

export const getShortCode = async (request, response) => {
  try {
    const { shortCode } = request.params;

    const getCode = await UrlShorten.findOne({ shortCode }).lean();

    if (!getCode) {
      return response.status(404).json({
        status: false,
        error: "Not short code found",
      });
    }

    const code = await UrlShorten.findOneAndUpdate(
      {
        _id: shortCode._id,
      },

      {
        $set: { redirectCount: { $inc: { redirectCount: 1 } } },
      },
      {
        upSert: true,
      }
    );

    return response.status(302).json({
      status: true,
      location: code.url
    });

  } catch (error) {
    return response.status(500).json({
      status: true,
      message: "Operation failed",
    });
  }
};
