import sharp from 'sharp';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const filePath = req.file.path;
    const thumbnailPath = `${filePath}_thumb`;

    await sharp(filePath)
      .resize(160, 160)
      .png()
      .toFile(thumbnailPath);

    next();
  } catch (error) {
    next(error);
  }
};

export { createThumbnail };