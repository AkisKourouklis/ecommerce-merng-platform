import Jimp from 'jimp';

export const ImageProcess = async (file, quality) => {
  Jimp.read(file)
    .then((lenna) => {
      return lenna
        .quality(quality) // set JPEG quality
        .write(file); // save
    })
    .catch((err) => {
      console.error(err);
    });
};
