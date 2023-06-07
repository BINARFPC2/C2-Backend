const handleGetRoot = (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "BCR API is up and running!",
  });
};

module.exports = handleGetRoot;
