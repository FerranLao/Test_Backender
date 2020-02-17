// * format statistics from an array of cloudinary items
module.exports = data => {
  let totalData = 0;
  console.log(data)
  const formats = data.reduce((acc, value) => {
    totalData += value.bytes;
    acc[value.format] ? acc[value.format]++ : (acc[value.format] = 1);
    return acc;
  }, {});
  return {
    totalImages: data.length,
    formats,
    biggestPicture: data[data.length - 1].url,
    smallestPicutre: data[0].url,
    avgSize: Math.round(totalData / data.length)
  };
};
